import * as actions from '../types/app'

export interface AppState {
    lyrics: string
}

const initialState: AppState = {
    lyrics: ''
}

export default function appReducer(
    state: AppState = initialState,
    action: actions.LyricsAction
): AppState {
    switch (action.type) {
        case actions.SET_LYRICS:
        case actions.GET_LYRICS_SUCCESS:
            return {
                lyrics: action.lyrics
            }
        default:
            return state
    }
}
