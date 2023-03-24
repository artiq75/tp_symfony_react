import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Detail from "../screens/Detail";
import ErrorPage from "../screens/ErrorPage";
import Home from "../screens/Home";
import Library from "../screens/Library";
import Playlist from "../screens/Playlist";
import Search from "../screens/Search";
import Wishlist from "../screens/Wishlist";

const Router = createBrowserRouter([
    {
        element: (
            <>
                {/* on appelle l'élément qu'on affichera sur toutes nos vues */}
                <App />
            </>
        ),
        
        //On appelle la vue ErrorPage en cas de route inconnu ou d'erreur
        errorElement: <ErrorPage/>,
        //on déclare ensuite toutes les vues avec leur route
        children: [
            {
                path: '/',
                element: <Home/>,
                errorElement: <ErrorPage/>
            },
            {
                path: '/search',
                element: <Search/>
            },
            {
                path: '/library',
                element: <Library/>
            },
            {
                path: '/add-playlist',
                element: <Playlist/>
            },
            {
                path: '/wishlist',
                element: <Wishlist/>
            },
            {
                path: '/detail',
                element: <Detail/>
            },
        ]
    }
])

export default Router;