<?php

namespace App\Command;

use App\Service\MySlugger;
use App\Repository\SessionRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SessionsSlugifyCommand extends Command
{
    protected static $defaultName = 'app:sessions:slugify';
    protected static $defaultDescription = 'Slugifies sessions regions in the database';

    // Nos services
    private $sessionRepository;
    private $mySlugger;
    private $entityManager;

    public function __construct(SessionRepository $sessionRepository, MySlugger $mySlugger, ManagerRegistry $doctrine)
    {
        $this->sessionRepository = $sessionRepository;
        $this->mySlugger = $mySlugger;
        $this->entityManager = $doctrine->getManager();

        // On appelle le constructeur parent
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->info('Mise à jour des slugs');

        // Récupérer tous les films (via MovieRepository)
        $sessions = $this->sessionRepository->findAll();
        // Pour chaque film
        foreach ($sessions as $session) {
            // On slugifie le titre avec notre service MySlugger
            $session->setSlug($this->mySlugger->slugify($session->getRegion()));
        }
        // On flush (via l'entityManager)
        $this->entityManager->flush();

        $io->success('Les slugs ont été mis à jour');

        return Command::SUCCESS;
    }
}
