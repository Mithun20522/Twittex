import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

const App = () => {
  return (
    <div className='flex max-w-6xl mx-auto'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  )
}

export default App