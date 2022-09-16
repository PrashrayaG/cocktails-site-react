import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {

  const {cocktails, loading} = useGlobalContext();

  if(loading) {
    return <Loading />
  }

  if (cocktails.length < 1) {
    return (
        <h2 className='section-title'>
          No cocktails matched here. Please check the cocktails that you want to search.
        </h2>
    )
  }

  return (
   // displaying cocktail list
   <section className='section'>
    <h2 className='section-title'>Cocktails</h2>

    <div className="cocktails-center">
      {cocktails.map((item)=> {
        return <Cocktail key={item.id} {...item}/>
      })}
    </div>
   </section>
  )
}

export default CocktailList
