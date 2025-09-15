import React from 'react'
import Header from './components/headers/Header'
import Footer from './components/headers/Footer'
import Pages from './components/mainpages/Pages'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'


const App = () => {
  return (
    <DataProvider>
    <Router>
    <div className='App'>
      <Header/>
      <Pages/>
      <Footer/>
    </div>
    </Router>
    </DataProvider>
  )
}
export default App