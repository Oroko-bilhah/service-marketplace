import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Providers from "./pages/Providers"

function App ()
{
  return (
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="/Services/" element={ <Services/>} />
      <Route path="/Providers/" element={ <Providers/>} />
    </Routes>
  )
}

export default App