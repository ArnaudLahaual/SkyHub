<?php

namespace App\Entity;

use App\Repository\SessionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as assert;


/**
 * @ORM\Entity(repositoryClass=SessionRepository::class)
 */
class Session
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"sessions:list","sessions:list:date","sessions:item","sessions:new", "session:tri:region", "sessions:next", "sessions:list_comments","comments:edit","comments:new"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sessions:list","sessions:list:date","sessions:item","sessions:new", "session:tri:region", "sessions:next", "sessions:list_comments","comments:edit","comments:new"})
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"sessions:list","sessions:list:date", "session:tri:region","sessions:new","sessions:item", "sessions:next"})
     * @Assert\NotBlank
     */
    private $description;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"sessions:list","sessions:list:date", "session:tri:region","sessions:item","sessions:new", "sessions:next"})
     * @Assert\NotBlank
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"sessions:list","sessions:list:date", "session:tri:region","sessions:item","sessions:new", "sessions:next"})
     */
    private $picture;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sessions:list","sessions:list:date", "session:tri:region","sessions:item","sessions:new", "sessions:next"})
     * @Assert\NotBlank
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sessions:list","sessions:list:date", "session:tri:region","sessions:item","sessions:new", "sessions:next"})
     * @Assert\NotBlank
     */
    private $region;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="has", orphanRemoval=true)
     * @Groups({"sessions:item"})
     */
    private $comments;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="sessions")
     * @Groups({"sessions:list","sessions:list:date", "session:tri:region","sessions:item","sessions:new", "sessions:next"})
     */
    private $propose;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="participate")
     * @Groups({"sessions:item"})
     */
    private $users;

    /**
     * @ORM\Column(type="string", length=355)
     * @Groups({"sessions:item","sessions:new"})
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean")
     */
    private $active;


    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->active = true;
    }

    public function __toString()
    {
        return (string) $this->getId();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): self
    {
        $this->date = $date;

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

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setHas($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getHas() === $this) {
                $comment->setHas(null);
            }
        }

        return $this;
    }

    public function getPropose(): ?User
    {
        return $this->propose;
    }

    public function setPropose(?User $propose): self
    {
        $this->propose = $propose;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addParticipate($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeParticipate($this);
        }

        return $this;
    }


    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }
}
