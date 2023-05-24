import { atom } from 'recoil'

export const topArtistsState = atom({
    key: 'topArtistsState',
    default: [],
})

export const numOfItems = atom({
    key: 'numOfItems',
    default: ""
})

export const itemType = atom({
    key: 'itemType',
    default: ""
})