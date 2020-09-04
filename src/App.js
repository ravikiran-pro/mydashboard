import React from 'react';
import Loader from './AppComponents/loader';
import theme from './AppComponents/theme';
import { withStyles, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {BrowserRouter,Route,} from "react-router-dom";
import Sidebar from './components/sidebar'
import {Home,Typing} from './Screens';

const styles ={
  loader: { 
    backgroundColor: theme.palette.primary.dark,
    color:theme.palette.primary.contrastText,
    height:'100vh',
    overflow:'hidden'
  },
  root:{
    display:'flex',
  },
}

class App extends React.Component{
  state={
    loader:false,
  }
  handleloader=()=>{
    this.setState({loader:false})
  }
  render(){
    const {classes} =this.props;
    return(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container maxWidth="xl" className={classes.root} disableGutters>
             {(this.state.loader)?
                  <Loader handleloader={this.handleloader}/> 
                    : 
                  <Screen/>}
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}
export default withStyles(styles,{ withTheme:true })(App);

const style=makeStyles(()=>({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight:'100vh',
    padding: theme.spacing(1),
    backgroundColor:theme.palette.primary.dark,
    color:theme.palette.primary.contrastText,
  },
}))

const Screen=()=>{
  const classes=style();
  return(
    <>
    <Sidebar/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
              <Route exact path='/' component={Home}/>
              <Route exact path="/typingpractise" component={Typing}/>
      </main>
    </>
  )
}
