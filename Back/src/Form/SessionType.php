<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Session;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class SessionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
            'label' => 'Titre',
            'empty_data' => '',
            ])

            ->add('description', TextareaType::class, [
                'label' => 'Résumé',
                'help' => '400 caractères maximum.',
                // attribut HTML5
                'attr' => [
                    // hauteur
                    'class' => 'crud-textarea',
                ]
                ])

            ->add('date', DateType::class, [
                'label' => 'Cette session aura lieu le ',
                'format' => 'ddMMyyyy',
                'input' => 'datetime_immutable',
            ])

            ->add('picture',  UrlType::class, [
                'label' => 'Photo de la session',
                'help' => 'URL de type https://',
            ])

            ->add('city', TextType::class, [
                'label' => 'Ville',
            ])

            ->add('region', TextType::class, [
                'label' => 'Region',
            ])
            
            ->add('propose',  EntityType::class, [
                'label' => 'Session créée par',
                'class' => User::class,
                ]);;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Session::class,
            // pas de validation HTML5
            'attr' => [
                'novalidate' => 'novalidate',
            ]
        ]);
    }
}
