import React from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Topnav from './topnav';
import {NavLink} from 'react-router-dom';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex:100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    minWidth: drawerWidth,
    backgroundColor:theme.palette.error.main,
    color:theme.palette.primary.contrastText,
    border:'solid 1px white',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const Links=[['Home','/'],['Typing Practise','/typingpractise']];
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* Drawer contents*/
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {Links.map((Navmenu, index) => (
          <ListItem 
            button 
            component={NavLink}
            to={Navmenu[1]}
            key={index+70}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            >
            <ListItemText 
               key={index+102} primary={<Typography variant="h2">{Navmenu[0]}</Typography>}
              />
          </ListItem>
        ))}
      </List>
    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <>
      <CssBaseline />
      <Topnav handleDrawerToggle={handleDrawerToggle} Title={Links[selectedIndex][0]}/>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}


export default Sidebar;
