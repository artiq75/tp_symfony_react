<?php

namespace App\Controller\Admin;

use App\Entity\Album;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class AlbumCrudController extends AbstractCrudController
{
    //On déclare des constantes
    public const ALBUM_BASE_PATH = 'upload/images/albums';
    public const ALBUM_UPLOAD_DIR = 'public/upload/images/albums';
    public static function getEntityFqcn(): string
    {
        return Album::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle(Crud::PAGE_INDEX, 'Liste des albums')
            ->setPageTitle(Crud::PAGE_EDIT, 'Modifier un album')
            ->setPageTitle(Crud::PAGE_NEW, 'Ajouter un album');
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title', 'Titre de l\'album'),
            //On ajoute les champs d'association avec les autres table
            AssociationField::new('genre', 'Catégorie de l\'album'),
            AssociationField::new('artist', 'Nom de l\'artiste'),
            //Champ d'upload d'une image
            ImageField::new('imagePath', 'Choisir une image de couverture')
            ->setBasePath(self::ALBUM_BASE_PATH)
            ->setUploadDir(self::ALBUM_UPLOAD_DIR)
            ->setUploadedFileNamePattern(
                //on donne un nom de fichier unique pour éviter d'écraser des fichiers
                fn(UploadedFile $file): string => sprintf(
                    'upload_%d_%s.%s',
                    random_int(1,999),
                    $file->getFilename(),
                    $file->guessExtension(),
                )
            ),
            DateField::new('releaseDate', 'Date de sortie'),
            BooleanField::new('isActive', 'En ligne'),
            //ici on cache createdAt et updatedAt, on passera les données grace au persister
            DateField::new('createdAt')->hideOnForm(),
            DateField::new('updatedAt')->hideOnForm(),
            AssociationField::new('songs', 'nbr de pistes')
            ->hideOnForm()

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
    //persister lors de la création d'un album, on génère la date
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof Album) return;
        $entityInstance->setCreatedAt(new \DateTime());
        parent::persistEntity($entityManager, $entityInstance);
    }

    //persister lors de la modification, on génère la date
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof Album) return;
        $entityInstance->setUpdatedAt(new \DateTime());
        parent::updateEntity($entityManager, $entityInstance);
    }

}
