import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {Route} from 'react-router-dom';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      zIndex:100,
      backgroundColor:theme.palette.error.main,
    },
    menuButton: {
      marginRight: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title:{
      marginLeft:-14,
      color:blue['900'],
      backgroundColor:'white',
      paddingLeft:10,
      paddingRight:10,
      fontSize:22,
    },
    wrapper:{
      display:'flex',
      flexGrow:1, 
      [theme.breakpoints.down('xs')]: {
        justifyContent:'center'
      },
    }
  }));

export default function Topnav({handleDrawerToggle,Title}){
    const classes = useStyles();
    return( 
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.wrapper}>
              <Typography variant="h2" className={classes.title}>
                {Title}
              </Typography>
            </div>
              <Route exact path='/typingpractise' component={Typing}/>
              <Route exact path='/' component={Home}/>
            
          </Toolbar>
        </AppBar>
    )
}
const Home=()=>{
  return(
    <h1>home</h1>
  )
}

const Typing=()=>{
  return(
    <h1>typing</h1>
  )
}