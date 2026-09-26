import { Route, Routes } from "react-router-dom"
import "./App.css"
import Footer from "./components/Footer"
import Home from "./page/Home"
import Recipes from "./page/Recipes"
function App() {
  return( 
   <div>
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/recipes" element={<Recipes/>} />
    </Routes>
   <Footer/>
    </div>
  )
}

export default App