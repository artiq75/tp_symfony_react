import { createSlice } from "@reduxjs/toolkit";

//initialiser les variables
const initialState = {
    currentSongs: [], //tableau de chanson en cours 
    currentAlbum: [], //album en cours de lecture
    currentIndex: 0, // l'index de la chanson en cours de lecture
    isActive: false, // si le player est activé
    isPlaying: false, // si on est en mode play
    activeSong: {}, //la chanson en cours de lecture
}

//creation du slice pour le player
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        //Tout ce que l'on stock lorsqu'on active une chanson
        setActiveSong: (state, action) => {
            //stockage de la chanson en lecture
            state.activeSong = action.payload.songs[action.payload.index];
            //stocker le tableau entier de chanson
            state.currentSongs = action.payload?.data?.songs;
            //stochage de l'index
            state.currentIndex = action.payload.index;
            //stockage de l'état du player
            state.isActive = true;
        },

        //stockage des infos de l'album
        setActiveAlbum: (state, action) => {
            state.currentAlbum = action.payload?.data
        },
        //pour avancer la liste de lecture
        nextSong: (state, action)=> {
            //permet de récupérer la chanson dans tableau à l'index donné
            state.activeSong = state.currentSongs[action.payload];
            //stock le nouvel index
            state.currentIndex = action.payload;
            state.isActive = true;
        },
        //pour avancer la liste de lecture
        prevSong: (state, action)=> {
            //permet de récupérer la chanson dans tableau à l'index donné
            state.activeSong = state.currentSongs[action.payload];
            //stock le nouvel index
            state.currentIndex = action.payload;
            state.isActive = true;
        },
        //gestion du play/pause
        playPause: (state,action) => {
            //change l'état de isPlaying suivant l'état d'origine
            state.isPlaying = action.payload
        }

    }
})

//on exporte les "actions"
export const {setActiveSong, setActiveAlbum, nextSong, prevSong, playPause} = playerSlice.actions;

//on finit par exporter les reducers
export default playerSlice.reducer;