import React, { useState, useEffect } from 'react';

export const Search = function(){
    //
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
    //const [searchResults, setSearchResults] = useState([]);
  
    // Searches for pets in the pet inventory.  Again we use hardcoded data but
    // we could build a custom fetch URL string.
    function searchPet()
    {
      fetch("http://localhost:3001/api?act=search&term="+ searchTerm)
      .then(res => res.json())
      .then(
        (result) => {
          //setSearchResults(JSON.stringify(result));
          setPets(result);
        });
    }
    console.log("rendering");
    //we have 2 state vars which are pets, and searchTerm;
    //pets are all the pets being showed on the table, 
    //and the search term is whatever user type to search from the table
  
    //whenever we type on the input box, it changes the searchTerm because
    //onChange function is set for the input, which 
    //runs the searchPet function because searchTerm is in the dependency array for the UseEffect hooks
  
    //the searchPet function fetch pets from the api with the searchTerm
    //then parses it as JSON with which we finally set the pets variable. 
    //then we rerender the table because pets changed, 
  
    //useEffect hooks
    //useEffect(fetchPets,[]);
    useEffect(searchPet,[searchTerm]);
  
    return(
      <div className="flex flex-col items-center gap-8 justify-evenly mt-8">
      <form>
          <input type="text" onChange={(e)=>{setSearchTerm(e.target.value)}} placeholder='Search pets...'/>
          
      </form>  
      <table className="w-5/8 table-fixed border-collapse">
        <thead>
            <tr className='border-b border-light'>            
              <th className=" p-5 rounded-tl-2xl bg-pink w-1/6">Animal</th>
              <th className="bg-pink p-5">Description</th>
              <th className="bg-pink p-5 w-1/12">Age</th>
              <th className="bg-pink p-5 w-1/12">Price</th>            
            </tr>
        </thead>
        <tbody className='divide-y divide-light bg-dark text-white'>
        {pets.map(pet => (
              <tr key={pet.id}>              
                <td className="p-5">{pet.animal}</td> 
                <td className="p-5">{pet.description}</td>
                <td className="p-5">{pet.age}</td>
                <td className="p-5">{pet.price}</td>              
              </tr>
              ))}
        </tbody>
      </table>
  
      {/* <h2>Search Results</h2> */}
      {/* <pre>{searchResults}</pre> */}
      </div>
    )
  }
  