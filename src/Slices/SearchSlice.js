import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchInput:'',
    allConnections:[]
}

export const SearchSlice = createSlice({
    name:'search',
    initialState,
    reducers: {
        SetSearch: (state,action) =>{state.searchInput = action.payload},
        SetAllConnection: (state,action) =>{state.allConnections = action.payload},
    }

})

export const {SetSearch,SetAllConnection} = SearchSlice.actions

export default SearchSlice.reducer