<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as assert;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * Groups({"sessions:item"})
     */
    private $id;

    
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:item", "sessions:list","sessions:list:date", "sessions:item", "session:tri:region","sessions:new", "user:signup", "sessions:next", "sessions:list_comments","posts:list","posts:item","posts:latest","comments:edit","comments:new"})
     */
    private $nickname;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:item", "user:signup"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:item", "user:signup"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="text")
     * @Groups({"user:item", "user:signup"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:item", "user:signup"})
     */
    private $profil_picture;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"user:item", "user:signup"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:item", "user:signup"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:item", "user:signup"})
     */
    private $region;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user:signup"})
     */
    private $roles = ['ROLE_USER'];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="redact", orphanRemoval=true)
     * Groups({"sessions:item"})
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="redact", orphanRemoval=true)
     */
    private $posts;

    /**
     * @ORM\OneToMany(targetEntity=Session::class, mappedBy="propose", orphanRemoval=true)
     */
    private $sessions;

    /**
     * @ORM\ManyToMany(targetEntity=Session::class, inversedBy="users")
     */
    private $participate;


    public function __construct()
    {
    $this->comments = new ArrayCollection();
    $this->posts = new ArrayCollection();
    $this->sessions = new ArrayCollection();
    $this->participate = new ArrayCollection();
}

    public function __toString()
    {
        return $this->getNickname();
    }


    public function getId(): ?int
    {
        return $this->id;
    }
    
    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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

    public function getProfilPicture(): ?string
    {
        return $this->profil_picture;
    }

    public function setProfilPicture(?string $profil_picture): self
    {
        $this->profil_picture = $profil_picture;

        return $this;
    }


    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }


    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        return (array) $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

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
     * Get the value of city
     */ 
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set the value of city
     *
     * @return  self
     */ 
    public function setCity($city)
    {
        $this->city = $city;

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
            $comment->setRedact($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getRedact() === $this) {
                $comment->setRedact(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setRedact($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getRedact() === $this) {
                $post->setRedact(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Session>
     */
    public function getSessions(): Collection
    {
        return $this->sessions;
    }

    public function addSession(Session $session): self
    {
        if (!$this->sessions->contains($session)) {
            $this->sessions[] = $session;
            $session->setPropose($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->removeElement($session)) {
            // set the owning side to null (unless already changed)
            if ($session->getPropose() === $this) {
                $session->setPropose(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Session>
     */
    public function getParticipate(): Collection
    {
        return $this->participate;
    }

    public function addParticipate(Session $participate): self
    {
        if (!$this->participate->contains($participate)) {
            $this->participate[] = $participate;
        }

        return $this;
    }

    public function removeParticipate(Session $participate): self
    {
        $this->participate->removeElement($participate);

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

}
