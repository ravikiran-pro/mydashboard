import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {TypingBox,Timer,ScoreCard,Others} from '../components/typing'
import { Typography} from '@material-ui/core';

const Styles = {
            container:{
                padding:'20px',
                border:'solid 1px blue',
                borderRadius:20,
                marginTop:30,
            }
        }

class Typing extends React.Component{
    constructor(){
        super();
        this.state={
            Speed:0,
            Accuracy:'100%',
            GameTime:4, 
            GameStatus:null,
            IsActiveScoreCard:false,
            Result:false,
            
        }
    }
    handleGameResult=(win)=>{
        if(win)     this.setState({IsActiveScoreCard:true,Result:true});
        else        this.setState({IsActiveScoreCard:true});
    }
    handleScorecard=(update)=>{
        if(update===true){
            ///update score to backend
            alert('dd')
        }
        this.setState({IsActiveScoreCard:false});
     } 
    handleSpeed=(speed)=>{
        this.setState({Speed:speed})
    }
    handleAccuracy=(accuracy)=>{
        this.setState({Accuracy:accuracy}); 
    }
    focusInputBox(){
        document.getElementById('easy').focus()
    }
    handleReset=()=>{
        this.setState({
            GameStatus:false,
            Speed:0,
            Accuracy:'100%',
            Result:false,
        })       
    }
    handleStart=()=>{
        this.focusInputBox();
        this.setState({GameStatus:true})
    }
    GameStart=()=>{
        return(
                <React.Fragment>
                    <Paper elevation={0} style={{backgroundColor:"inherit",display:'flex',justifyContent:'space-between',margin:10}}>
                        <Header/>
                    </Paper>
                    <Paper elevation={0} style={{backgroundColor:"inherit",display:'flex',justifyContent:'space-between',margin:10}}>
                        <Timer 
                               GameTime={this.state.GameTime}
                               GameStatus={this.state.GameStatus}
                               handleGameResult={this.handleGameResult}
                            />
                        <Others 
                                Speed={this.state.Speed} 
                                Accuracy={this.state.Accuracy}
                            />
                    </Paper>
                </React.Fragment>
        )
    }
    render(){
        const {classes}=this.props;
        return(
            <React.Fragment>
            <div className={classes.root}>
             <Box className={classes.container}>
                 {(this.state.GameStatus)? this.GameStart() :null}
                
                {(this.state.IsActiveScoreCard)?
                        <ScoreCard
                        Status={this.state.Result}
                        typingSpeed={this.state.Speed}
                        typingAccuracy={this.state.Accuracy}
                        handleScorecard= {this.handleScorecard}
                    />
                        :
                        null
                }

                <TypingBox                    
                    handleAccuracy={this.handleAccuracy}
                    GameStatus={this.state.GameStatus}
                    ChangeGameStatus={this.ChangeGameStatus}
                    handleStart={this.handleStart}
                    handleSpeed={this.handleSpeed}
                    handleReset={this.handleReset}
                    handleGameResult={this.handleGameResult}
                />
             </Box>
             </div>
            </React.Fragment>
        )
    }
}
export default withStyles(Styles,{withTheme:true})(Typing);


const Header=()=>{
    return(
        <React.Fragment>
        {
            ['Timer','Speed','Accuracy'].map((item,index) =>(
                <React.Fragment key={index}>
                    <Box style={{width:100}}>
                        <Typography variant="subtitle1" style={{color:'white',textAlign:'center',fontSize:20}}>{item}</Typography>        
                    </Box>  
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}
