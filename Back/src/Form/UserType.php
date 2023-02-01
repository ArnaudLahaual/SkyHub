<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nickname', TextType::class, [
                'label' => 'Pseudo',
                'empty_data' => '',
                ])
            ->add('firstname', TextType::class, [
                'label' => 'Prenom',
                'empty_data' => '',
                ])
            ->add('lastname', TextType::class, [
                'label' => 'Nom',
                'empty_data' => '',
                ])
            ->add('description', TextareaType::class, [
                'label' => 'Présentation',
                'help' => '500 caractères maximum.',
                // attribut HTML5
                'attr' => [
                    // hauteur
                    'class' => 'crud-textarea',
                ]
                ])

            ->add('profil_picture',  UrlType::class, [
                'label' => 'Photo de profil',
                'help' => 'URL de type https://',
            ])

            ->add('email', EmailType::class)

            ->add('city', TextType::class, [
                'label' => 'Ville',
            ])
            ->add('region', TextType::class, [
                'label' => 'Region',
            ])
            ->add('roles', ChoiceType::class, [
                'label' => 'Rôles',
                'choices' => [
                    'Utilisateur' => 'ROLE_USER',
                    'Administrateur' => 'ROLE_ADMIN',
                ],
                'multiple' => true,
                'expanded' => true,
            ])
            ->add('password', null, [
                'constraints' => [
                    new NotBlank(),
                    new Regex("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/")
                ],
                'help' => 'Minimum 8 et maximum 20 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial dans @$!%*?&'
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            // pas de validation HTML5
            'attr' => [
                'novalidate' => 'novalidate',
            ]
        ]);
    }
}
