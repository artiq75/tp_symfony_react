import { createSelector } from "@reduxjs/toolkit";

//on récupère les données du slice qu'on stock dans des constantes
const selectAlbums = state => state.albums.albums;
const selectLoading = state => state.albums.loading;
const selectSearchTitle = state => state.albums.searchTitle
const selectSearchBiography = state => state.albums.searchBiography

//on crée le selector
export const selectAlbumsData = createSelector(
    [selectAlbums, selectLoading, selectSearchTitle, selectSearchBiography],
    //on effectue une destructuration d'objet
    (albums, loading, searchTitle, searchBiography) => ({albums, loading, searchTitle, searchBiography})
)