<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as assert;

/**
 * @ORM\Entity(repositoryClass=PostRepository::class)
 */
class Post
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"posts:list","posts:item","posts:latest"})
     */
    private $id;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"posts:list" ,"posts:item","posts:latest"})
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"posts:list","posts:item","posts:latest"})
     * @Assert\NotBlank
     */
    private $content;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"posts:list","posts:item","posts:latest"})
     * @Assert\NotBlank
     */
    private $published_at;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"posts:list","posts:item","posts:latest"})
     * @Assert\NotBlank
     */
    private $type;


    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="posts")
     * @Groups({"posts:list","posts:item","posts:latest"})
     */
    private $redact;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"posts:list","posts:item","posts:latest"})
     */
    private $picture;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeImmutable
    {
        return $this->published_at;
    }

    public function setPublishedAt(\DateTimeImmutable $published_at): self
    {
        $this->published_at = $published_at;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getRedact(): ?User
    {
        return $this->redact;
    }

    public function setRedact(?User $redact): self
    {
        $this->redact = $redact;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
}
