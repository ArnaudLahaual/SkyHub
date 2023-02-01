<?php

namespace App\EventListener;

use App\Entity\Session;
use App\Repository\SessionRepository;
use Symfony\Component\Console\Command\Command;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class DeactivateListener
{
    private $sessionRepository;

    public function __construct(SessionRepository $sessionRepository)
    {
        $this->sessionRepository = $sessionRepository;
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function DeactivateSessions(Session $session, LifecycleEventArgs $event, InputInterface $input, OutputInterface $output): void
    {


        $limit = $input->getOption('limit') ?: 1;
        // on slugifie le titre via notre service
        $session->setActive($this->sessionRepository->deactivateOutdated($limit));
    }
}