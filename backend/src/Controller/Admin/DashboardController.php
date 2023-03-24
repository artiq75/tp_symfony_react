<?php

namespace App\Controller\Admin;

use App\Entity\Album;
use App\Entity\Artist;
use App\Entity\Genre;
use App\Entity\Song;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    //on crée le constructeur qui prend comme paramètre une
    // instance de AdminUrlGenerator
    public function __construct(
        private AdminUrlGenerator $adminUrlGenerator
    )
    {
    }

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        //on donne l'entité que l'on veut afficher au point d'entrée de BO
        $url = $this->adminUrlGenerator
            ->setController(GenreCrudController::class)
            ->generateUrl();
        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<img src="/images/logo2.png" style="width:30px; height:30px;"><span> Spotify</span>')
            ->setFaviconPath('/images/logo2.png');
    }

    public function configureMenuItems(): iterable
    {
        //Section principale
        yield MenuItem::section('Gestion Discographique');
        //Liste des sous-menus
        yield MenuItem::subMenu('Gestion Catégories', 'fa fa-star')
            ->setSubItems([
                MenuItem::linkToCrud(
                    'Ajouter une catégorie',
                    'fa fa-plus',
                    Genre::class
                )
                    ->setAction(Crud::PAGE_NEW),
                MenuItem::linkToCrud('Voir les catégories', 'fa fa-eye', Genre::class)
            ]);
        yield MenuItem::subMenu('Gestion Albums', 'fa fa-music')
            ->setSubItems([
                MenuItem::linkToCrud(
                    'Ajouter un album',
                    'fa fa-plus',
                    Album::class
                )
                    ->setAction(Crud::PAGE_NEW),
                MenuItem::linkToCrud('Voir les albums', 'fa fa-eye', Album::class)
            ]);
        yield MenuItem::subMenu('Gestion Chansons', 'fa fa-play')
            ->setSubItems([
                MenuItem::linkToCrud(
                    'Ajouter une chanson',
                    'fa fa-plus',
                    Song::class
                )
                    ->setAction(Crud::PAGE_NEW),
                MenuItem::linkToCrud('Voir les chansons', 'fa fa-eye', Song::class)
            ]);
        yield MenuItem::subMenu('Gestion Artistes', 'fa fa-user')
            ->setSubItems([
                MenuItem::linkToCrud(
                    'Ajouter un artiste',
                    'fa fa-plus',
                    Artist::class
                )
                    ->setAction(Crud::PAGE_NEW),
                MenuItem::linkToCrud('Voir les artistes', 'fa fa-eye', Artist::class)
            ]);

    }
}
