import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './redux/store.js'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer : rootReducer,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
  <Toaster/>
    <App />
  </BrowserRouter>
  </Provider>
)
