export type ActionType = {
    payload: object
}

export type Action = {
    type: string,
    payload: {
        id: string,
        title: string,
        artist: string,
        album: string,
        genre: string,
    }
}

export type FilterAction = {
    type: string,
    payload: {
        filter: string,
        filterBy: string,
    }
}