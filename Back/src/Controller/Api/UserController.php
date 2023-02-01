<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserController extends AbstractController
{
    /**
     * @Route("/api/profil/{id}", name="app_api_profil_id")
     */
    public function getItem(User $user = null): JsonResponse
    {
        // On vérifie que le user ciblé existe
        if (null === $user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }

        return $this->json(
            $user,
            Response::HTTP_OK,
            [],
            ['groups' => 'user:item']
        );
    }

    /**
     * Update User (PATCH, modification partielle d'une entité/d'une ressource)
     *
     * @Route("/api/profil/{id}/edit", name="app_api_user_patch_item", methods={"PATCH"})
     */
    public function patchItem(Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator, User $user = null)
    {
        // On vérifie que le user ciblé existe
        if (null === $user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }

        // on récupère le contenu JSON
        $jsonContent = $request->getContent();


        // on le "désérialise" grâce au Serializer

        $serializer->deserialize($jsonContent,User::class,'json',

            // on désérialise le JSON dans l'objet $user qui vient de la BDD
        
            [AbstractNormalizer::OBJECT_TO_POPULATE => $user]
        );

        // validation de l'entité
        
        $errors = $validator->validate($user);

        // y'a-t-il des erreurs ?
        if (count($errors) > 0) {


            return $this->render('api/user/errors.json.twig', [
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
        return $this->json(null, Response::HTTP_OK);
    }

    /**
     * Create New User
     *
     * @Route("/api/signup", name="app_api_signup", methods={"POST"})
     */
    public function signUp(Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator,  UserPasswordHasherInterface $passwordHasher)
    {
        // on récupère le contenu JSON
        $jsonContent = $request->getContent();

        // on le "désérialise" grâce au Serializer
        $user = $serializer->deserialize($jsonContent, User::class, 'json');

        // validation de l'entité
        $errors = $validator->validate($user);

        $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());

        $user->setPassword($hashedPassword);

        // y'a-t-il des erreurs ?
        if (count($errors) > 0) {
            return $this->render('api/session/errors.json.twig', [
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
        $manager->persist($user);
        $manager->flush();


        // status 201 (HTTP_CREATED)
        return $this->json(
            $user,
            Response::HTTP_CREATED,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'user:signup']
        );
    }
}
