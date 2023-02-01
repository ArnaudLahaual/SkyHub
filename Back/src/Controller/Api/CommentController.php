<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Comment;
use App\Entity\Session;
use App\Repository\CommentRepository;
use App\Repository\SessionRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bridge\Twig\Extension\SerializerRuntime;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bridge\Twig\Extension\SerializerExtension;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CommentController extends AbstractController
{
   /**
     * Update Comment (PATCH, modification partielle d'une entité/d'une ressource)
     *
     * @Route("/api/comment/{id}/edit", name="app_api_comment_patch_item", methods={"PATCH"})
     */
    public function patchItem(Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator, Comment $comment = null)
    {
        // On vérifie que le commentaire ciblé existe
        if (null === $comment) {
            throw $this->createNotFoundException('Commentaire non trouvé');
        }

        // on récupère le contenu JSON
        $jsonContent = $request->getContent();


        // on le "désérialise" grâce au Serializer

        $serializer->deserialize($jsonContent,Comment::class,'json',

            // on désérialise le JSON dans l'objet $comment qui vient de la BDD
        
            [AbstractNormalizer::OBJECT_TO_POPULATE => $comment]
        );



        // validation de l'entité
        
        $errors = $validator->validate($comment);

        // y'a-t-il des erreurs ?
        if (count($errors) > 0) {


            return $this->render('api/comment/errors.json.twig', [
                'errors' => $errors,
            ], new JsonResponse(null, Response::HTTP_UNPROCESSABLE_ENTITY));
            

            // tableau d'erreurs "propre"
            $errorsClean = [];

            /** @var ConstraintViolation $error L'erreur */
            foreach ($errors as $error) {
                // on pousse l'erreur à la clé qui correspond à la propriété en erreur
                $errorsClean[$error->getPropertyPath()][] = $error->getMessage();
            }

            return $this->json([
                'errors' => $errorsClean
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // on persist et flush l'entité
        $manager = $doctrine->getManager();
        $manager->flush();
       

        // status 200 et rien de plus
        return $this->json(
        null, 
        Response::HTTP_OK,
        ['Access-Control-Allow-Origin' => '*'],
        ['groups' => 'comments:edit']);
    }


 /**
    * Create New Comment
    *
    * @Route("/api/session/{id}/comment/new", name="api_new_comment", methods={"POST"})
    */
    public function postComment(Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        // On récupere le Json contenu dans la requete
        $jsonContent = $request->getContent();

        // On deserialize grace au serializer 
        $comment = $serializer->deserialize($jsonContent, Comment::class, 'json');

        // On set la date de publication du commentaire
        $comment->setPublishedAt(new \DateTimeImmutable());


        // validation de l'entité
       $errors = $validator->validate($comment);

       // y'a-t-il des erreurs ?
       if (count($errors) > 0) {
           return $this->render('api/comment/errors.json.twig', [
               'errors' => $errors,
           ], new JsonResponse(null, Response::HTTP_UNPROCESSABLE_ENTITY));


           // tableau d'erreurs "propre"
           $errorsClean = [];

           /** @var ConstraintViolation $error L'erreur */
           foreach ($errors as $error) {
               // on pousse l'erreur à la clé qui correspond à la propriété en erreur
               $errorsClean[$error->getPropertyPath()][] = $error->getMessage();
           }

           return $this->json([
               'errors' => $errorsClean
           ], Response::HTTP_UNPROCESSABLE_ENTITY);
       }


        $manager = $doctrine->getManager();
        $manager->persist($comment);
        $manager->flush();

        
        return $this->json(
            $comment,
            Response::HTTP_CREATED,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'comments:new']);

    }

    /**
     * DELETE Item
     *
     * @Route("/api/comment/{id}/delete", name="app_api_comment_delete_item", methods={"DELETE"})
     */
    public function deleteItem(Comment $comment = null, CommentRepository $commentRepository)
    {
        // On vérifie que le commentaire ciblé existe
        if (null === $comment) {
            // on préférera retourner du JSON
            return $this->json(['message' => 'Session non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        // on supprime via la méthode du Respository
        // /!\ passer true pour flusher tout de suite
        $commentRepository->remove($comment, true);

        // status 200 et rien de plus
        return $this->json(['message' => 'Commentaire supprimé.'], Response::HTTP_OK);
    }
}


