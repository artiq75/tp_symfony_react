<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PreferenceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PreferenceRepository::class)]
#[ApiResource(
    normalizationContext: [
        'groups' => [
            'read:Preference:item'
        ]
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'user' => 'exact',
        'album' => 'exact'
    ],
    
)]
class Preference
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:Preference:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'preferences')]
    private ?User $user = null;

    #[ORM\ManyToOne]
    #[Groups(['read:Preference:item'])]
    private ?Album $album = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

        return $this;
    }
}
