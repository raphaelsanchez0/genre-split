import { atom } from 'recoil'

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