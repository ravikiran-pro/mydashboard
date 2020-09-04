import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'


const styles = makeStyles((theme,props)=>({
    root:{
        position:'absolute',
        height:'50vh',
        left:0,
        right:0,
    },
    alertBox:{
        height:'100%',
    },
    alert:{
        display:'flex',
        flexDirection:'column',
        marginLeft:210,
        [theme.breakpoints.down('xs')]:{
            marginLeft:'0',
            minWidth:'100vw',
        },
        borderRadius:10,
        padding:10,
        width:'60%',
        backgroundColor:(props) => 
                       props.Status ? theme.palette.success.dark : theme.palette.error.dark,

        color:theme.palette.primary.contrastText,
        border:`solid 1px ${theme.palette.primary.light}`,
        zIndex:1000
    }
}))

export default function ScoreCard(props){
    const classes = styles(props);
    const space = '   ';
    return(
        <div className={classes.root}>
           <Box display="flex" justifyContent="center" alignItems="center" className={classes.alertBox}>
                <Paper className={classes.alert} elevation={10}>
                   <Box display="flex" justifyContent="flex-end">
                       <IconButton
                        onClick={props.handleScorecard}
                       >
                       <HighlightOffIcon style={{color:'white'}}></HighlightOffIcon>
                       </IconButton>
                   </Box>
                   <Box display="flex" justifyContent="center">
                       <Typography component="h2" variant="h4">
                            {(props.Status)? " Hooray!  You Completed" : "Oops! Time's up"}
                        </Typography>
                   </Box>
                   <Box display="flex" justifyContent="space-around" pt={4} pb={4}>
                       <Typography component="h2" variant="h6">
                             Score:{`${space} ${props.typingSpeed}`}
                        </Typography>
                        <Typography component="h2" variant="h6">
                             Accuracy:{`${space} ${props.typingAccuracy}`}
                        </Typography>
                   </Box>
                   <Box display="flex" justifyContent="center" pb={2}>
                       <Box pr={2}>
                        <Button 
                            variant="outlined" 
                            color={(props.Status)? "secondary" : "primary"}
                            onClick={() => props.handleScorecard(true)}
                        >
                             <Typography variant="h2">
                                     Submit
                             </Typography>
                        </Button>
                       </Box>
                       <Box pl={2}>
                       <Button 
                            variant="outlined" 
                            color={(props.Status)? "secondary" : "primary"}
                            onClick={props.handleScorecard}
                        >
                             <Typography variant="h2">
                                     Cancel
                             </Typography>
                        </Button>
                       </Box>
                   </Box>
                </Paper>
           </Box>
        </div>
    )
}