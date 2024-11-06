import React from 'react'
import { Link } from 'react-router-dom';
import './MobileNav.css'

export function MobileNav({tab}) {
  return (
    <div className='MobileNav'>
    <Link to={'/'} className={ `anime ${tab === 'anime' && 'active'}`}> Anime </Link>
    <Link to={'/movie'} className={ `movie ${tab === 'movie' && 'active'}`}> Movie </Link>
    <Link to={'/drama'}className={ `drama ${tab === 'drama' && 'active'}`}> Drama </Link>
    </div>
  )
}
export default MobileNav;
