<?php

namespace App\Repository;

use DateTime;
use DateInterval;
use App\Entity\Session;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Session>
 *
 * @method Session|null find($id, $lockMode = null, $lockVersion = null)
 * @method Session|null findOneBy(array $criteria, array $orderBy = null)
 * @method Session[]    findAll()
 * @method Session[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SessionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Session::class);
    }

    public function add(Session $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Session $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Récupère les 3 prochaines sessions par date de la plus proche a la plus lointaine
     * 
     * @return Session[]
     */
    public function findByDate(): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy('s.date', 'ASC')
            ->setMaxResults(3)
            ->getQuery()
            ->getResult();
    }

    /**
     * Récupère les sessions par date de la plus proche a la plus lointaine
     * 
     * @return Session[]
     */
    public function findOrderByDate(): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy('s.date', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Récupère les sessions par date de la plus proche a la plus lointaine
     * 
     * @return Session[]
     */
    public function findByRegion($slug): array
    {
        return $this->createQueryBuilder('s')
            ->Where('s.slug = :slug')
            ->setParameter('slug', $slug)
            ->orderBy('s.date', 'ASC')
            ->getQuery()
            ->getResult();
    }
    
    /**
     * une autre partie du code fait le setActive(false)
     */
    public function findDeactivable()
    {
        $now = new DateTime();
        $date = $now->sub(new DateInterval('P1D'));

        return $this->createQueryBuilder('s')
            ->where("s.active = :active")
            ->andWhere("s.date >= :date")
            ->setParameter("active", true)
            ->setParameter("date", $date)
            ->getQuery()
            ->getResult();
    }

     /**
     * Désactive les sessions
     * 
     * @param int $limit Nombre de jour limites pour désactiver les sessions
     * 
     * @return int Le nombre de sessions désactivées
     */
    public function deactivateOutdated(int $limit): int
    {
        // on récupére la connexion "directe" à la base (DBAL => PDO)
        // on n'utilise pas l'ORM Doctrine
        // @see https://symfony.com/doc/5.4/doctrine.html#querying-with-sql
        $conn = $this->getEntityManager()->getConnection();

        // la requête SQL d'UPDATE
        // => on met à jour sans faire d'aller-retour avec PHP
        $sql = '
            UPDATE `session`
            SET active=0
            -- Date de mise à jour > 1 jours
            -- Différence entre maintenant et la date de mise à jour
            WHERE DATEDIFF(NOW(), date) > :limit
            -- ORDER BY `date` ASC
        ';

        // on éxécute la requête
        $stmt = $conn->prepare($sql);
        $result = $stmt->executeQuery(['limit' => $limit]);

        // nombre de lignes affectées
        return $result->rowCount();
    }

    public function findActivedSessions()
    {
        return $this->createQueryBuilder('s')
            ->where("s.active = :active")
            ->setParameter("active", true)
            ->getQuery()
            ->getResult();
    }
    //    /**
    //     * @return Session[] Returns an array of Session objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Session
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
