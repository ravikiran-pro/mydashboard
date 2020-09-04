import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from "clsx";


const displayTime="4000ms";
const Width='1.5vw';
const Height='4vh';

const styles = makeStyles((theme)=>({
  animatedItem: {
    animation: `$myEffect ${displayTime} ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateX(-200%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateX(200%)"
    },
  },
  root:{
    display:'flex',
    height:'100vh',
    zIndex:200,
    overflow:'hidden',
    justifyContent:'center'
  },
  container:{
    height:'100%',
    margin:6,
  },
  widgetBox:{
    width:Width,
    height:Height,
    display:'inline-block',
    backgroundColor:theme.loader
  },
  widgetEmpty:{
    width:Width,
    height:Height,
    display:'inline-block',
    backgroundColor:'inherit'
  },
  widgetTopRightCurve:{
    width:Width,
    height:Height,    
    borderTopRightRadius:'100%',
    display:'inline-block',
    backgroundColor:theme.loader
  },
  widgetBottomRightCurve:{
    width:Width,
    height:Height,
    borderBottomRightRadius:'100%',
    display:'inline-block',
    backgroundColor:theme.loader
  },
  widgetTopLeftCurve:{
    width:Width,
    height:Height,
    borderTopLeftRadius:'100%',
    display:'inline-block',
    backgroundColor:theme.loader
  }
}))

const LetterMap=[
            [
              ['-','-','-',')'],
              ['-',' ',' ','-'],
              ['-',' ',' ','-'],
              ['-',' ',' ','-'], 
              ['-','-','-',']'],
            ],
            [
              ['(','-','-',')'],
              ['-',' ',' ','-'],
              ['-','-','-','-'],
              ['-',' ',' ','-'], 
              ['-',' ',' ','-'],
            ],
            [
              ['(','-','-','-'],
              ['-',' ',' ',' '],
              ['-','-','-',')'],
              [' ',' ',' ','-'], 
              ['-','-','-','-'],
            ],

            [
              ['-',' ',' ','-'],
              ['-',' ',' ','-'],
              ['-','-','-','-'],
              ['-',' ',' ','-'], 
              ['-',' ',' ','-'],
            ],
            [
              ['-','-','-',')'],
              ['-',' ',' ','-'],
              ['-','-','-','-'],
              ['-',' ',' ','-'], 
              ['-','-','-',']'],
            ],
            [
              ['-','-','-','-'],
              ['-',' ',' ','-'],
              ['-',' ',' ','-'],
              ['-',' ',' ','-'], 
              ['-','-','-','-'],
            ],
            [
              ['(','-','-',')'],
              ['-',' ',' ','-'],
              ['-','-','-','-'],
              ['-',' ',' ','-'], 
              ['-',' ',' ','-'],
            ],
            [
              ['-','-','-',')'],
              ['-',' ',' ','-'],
              ['-','-','-','-'],
              ['-',' ',' ','-'], 
              ['-',' ',' ','-'],
            ],
            [
              ['-','-','-',')'],
              ['-',' ',' ','-'],
              ['-',' ',' ','-'],
              ['-',' ',' ','-'], 
              ['-','-','-',']'],
            ],
          ];


function currentStyle(k){
      const style=styles();
      if(k===' ')      return style.widgetEmpty;
      else if(k===')') return style.widgetTopRightCurve;
      else if(k===']') return style.widgetBottomRightCurve;
      else if(k==='(') return style.widgetTopLeftCurve;
      else             return style.widgetBox;
}

export default function Loader(props){
  const style=styles();

  setTimeout(() => {
      props.handleloader();
  }, parseInt(displayTime)+500);

  return(
    <Container fixed maxwidth="sm" className={style.root} >
      {
        LetterMap.map(block=>{
          return(
            <Box className={style.container} display="flex" flexDirection="column"  justifyContent="center" alignItems="center">
                  {
                    block.map(letter=>{
                      return(
                        <div className>
                            {
                                letter.map(pos =>{
                                  return(
                                      <div 
                                          className={clsx(currentStyle(pos),style.animatedItem)}>
                                           &nbsp;
                                         </div>
                                         )
                                }
                                )}
                        </div>
                      )
                    })
                  }        
            </Box>
          )
        })
      }
      </Container>
  )
}