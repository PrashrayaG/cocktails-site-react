import React from 'react'
import Loading from '../components/Loading'

import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {

  const {id} = useParams();

  const [loading, setLoading] =React.useState(false);
  const [cocktail, setCocktail] =React.useState(null);

  React.useEffect(()=> {

    setLoading(true);
    async function getCocktail () {
      try {
        const response = await fetch (`${url}${id}`);
        const data = await response.json()
          // console.log(data) 

          if(data.drinks) { // if data drinks exist then
            const {
              strDrink: name, // destrcutring from the api and changing the properties name for our app
              strDrinkThumb:image, 
              strAlcoholic: info, 
              strCategory: category, 
              strGlass: glass, 
              strInstructions: instructions, 
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5
            } = data.drinks[0] // since it is an array. [0] = first elemenet

            //ingredients array
            const ingredients = [
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5
            ]
            const newCocktail = {
              name, 
              image, 
              info, 
              category, 
              glass, 
              instructions, 
              ingredients
            }
            setCocktail(newCocktail)
          }
          else {
            setCocktail(null)
          }
          setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    getCocktail ()
  },[]) // every time component render or id changes, then fetch that specific cocktail


  if(loading) {
    return <Loading/>
  }
  if (!cocktail) { // if the cocktail does not exist
    return <h2 className='section-title'>No cocktail to display. Please check carefully</h2>
  }

// destrcutring props from objects then place them inside of return
const {name, image, category, info, glass, instructions, ingredients} = cocktail;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className= 'btn btn-primary'>
        Back To Home
      </Link>
      <h2 className='section-title'>{name}</h2>

      <div className='drink'>
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className='drink-data'>name: </span> 
            {name}
          </p>

          <p>
            <span className='drink-data'>category: </span> {category}
          </p>

          <p>
            <span className='drink-data'>info: </span> {info}
          </p>

          <p>
            <span className='drink-data'>glass: </span> {glass}
          </p>

          <p>
            <span className='drink-data'>instructions: </span> {instructions}
          </p>

          {/* // for ingredients */}
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients.map((item, index)=> {
              return item ? <span key={index}>{item}</span> : null // if the item is there return span with key index . if not return null
            })}
          </p>

        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
