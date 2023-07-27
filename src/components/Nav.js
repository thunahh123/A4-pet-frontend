import { NavLink } from "react-router-dom";

export const Nav = function(){
    return(
      <nav className="flex justify-center divide-x-2 divide-slate-600 my-2 max-w-3xl mx-auto">
        {/**Link components */}
        <NavLink className="navLink" to="/">Home</NavLink>
        <NavLink className="navLink" to="/inventory">Inventory</NavLink>
        <NavLink className="navLink" to="/search">Search</NavLink>
        <NavLink className="navLink" to="/about">About</NavLink>
      </nav>    
      
      
    )
  }
  