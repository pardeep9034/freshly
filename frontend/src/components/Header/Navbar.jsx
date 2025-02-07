import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link} from 'react-router-dom'; // Assuming React Router is used
import { useContext } from 'react';
import { UserContext } from '../../utils/GeneralContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const pages = ['Products', 'Orders', 'Cart'];
const settings = ['Profile', 'sales', 'Logout'];

function Navbar() {
  const Base_URL = import.meta.env.VITE_BACKEND_URL;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const{user}=useContext(UserContext);
  const navigate=useNavigate();

 

  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlesetting = async() => {
    if(settings[2]==='Logout'){
      try{
        const response = await axios.get(`${Base_URL}/user/logout`, {
          withCredentials: true,
        });
        // console.log('User logged out:', response.data);
        navigate('/login');
      }
      catch(error){
        // console.error('Logout failed:', error);
      }
      
      
      
    };

  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#cdeda3', // Light translucent white
        color: '#2F4F2F', // Deep forest green for text
        // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
        backdropFilter: 'blur(10px)', // Background blur
        WebkitBackdropFilter: 'blur(15px)', // Background blur for Safari
      }}
      
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Brand Name */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              fontSize: '2rem',
              letterSpacing: '.1rem',
              color: '#102000',
              textDecoration: 'none',
            }}
          >
            Freshly
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#102000' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
             
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } ,"& .MuiMenu-paper": {
                bgcolor: '#f9faef',
                color: '#102000',
                border: '1px solid #102000',
                borderRadius: '8px',
              }}}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                    sx={{
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: '#102000',
                      
                      
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Brand Name for Mobile */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#102000',
              textDecoration: 'none',
            }}
          >
            Freshly
          </Typography>

          {/* Desktop Menu */}
          {user ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } ,justifyContent:"center",mr:8 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{
                    m: 2,
                    
                    color: '#102000',
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          )}

          {/* User Menu */}
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name || 'User'} src={user.avatar || ''} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' ,mr:"40px" ,
                  "& .MuiMenu-paper": {
                    bgcolor: '#f9faef',
                    color: '#102000',
                    border: '1px solid #102000',
                    borderRadius: '8px',
                }}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}
                  // sx={{display:"flex",justifyContent:"center" ,bgcolor:"#f9faef",color:"#102000"}}
                  >
                    <Typography textAlign="center"onClick={handlesetting}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
         
            
            

            <Button
              component={Link}
              to="/login"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                backgroundColor: '#5CB85C', // Vibrant green
                padding: '5px 15px',
                borderRadius: '25px',
                '&:hover': {
                  backgroundColor: '#4CA34C',
                },
              }}
            >
              login
            </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
