import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import useDarkMode from '../../hooks/useDarkMode';
import LogoSI from "../../Img/LogoSI.png"
import Navbar from 'react-bootstrap/Navbar';

const TopNavigation = () => {
  return (
    <div className='top-navigation'>
      <Title />
      <Search />
      <BellIcon />
      <UserCircle />
      
    </div>
  );
};

const Search = () => (
  <div className='d-flex search'>
    <input className='search-input' type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);
const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;
const UserCircle = () => <FaUserCircle size='24' className='top-navigation-icon' />;
const Title = () => <h5 className='title-text'></h5>;

export default TopNavigation;
