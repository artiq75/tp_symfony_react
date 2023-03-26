import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { api } from '../../constants/apiConstant'

const slice = createSlice({
  //on lui donne un nom
  name: 'preferences',
  //on initialise les valeurs par défault
  initialState: {
    loading: false,
    preferences: []
  },
  //reducer permet de remplir les valeurs des states
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload
    },
    addPreference: (state, action) => {
      state.preferences.push(action.payload)
    },
    deletePreference: (state, action) => {
      state.preferences = state.preferences.filter(
        (p) => p.id !== action.payload
      )
    }
  }
})

//on exporte sous forme de constantes les "setter" à l'application
export const { setLoading, setPreferences, setPlaylist, addPreference, deletePreference } =
  slice.actions

//on crée la méthode qui permet de récupérer les infos en BDD
export const fetchPreferences = (userId) => async (dispatch) => {
  try {
    //on passe setLoading à true pour gérer le chargement des données
    dispatch(setLoading(true))
    //on va chercher les infos en BDD
    const { data } = await axios.get(`${api}/preferences?user=${userId}`)
    //on set les données reçu dans notre slice grace à setPreferences
    dispatch(setPreferences(data['hydra:member']))
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
    dispatch(setLoading(false))
  }
}

//on exporte notre reducer
export default slice.reducer
