import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import ServiceDetails from "./ServiceDetails"
import Providers from "./pages/Providers"

function App ()
{
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/services" element={<Services />} />
      <Route path="/Providers" element={<Providers />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/service/:id" element={<ServiceDetails />} />
    </Routes>
  )
}

export default App
