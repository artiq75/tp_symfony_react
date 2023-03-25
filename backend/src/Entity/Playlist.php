<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PlaylistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PlaylistRepository::class)]
#[ApiResource(
    normalizationContext: [
        'groups' => ['read:Playlist:item', 'write:Playlist:collection']
    ],
    denormalizationContext: [
        'groups' => ['write:Playlist:collection']
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'user' => 'exact'
    ]
)]
class Playlist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:Playlist:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['write:Playlist:collection'])]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'playlists')]
    #[Groups(['write:Playlist:collection'])]
    private ?User $user = null;

    #[ORM\ManyToMany(targetEntity: Song::class, mappedBy: 'playlists')]
    #[Groups(['write:Playlist:collection'])]
    private Collection $songs;

    public function __construct()
    {
        $this->songs = new ArrayCollection();
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Song>
     */
    public function getSongs(): Collection
    {
        return $this->songs;
    }

    public function addSong(Song $song): self
    {
        if (!$this->songs->contains($song)) {
            $this->songs->add($song);
            $song->addPlaylist($this);
        }

        return $this;
    }

    public function removeSong(Song $song): self
    {
        if ($this->songs->removeElement($song)) {
            $song->removePlaylist($this);
        }

        return $this;
    }
}
