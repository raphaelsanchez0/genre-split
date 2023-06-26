class Track {
    constructor(name, id, artist, artistId, coverImgUrl) {
        this.name = name
        this.id = id
        this.artist = artist
        this.artistId = artistId
        this.coverImgUrl = coverImgUrl
        this.genres = null;
    }
    setGenres(genres) {
        this.genres = genres;
    }

    get getGenres() {
        return this.genres
    }
}

export default Track;