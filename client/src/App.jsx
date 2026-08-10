import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Budget from './pages/Budget.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import Register from './pages/Register.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/transactions' element={<Transactions/>}/>
          <Route path='/budget' element={<Budget/>}/>
          <Route path='/reports' element={<Reports/>}/>
          <Route path='/settings' element={<Settings/>}/>

          <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
