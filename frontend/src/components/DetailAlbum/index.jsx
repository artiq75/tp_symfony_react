import React from 'react'
import HeaderDetail from './HeaderDetail'
import ListAlbumSong from './ListAlbumSong'
import ToolsBarDetail from './ToolsBarDetail'

const DetailAlbum = ({dataAlbum}) => {

    return (
    <>
        <HeaderDetail dataAlbum={dataAlbum} />
        <ToolsBarDetail dataAlbum={dataAlbum} />
        <ListAlbumSong dataAlbum={dataAlbum} />
    </>
  )
}

export default DetailAlbum