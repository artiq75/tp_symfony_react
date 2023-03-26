import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { api } from '../../constants/apiConstant'

const slice = createSlice({
  //on lui donne un nom
  name: 'albums',
  //on initialise les valeurs par défault
  initialState: {
    loading: false,
    albums: [],
    searchTitle: [],
    searchBiography: []
  },
  //reducer permet de remplir les valeurs des states
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAlbums: (state, action) => {
      state.albums = action.payload
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload
    },
    setSearchBiography: (state, action) => {
      state.searchBiography = action.payload
    }
  }
})

//on exporte sous forme de constantes les "setter" à l'application
export const { setLoading, setAlbums, setSearchTitle, setSearchBiography } =
  slice.actions
//on crée la méthode qui permet de récupérer les infos en BDD
export const fetchAlbums = () => async (dispatch) => {
  try {
    //on passe setLoading à true pour gérer le chargement des données
    dispatch(setLoading(true))
    //on va chercher les infos en BDD
    const response = await axios.get(`${api}/albums?isActive=true`)
    //on set les données reçu dans notre slice grace à setAlbums
    dispatch(setAlbums(response.data))
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
    dispatch(setLoading(false))
  }
}

export const fetchSearch = (word) => async (dispatch) => {
  try {
    //on passe setLoading à true pour gérer le chargement des données
    dispatch(setLoading(true))
    //on va chercher les infos en BDD
    const responseTitle = await axios.get(
      `${api}/albums?isActive=true&title=${word}`
    )
    const responseBiography = await axios.get(
      `${api}/albums?isActive=true&artist.biography=${word}`
    )
    //on set les données reçu dans notre slice grace à setAlbums
    dispatch(setSearchTitle(responseTitle.data))
    dispatch(setSearchBiography(responseBiography.data))
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
    dispatch(setLoading(false))
  }
}

//on exporte notre reducer
export default slice.reducer
