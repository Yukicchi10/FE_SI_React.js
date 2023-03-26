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
      <Logo />
      <Title />
      <ThemeIcon />
      <Search />
      <BellIcon />
      <UserCircle />
      
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size='24' className='top-navigation-icon' />
      ) : (
        <FaMoon size='24' className='top-navigation-icon' />
      )}
    </span>
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
const HashtagIcon = () => <FaHashtag size='20' className='title-hashtag' />;
const Title = () => <h5 className='title-text'></h5>;
const Logo = () => <Navbar.Brand href='/' className='title-image'>
<img fluid
src={LogoSI}
width='250px'
height='auto'
></img>
</Navbar.Brand>

export default TopNavigation;
