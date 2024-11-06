import './NotFound.css';
import { Link } from "react-router-dom";

export function NotFound() 
{
    return (
      <div>
      <div className='nav'> 
      <Link to={'/'} className='minazuki'>Minazuki</Link>
      </div>
      <div className='error'>
        <img src="\anya.gif" alt="" />
        <p>
          <span className="not-found-text">
            <i1>Oh no!</i1> It seems you've stumbled upon the mysterious <i>404 - Not Found</i> territory. The page you seek is elusive, lost in the digital abyss. Take a moment to retrace your steps or return to the homepage. For any assistance, our support team is ready to guide you through this virtual maze.
          </span>
        </p>
      </div>
      </div>
    );
  }
  export default NotFound;