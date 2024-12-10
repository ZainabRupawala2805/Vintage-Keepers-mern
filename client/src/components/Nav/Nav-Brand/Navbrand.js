import './NavBrand.css'
import { Link } from 'react-router-dom';

const NavBrand = () => {
    return ( 
        <div href="#home" className='navbrand__container'>
           <h2 className='navbrand'>
               <Link to="/">Vintage Keepers</Link>
            </h2>
        </div>
     );
}
 
export default NavBrand;