import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

// for fetching drinks
const fetchDrinks = useCallback(async () => {
  setLoading(true)

  try {
    const response = await fetch(`${url}${searchTerm}`)
    const data = await response.json();
    console.log(data)

    const {drinks} = data; // destructuring (grab drinks from data)
    if(drinks) {
      const newCocktails = drinks.map((item)=> {
        
        const {
          idDrink, 
          strDrink, 
          strDrinkThumb, 
          strAlcoholic, 
          strGlass
        } = item; // destructring from API (url). // coming from item

        // return a new object
        return {
          id: idDrink, 
          name: strDrink, 
          image: strDrinkThumb, 
          info: strAlcoholic, 
          glass: strGlass
        } // changing the name to something else (properties name) from the obj props (that we gor from API after destructuring)        
      })
      setCocktails(newCocktails);
    }
    else {
      setCocktails([])
    }
    setLoading(false)
  } catch (error) {
    // console.log(error)
    setLoading(false)
  }
},[searchTerm])

useEffect(()=> {
  fetchDrinks()
}, [searchTerm, fetchDrinks])

  return (
  <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm,
  }}>
    {children}</AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
