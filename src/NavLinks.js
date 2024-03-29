import React from 'react'
import { Link } from 'react-router-dom';
import './NavLinks.css'

export function NavLinks({tab}) {
  return (
    <div className='link'>
    <Link to={'/'} className={ `anime ${tab === 'anime' && 'active'}`}> Anime </Link>
    <Link to={'/movie'} className={ `movie ${tab === 'movie' && 'active'}`}> Movie </Link>
    <Link to={'/drama'}className={ `drama ${tab === 'drama' && 'active'}`}> Drama </Link>
    </div>
  )
}
export default NavLinks;

