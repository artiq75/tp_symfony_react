<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SongRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


#[ORM\Entity(repositoryClass: SongRepository::class)]
#[Vich\Uploadable]
#[ApiResource]
class Song
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['album:read', 'read:Playlist:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['album:read', 'read:Playlist:item'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['album:read', 'read:Playlist:item'])]
    private ?string $filePath = null;

    //Ajout d'une nouvelle propriété
    #[Vich\UploadableField(mapping: 'songs', fileNameProperty: 'filePath')]
    private ?File $filePathFile = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['album:read', 'read:Playlist:item'])]
    private ?int $duration = null;

    #[ORM\ManyToOne(inversedBy: 'songs')]
    #[Groups(['read:Playlist:item'])]
    private ?Album $album = null;

    #[ORM\ManyToMany(targetEntity: Playlist::class, inversedBy: 'songs')]
    private Collection $playlists;

    public function __construct()
    {
        $this->playlists = new ArrayCollection();
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

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    //ici on ajoute les méthodes de filePathFile

    /**
     * @return File|null
     */
    public function getFilePathFile(): ?File
    {
        return $this->filePathFile;
    }

    /**
     * @param File|null $filePathFile
     */
    public function setFilePathFile(?File $filePathFile): void
    {
        $this->filePathFile = $filePathFile;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

        return $this;
    }

    /**
     * @return Collection<int, Playlist>
     */
    public function getPlaylists(): Collection
    {
        return $this->playlists;
    }

    public function addPlaylist(Playlist $playlist): self
    {
        if (!$this->playlists->contains($playlist)) {
            $this->playlists->add($playlist);
        }

        return $this;
    }

    public function removePlaylist(Playlist $playlist): self
    {
        $this->playlists->removeElement($playlist);

        return $this;
    }

}