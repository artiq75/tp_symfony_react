import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { api } from '../../constants/apiConstant'

const slice = createSlice({
  //on lui donne un nom
  name: 'playlists',
  //on initialise les valeurs par défault
  initialState: {
    loading: false,
    playlist: {},
    playlists: []
  },
  //reducer permet de remplir les valeurs des states
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload
    },
    addPlaylist: (state, action) => {
      state.playlists.push(action.payload)
    }
  }
})

//on exporte sous forme de constantes les "setter" à l'application
export const { setLoading, setPlaylists, setPlaylist, addPlaylist } =
  slice.actions

//on crée la méthode qui permet de récupérer les infos en BDD
export const fetchPlaylists = (userId) => async (dispatch) => {
  try {
    //on passe setLoading à true pour gérer le chargement des données
    dispatch(setLoading(true))
    //on va chercher les infos en BDD
    const { data } = await axios.get(`${api}/playlists?user=${userId}`)
    //on set les données reçu dans notre slice grace à setPlaylists
    dispatch(setPlaylists(data['hydra:member']))
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
    dispatch(setLoading(false))
  }
}

//on crée la méthode qui permet de récupérer les infos en BDD
export const fetchPlaylist = (playlistId) => async (dispatch) => {
  try {
    //on passe setLoading à true pour gérer le chargement des données
    dispatch(setLoading(true))
    //on va chercher les infos en BDD
    const response = await axios.get(`${api}/playlists/${playlistId}`)
    //on set les données reçu dans notre slice grace à setPlaylists
    dispatch(setPlaylist(response.data))
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
    dispatch(setLoading(false))
  }
}

//on exporte notre reducer
export default slice.reducer
