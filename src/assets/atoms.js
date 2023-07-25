import { atom } from 'recoil'

export const topArtistsState = atom({
    key: 'topArtistsState',
    default: [],
})

export const likedSongsState = atom({
    key: 'likedSongsState',
    default: []
})

export const numOfItems = atom({
    key: 'numOfItems',
    default: ""
})

export const itemType = atom({
    key: 'itemType',
    default: ""
})

export const tokenState = atom({
    key: 'tokenState',
    default: ""
})

export const genresWithTracksState = atom({
    key: 'genresWithTrackState',
    default: []
})

export const userIdState = atom({
    key: `userIdState`,
    default: ""
})

export const userPlaylistsState = atom({
    key: `userPlaylistsState`,
    default: []
})