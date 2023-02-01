<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CommentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as assert;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"sessions:item", "comments:new"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"sessions:item", "comments:new", "sessions:list_comments","comments:edit","comments:new"})
     * @Assert\NotBlank
     */
    private $content;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"api_session_get_item","sessions:item", "sessions:list_comments","comments:edit","comments:new"})
     */
    private $published_at;

    /**
     * @ORM\ManyToOne(targetEntity=Session::class, inversedBy="comments")
     * @Groups({"sessions:list_comments","comments:edit","comments:new"})
     */
    private $has;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
     * @Groups({"sessions:item","sessions:list_comments","comments:edit","comments:new"})
     */
    private $redact;

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

    public function getHas(): ?Session
    {
        return $this->has;
    }

    public function setHas(?Session $has): self
    {
        $this->has = $has;

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

}
