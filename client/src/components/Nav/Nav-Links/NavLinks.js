import { Link } from 'react-router-dom';
import './NavLinks.css';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useContext } from 'react';

const NavLinks = () => {
  const {headerNavbarLinks} = useContext(ThemeContext);
  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          {headerNavbarLinks.map((item) => (
            <li key={item.label} className="nav-link">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
