import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore, createStore } from '@reduxjs/toolkit';
import pokemonReducer from './store/reducers/pokemonSlice'

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
  
    pokemonReducer: pokemonReducer
  }
})
root.render(
   <Provider store={store}>
     <App />
   </Provider>
);

