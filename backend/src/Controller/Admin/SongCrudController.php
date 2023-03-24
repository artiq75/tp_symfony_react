<?php

namespace App\Controller\Admin;

use App\Entity\Song;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use getID3;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Form\Type\VichFileType;

class SongCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Song::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle(Crud::PAGE_INDEX, 'Liste des chansons')
            ->setPageTitle(Crud::PAGE_EDIT, 'Modifier une chanson')
            ->setPageTitle(Crud::PAGE_NEW, 'Ajouter une chanson');
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title', 'Titre de la chanson'),
            ImageField::new('filePath', 'Choisir mp3')
                ->setBasePath('/upload/files/music')
                ->setUploadDir('public/upload/files/music')
                ->hideOnIndex()
            ->hideOnDetail(),
            TextField::new('filePath', 'Aperçu')
                ->hideOnForm()
                ->formatValue(function ($value, $entity) {
                    return '<audio controls>
                                <source src="/upload/files/music/' . $value . '" type="audio/mpeg">
                            </audio>';
                }),
            NumberField::new('duration', 'durée du titre')
                ->hideOnForm(),
            AssociationField::new('album', 'Album associé'),
        ];
    }


    //function pour agir sur les boutons d'actions
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            //permet de customiser les boutons de la page index
            ->update(Crud::PAGE_INDEX, Action::NEW,
                fn(Action $action) => $action
                    ->setIcon('fa fa-add')
                    ->setLabel('Ajouter')
                    ->setCssClass('btn btn-success'))
            ->update(Crud::PAGE_INDEX, Action::EDIT,
                fn(Action $action) => $action
                    ->setIcon('fa fa-pen')
                    ->setLabel('Modifier'))
            ->update(Crud::PAGE_INDEX, Action::DELETE,
                fn(Action $action) => $action
                    ->setIcon('fa fa-trash')
                    ->setLabel('Supprimer'))
            ->update(Crud::PAGE_INDEX, Action::BATCH_DELETE,
                fn(Action $action) => $action
                    ->setIcon('fa fa-trash')
                    ->setLabel('Supprimer'))
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->update(Crud::PAGE_INDEX, Action::DETAIL,
                fn(Action $action) => $action->setIcon('fa fa-info')->setLabel('Informations'))
            //customiser les boutons de la page édition
            ->update(Crud::PAGE_EDIT, Action::SAVE_AND_RETURN,
                fn(Action $action) => $action
                    ->setLabel('Enregistrer et quitter'))
            ->update(Crud::PAGE_EDIT, Action::SAVE_AND_CONTINUE,
                fn(Action $action) => $action
                    ->setLabel('Enregistrer et continuer'))
            //Page de création
            ->update(Crud::PAGE_NEW, Action::SAVE_AND_RETURN,
                fn(Action $action) => $action
                    ->setLabel('Enregistrer'))
            ->update(Crud::PAGE_NEW, Action::SAVE_AND_ADD_ANOTHER,
                fn(Action $action) => $action
                    ->setLabel('Enregistrer et ajouter un nouveau'))
            //pade de détail
            ->update(Crud::PAGE_DETAIL, Action::DELETE,
                fn(Action $action) => $action
                    ->setLabel('Supprimer'))
            ->update(Crud::PAGE_DETAIL, Action::INDEX,
                fn(Action $action) => $action
                    ->setLabel('Retour à la liste'))
            ->update(Crud::PAGE_DETAIL, Action::EDIT,
                fn(Action $action) => $action
                    ->setLabel('Modifier'))


            ;


    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if (!$entityInstance instanceof Song) return;
        $file = $entityInstance->getFilePath();
        $entityInstance->setDuration($this->getDurationFile($file));
        parent::persistEntity($entityManager, $entityInstance);
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if (!$entityInstance instanceof Song) return;
        $file = $entityInstance->getFilePath();
        $entityInstance->setDuration($this->getDurationFile($file));

        parent::updateEntity($entityManager, $entityInstance);
    }

    public function getDurationFile($file)
    {
        $getId3 = new getID3;
        // récupérer le chemin du fichier
        $basePath = $this->getParameter('kernel.project_dir') . '/public/upload/files/music/';
        // récupérer le fichier
        $file = new File($basePath . $file);
        // récupérer les infos du fichier
        // $mp3Infos = $getId3->analyze($file );
        // récupérer la durée du fichier
        $duration = $getId3->analyze($file)['playtime_seconds'];
        return $duration;
    }

}
