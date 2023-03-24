import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'playlist',
  initialState: {
    playlists: []
  },
  reducers: {
    add: (state, action) => {
      state.playlists = action.payload;
    }
  }
})

export const selectPlaylists = (state) => state.playlists

export const { add } = slice.actions

export default slice.reducer
