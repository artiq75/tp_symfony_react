import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorPage";
import HomeOffline from "../screens/Offline/HomeOffline";
import Login from "../screens/Offline/Login";
import Registration from "../screens/Offline/Registration";

const OfflineRouter = createBrowserRouter([
    {
        element: (
            <>
                {/* on appelle l'élément qu'on affichera sur toutes nos vues */}
                <HomeOffline />
            </>
        ),
        //On appelle la vue ErrorPage en cas de route inconnu ou d'erreur
        errorElement: <ErrorPage/>,
        //on déclare ensuite toutes les vues avec leur route
        children: [
            {
                path: '/',
                element: <Login/>,
                errorElement: <ErrorPage/>
            },
            {
                path: '/registration',
                element: <Registration/>
            },
            
        ]
    }
])

export default OfflineRouter;