import { configureStore } from '@reduxjs/toolkit'
import albumsReducer from './album/albumSlice'
import playerReducer from './player/playerSlice'
import playlistSlice from './playlist/playlistSlice'

const store = configureStore({
    reducer: {
        //on déclarera ici nos futurs reducers
        albums: albumsReducer,
        player: playerReducer,
        playlists: playlistSlice
    }
})

export default store