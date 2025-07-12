"use client";
import Navbar from '@/components/Navbar'
import ChatBot from '@/components/ChatBot/ChatBot'
import { MainContextProvider } from '@/context/MainContext'
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import {ToastContainer} from 'react-toastify'
import ErrorBoundary from '@/components/ErrorBoundary'
import 'react-toastify/dist/ReactToastify.css'
const MainLayout = ({children}) => {
  return (
    <Provider store={store}>
    <MainContextProvider>
    <ToastContainer/>
    <ErrorBoundary>
      <Navbar/>
      {children}
      <ChatBot/>
    </ErrorBoundary>
    </MainContextProvider>
    </Provider>
  )
}

export default MainLayout