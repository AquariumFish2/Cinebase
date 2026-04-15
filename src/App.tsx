import { useState, type JSX } from "react"

function App():JSX.Element{
  const[currentPage,setCurrentPage] = useState("home");
  return currentPage == "home"?<button onClick={()=>setCurrentPage("movies")}>Movies</button>:<button onClick={()=>setCurrentPage("home")}>Home</button>
}

export default App