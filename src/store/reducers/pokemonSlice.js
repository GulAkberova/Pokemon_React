import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ReactPaginate from "react-paginate";
export const fetchTodos = createAsyncThunk("pokemon/getAllPokemon", (currentpage) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?${currentpage}&limit=50`)
        .then(res => res.data);

})

let initialState = {
    pokemon: [],
    loading: false,
    error: ''
}

const pokemonSlice=createSlice({
    name:'pokemon',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            state.pokemon.push(action.payload);
        }
    },
    extraReducers: builder => {

        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.pokemon = action.payload;
            state.error = "";

        })

        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.pokemon = []
            state.error = action.error.message
        })

    }
})

export default pokemonSlice.reducer
