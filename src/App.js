import './styles/App.css';
import Cabinet from './pages/Cabinet';
import Mainpage from './pages/Mainpage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { setUser } from './store/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const usernameLocal = localStorage.getItem('username')
    const isAuthLocal = localStorage.getItem('isAuth')
    const tokenLocal = localStorage.getItem('access_token')
    if (isAuthLocal && usernameLocal)
      dispatch(setUser({
        username: usernameLocal,
        token: tokenLocal,
        isAuth: true
      }))
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' exact element={<Mainpage />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/registration' element={<SignUp />} />
        <Route path='/profile' element={<Cabinet />} />
      </Routes>
    </>
  );
}

export default App;
