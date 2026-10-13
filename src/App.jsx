import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import ServiceDetails from "./ServiceDetails"
import Providers from "./pages/Providers"
import Favorites from "./pages/Favorites"
import { FavoritesProvider } from "./FavoritesContext"
import Inbox from "./pages/Inbox"
import AuthPage from "./pages/AuthPage"

function App ()
{
  return (
    <FavoritesProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/services" element={<Services />} />
      <Route path="/Providers" element={<Providers />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/service/:id" element={<ServiceDetails />} />
    </Routes>
    </FavoritesProvider>
  )
}

export default App
