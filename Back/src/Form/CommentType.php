<?php

namespace App\Form;

use App\Entity\Post;
use App\Entity\User;
use App\Entity\Session;
use App\Entity\Comment;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('content', TextareaType::class, [
                'label' => 'Résumé', 
                'help' => '400 caractères maximum.',
                // attribut HTML5
                'attr' => [
                    // hauteur
                    'class' => 'crud-textarea',
                ]
                ])
            ->add('published_at', DateType::class, [
                'label' => 'Publié le',
                'format' => 'ddMMyyyy',
                'input' => 'datetime_immutable',
            ])
            ->add('has',  EntityType::class, [
                'label' => 'Session concernée',
                'class' => Session::class,
                ])
            ->add('redact',  EntityType::class, [
                'label' => 'Rédigé par',
                'class' => User::class,
                ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Comment::class,
            // pas de validation HTML5
            'attr' => [
                'novalidate' => 'novalidate',
            ]
        ]);
    }
}
