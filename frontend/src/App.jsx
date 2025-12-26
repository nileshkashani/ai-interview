import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/home'
import nextstep from './components/nextstep'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
      <Routes>
        <Route path='/nextstep' element={<nextstep/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
