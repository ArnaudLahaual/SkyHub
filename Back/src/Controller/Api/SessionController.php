<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Comment;
use App\Entity\Session;
use App\Repository\CommentRepository;
use App\Repository\SessionRepository;
use App\Service\MySlugger;
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
use Symfony\Component\String\Slugger\SluggerInterface;

class SessionController extends AbstractController
{
    /**
     * Get Collection
     *
     * @Route("/api/session/list", name="app_api_session_get_collection", methods={"GET"})
     */
    public function getCollection(SessionRepository $sessionRepository): JsonResponse
    {
        // On récupere la liste des sessions
        $sessions = $sessionRepository->findAll();

        return $this->json(
            $sessions,
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'sessions:list']
        );
    }





    /**
     * Get Collection
     *
     * @Route("/api/next/session/list", name="app_api_next_session_get_collection", methods={"GET"})
     */
    public function getNextSessions(SessionRepository $sessionRepository): JsonResponse
    {
        // On récupere la liste des 3 prochaines sessions
        // Grace à la méthode que l'on à codée dans le repository

        $sessions = $sessionRepository->findByDate();

        return $this->json(
            $sessions,
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'sessions:next']
        );
    }





    /**
     * Get Item
     *
     * @Route("/api/session/{id}", name="app_api_sessions_get_item", methods={"GET"})
     */
    public function getItem(Session $session = null): JsonResponse
    {
        // On vérifie que la session ciblée existe
        if (null === $session) {
            throw $this->createNotFoundException('Session non trouvée');
        }

        return $this->json(
            $session,
            Response::HTTP_OK,
            [],
            ['groups' => 'sessions:item']
        );
    }

    /**
     * Create New Session
     *
     * @Route("/api/session/new", name="app_api_sessions_post_item", methods={"POST"})
     */
    public function postItem(Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        // on récupère le contenu JSON
        $jsonContent = $request->getContent();

        // on le "désérialise" grâce au Serializer
        $session = $serializer->deserialize($jsonContent, Session::class, 'json');

        // validation de l'entité
        $errors = $validator->validate($session);

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
        $manager->persist($session);
        $manager->flush();


        // status 201 (HTTP_CREATED)
        return $this->json(
            $session,
            Response::HTTP_CREATED,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'sessions:new']
        );
    }

    /**
     * Update Session (PATCH, modification partielle d'une entité/d'une ressource)
     *
     * @Route("/api/session/{id}/edit", name="app_api_sessions_patch_item", methods={"PATCH"})
     */
    public function patchItem(Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator, Session $session = null)
    {
        // On vérifie que la session ciblée existe
        if (null === $session) {
            throw $this->createNotFoundException('Session non trouvée');
        }

        // on récupère le contenu JSON
        $jsonContent = $request->getContent();


        // on le "désérialise" grâce au Serializer

        $serializer->deserialize(
            $jsonContent,
            Session::class,
            'json',

            // on désérialise le JSON dans l'objet $session qui vient de la BDD

            [AbstractNormalizer::OBJECT_TO_POPULATE => $session]
        );

        // validation de l'entité

        $errors = $validator->validate($session);

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
        $manager->flush();


        // status 200 et rien de plus
        return $this->json(null, Response::HTTP_OK);
    }

    /**
     * DELETE Item
     *
     * @Route("/api/session/{id}/delete", name="app_api_session_delete_item", methods={"DELETE"})
     */
    public function deleteItem(Session $session = null, SessionRepository $sessionRepository)
    {
        // On vérifie que la session ciblée existe
        if (null === $session) {
            // on préférera retourner du JSON
            return $this->json(['message' => 'Session non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        // on supprime via la méthode du Respository
        // /!\ passer true pour flusher tout de suite
        $sessionRepository->remove($session, true);

        // status 200 et rien de plus
        return $this->json(['message' => 'Session supprimée.'], Response::HTTP_OK);
    }

    /**
     * Get comments collection for a given session
     *
     * @Route("/api/session/{id}/comments", name="api_session_comments", methods="GET")
     */
    public function getSessionComments(Session $session): JsonResponse
    {
        return $this->json(
            $session->getComments(),
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'sessions:list_comments']
        );
    }

    /**
     * Get Collection
     *
     * @Route("/api/sessions/date", name="app_api_order_by_date", methods={"GET"})
     */
    public function getSessionsOrderByDate(SessionRepository $sessionRepository): JsonResponse
    {
        // On récupere la liste des sessions triées par ordre chronologique


        $sessions = $sessionRepository->findOrderByDate();

        return $this->json(
            $sessions,
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'sessions:list:date']
        );
    }

    /**
     * Get Sessions list by Region
     *
     * @Route("/api/sessions/region/{slug}", name="app_api_order_by_region", methods={"GET"})
     */
    public function getSessionsByRegion(SessionRepository $sessionRepository, $slug): JsonResponse
    {
        // On récupere la liste des sessions triées par ordre chronologique dans une region ciblée


        $sessions = $sessionRepository->findByRegion($slug);

        return $this->json(
            $sessions,
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'session:tri:region']
        );
    }

    /**
     * Subscribe to one session
     *
     * @Route("/api/sessions/{session}/subscribe/{user}", name="app_api_subscribe", methods={"GET"})
     */
    public function subscribe(Session $session, User $user, Request $request, SerializerInterface $serializer, ManagerRegistry $doctrine, ValidatorInterface $validator): JsonResponse
    {
        // On ajoute le user contenu dans l'url comme participant à la session
        $session->addUser($user);
        
        
        $manager = $doctrine->getManager();
        $manager->flush();


        return $this->json(
            $session,
            Response::HTTP_CREATED,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'sessions:new']
        );
    }
}
