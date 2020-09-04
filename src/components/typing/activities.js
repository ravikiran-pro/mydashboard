import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function Activities({Value}){
    return(
        <Paper style={{width:100,backgroundColor:'blue'}}>
            <Typography variant="h3" style={{color:'blue',fontSize:26,textAlign:'center'}}>{Value}</Typography>        
        </Paper>
    )
}