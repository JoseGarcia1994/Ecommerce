import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import AppNavbar from './components/AppNavbar'
import Purchases from "./pages/Purchases"
import Login from "./pages/Login"
import ProductDetail from "./pages/ProductDetail"
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      {
        isLoading && <Loader />
      }
      <AppNavbar />
      <Container fluid>
        <Routes>

          <Route
            element={<Home />}
            path="/"
          />

          <Route
            element={<Login />}
            path="/login"
          />

          <Route
            element={<ProductDetail />}
            path="/product/:id"
          />

          <Route
          element={ <ProtectedRoutes /> }
          >
            <Route
            element={<Purchases />}
            path="/purchases"
            />

          </Route>
          

        </Routes>
      </Container>

    </HashRouter>
  )
}

export default App
