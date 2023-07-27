import { Routes, Route } from "react-router-dom";
import {Home} from "./Home";
import {Inventory} from "./Inventory";
import {Search} from "./Search";
import {About} from "./About";

export const Main = function(){
    return(      
        <Routes>
            {/**Route components */}
            <Route path="" element={<Home />}/>
            <Route path="inventory" element={<Inventory />}/>
            <Route path="search" element={<Search />}/>
            <Route path="about" element={<About />}/>
        </Routes>
        
    )
  }
  