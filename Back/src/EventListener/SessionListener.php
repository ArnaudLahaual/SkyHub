<?php

namespace App\EventListener;

use App\Entity\Session;
use App\Service\MySlugger;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class SessionListener
{
    private $mySlugger;

    public function __construct(MySlugger $mySlugger)
    {
        $this->mySlugger = $mySlugger;
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function updateSlug(Session $session, LifecycleEventArgs $event): void
    {
        // on slugifie le titre via notre service
        $session->setSlug($this->mySlugger->slugify($session->getRegion()));
    }
}