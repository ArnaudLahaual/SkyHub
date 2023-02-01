<?php

namespace App\EventListener;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['data'] = array(
            'id' => $user->getId(),
            'nickname' => $user->getNickname(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'description' => $user->getDescription(),
            'profil_picture' => $user->getProfilPicture(),
            'email' => $user->getEmail(),
            'city' => $user->getCity(),
            'region' => $user->getRegion()
        );

        $event->setData($data);
    }
}