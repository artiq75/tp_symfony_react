<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
//    #[Route(path: '/login', name: 'app_login')]
//    public function login(AuthenticationUtils $authenticationUtils): Response
//    {
//        // if ($this->getUser()) {
//        //     return $this->redirectToRoute('target_path');
//        // }
//
//        // get the login error if there is one
//        $error = $authenticationUtils->getLastAuthenticationError();
//        // last username entered by the user
//        $lastUsername = $authenticationUtils->getLastUsername();
//
//        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
//    }

// ...

    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        // If user is already authenticated, redirect them to homepage or any other route
        if ($this->getUser()) {
            return new JsonResponse([
                'success' => true,
                'id' => $this->getUser()->getId(),
                'email' => $this->getUser()->getEmail(),
                'nickname' => $this->getUser()->getNickname(),
                'message' => 'Utilisateur déja en session'
            ]);
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return new JsonResponse([
            'success' => true,
            'id' => $this->getUser()->getId(),
            'email' => $this->getUser()->getEmail(),
            'nickname' => $this->getUser()->getNickname(),
            'last_username' => $lastUsername,
            'error' => $error?->getMessage(),
            'message' => 'Connexion réussie'
        ]);
    }


    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
