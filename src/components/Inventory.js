import React, { useState, useEffect } from 'react';
export const Inventory = function(){
    const [pets, setPets] = useState([]);
    //
    const [newAnimal, setNewAnimal] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newPrice, setNewPrice] = useState("");
    //
    const [addingPet, setAddingPet]= useState(false);
    const [updatingPet, setUpdatingPet]= useState(false);
    const [updateId, setUpdateId] = useState("");
  
    //delete pets
    function deletePet(id)
    {
      fetch("https://pet-backend-q6c5.onrender.com/api?act=delete&id="+ id)
      .then(res => res.json())
      .then(
        (result) => {
          fetchPets();
        })    
    }
  
    //Add pets
    function addPet()
    {
      fetch("https://pet-backend-q6c5.onrender.com/api?act=add&animal="+newAnimal+"&description="+newDesc+"&age="+newAge+"&price="+newPrice)
      .then(res => res.json())
      .then(
        (result) => {
          fetchPets();
        })    
    }
  
    
    //update pets
    function updatePet()
    {
      fetch("https://pet-backend-q6c5.onrender.com/api?act=update&id="+updateId +"&animal="+ newAnimal+"&description="+newDesc+"&age="+newAge+"&price="+newPrice)
      .then(res => res.json())
      .then(
        (result) => {
          fetchPets();
        });
    }  
    
    
  
    //fetch Pets
    function fetchPets()
    {
      fetch("https://pet-backend-q6c5.onrender.com/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {
            setPets(result);
        })    
    }
    //this hook takes 2 arguments (a function and a dependency array)
    //and it will call the function whenever a variable in the dependency array changes
    //If it is empty, it'll only run when the component first loads in.
    useEffect(fetchPets,[]);
  
    // useEffect()
  
    //
    function startAdding(){
        setAddingPet(true);
        
    }
  
    //startEditing
    function startEditing(pet){
      setUpdatingPet(true);
      setAddingPet(false);
      setNewAnimal(pet.animal);
      setNewDesc(pet.description);
      setNewAge(pet.age);
      setNewPrice(pet.price);
      setUpdateId(pet.id);
    }
  
    //close the Form
    function hideForm(){
      setAddingPet(false);
      setUpdatingPet(false);    
      setNewAnimal("");
      setNewDesc("");
      setNewAge("");
      setNewPrice("");
    }
  
  
    return(
      <div className="flex flex-col items-center gap-8 justify-evenly mt-8">
      {!addingPet && !updatingPet
      ?
      <button className = "btn  " onClick={()=>{startAdding()}}>Add new pet</button>
      :
      <button className = "btn " onClick={()=>{hideForm()}}>Cancel</button>
      }
      
      
      <form id="addPetForm" className={(addingPet || updatingPet? "" : "hideForm") + " flex flex-col items-center w-3/5 gap-5 border-4 p-4"} >        
          <div className="flex justify-between w-full">
            <label>Animal</label>
            <input type="text" value={newAnimal} onChange={(e)=>{setNewAnimal(e.target.value)}} />
            <label>Description</label>
            <input type="text" value={newDesc} onChange={(e)=>{setNewDesc(e.target.value)}} />
          </div>
          <div className="flex justify-between w-full">
            <label>Age</label>
            <input type="text" value={newAge} onChange={(e)=>{setNewAge(e.target.value)}} />
            <label>Price</label>
            <input type="text" value={newPrice} onChange={(e)=>{setNewPrice(e.target.value)}} />
          </div>
          
          {addingPet
          ?
          <button className = "btn " onClick={()=>{addPet(); hideForm()}}>Add&nbsp;pet</button>
          :
          <button className = "btn " onClick={()=>{updatePet(); hideForm()}}>Edit pet</button>
          }
          
              
  
      </form>
      <table className="w-5/8 table-fixed border-collapse">
        <thead>
            <tr className='border-b border-light'>            
              <th className=" p-5 rounded-tl-2xl bg-pink w-1/6">Animal</th>
              <th className="bg-pink p-5">Description</th>
              <th className="bg-pink p-5 w-1/12">Age</th>
              <th className="bg-pink p-5 w-1/12">Price</th>
              <th className="bg-pink rounded-tr-2xl w-1/6"></th>
            </tr>
        </thead>
        <tbody className='divide-y divide-light bg-dark text-white'>
        {pets.map(pet => (
              <tr key={pet.id} className="">              
                <td className="p-5">{pet.animal}</td> 
                <td className="p-5">{pet.description}</td>
                <td className="p-5">{pet.age}</td>
                <td className="p-5">{pet.price}</td>
                <td>
                  <span className="hover:text-mid hover:cursor-pointer p-5" onClick={()=>{deletePet(pet.id)}}>Delete</span>
                  <span className="hover:text-mid hover:cursor-pointer p-5"onClick={()=>{startEditing(pet)}}>Edit</span>
                </td>
                
              </tr>))}
        </tbody>
      </table>
      </div>
    )
  }
  
  