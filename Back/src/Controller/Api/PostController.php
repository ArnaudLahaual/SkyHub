<?php

namespace App\Controller\Api;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PostController extends AbstractController
{
    /**
     * Get Collection
     *
     * @Route("/api/posts", name="app_api_posts_get_collection", methods={"GET"})
     */
    public function getCollection(PostRepository $postRepository): JsonResponse
    {
        // On récupere la liste des posts


        $posts = $postRepository->findAll();

        return $this->json(
            $posts,
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'posts:list']
        );
    }


    /**
     * Get Item
     *
     * @Route("/api/post/{id}", name="app_api_post_get_item", methods={"GET"})
     */
    public function getItem(Post $post = null): JsonResponse
    {
        // On vérifie que le post ciblé existe
        if (null === $post) {
            throw $this->createNotFoundException('Post non trouvée');
        }

        return $this->json(
            $post,
            Response::HTTP_OK,
            [],
            ['groups' => 'posts:item']
        );
    }

    /**
     * Get Last Item
     *
     * @Route("/api/latest/posts", name="app_api_latest_posts_get_collection", methods={"GET"})
     */
    public function getLastPosts(PostRepository $postRepository): JsonResponse
    {
        // On récupere la liste des 3 posts les plus récents
        // grace à la méthode codée dans le repository

        $posts = $postRepository->findByPublished_at();

        return $this->json(
            $posts,
            Response::HTTP_OK,
            ['Access-Control-Allow-Origin' => '*'],
            ['groups' => 'posts:latest']
        );
    }
}
