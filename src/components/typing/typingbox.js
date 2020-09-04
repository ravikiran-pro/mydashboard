import React from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import API from '../../utils';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const classes={
            unused:{
                color:'#363738',
            },
            current:{
                color:'white',
                backgroundColor:'black',
            },
            correct:{
                color:'green',
            },
            wrong:{
                color:'pink',
                backgroundColor: 'red'  
            },
            contentEditable:{
                border:'solid 2px white',
                wordSpacing:2,
                height:'50vh',
                fontSize:26,
                backgroundColor:'white',
                opacity:0.6,
                fontFamily:"'Balsamiq Sans', cursive",
                fontWeight:'600',
                padding: 20,
                overflow:'auto',
                "&:focus":{
                    outline:'none'
                }
            },
        }
const Styles={
    start:{
        marginTop:15,
        width:150,
        height:50,
        border:'solid 0.1px blue'
    }
}
class TypingBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'welcome to typing test',
            array:[],
            index:0,
            wordCount:0,
            lettersCount:0,
            Id:null
        }
    }

    componentDidMount(e){
        const URL=(e!==1)? API.ENDPOINT+"typing" : API.ENDPOINT+"typing?id="+this.state.Id;
        fetch(URL)
        .then((response) => response.json())
            .then((data) =>  {
                this.setState({
                    index:0,
                    wordCount:0,
                    lettersCount:0,
                    Id:data.id,
                    value:data.content,
                });
                this.Eval();
        })
    }
    ///calc speed
    $SpeedCount=()=>{
        this.props.handleSpeed(parseInt(this.state.lettersCount/this.state.wordCount))
    }
    ///calc Accuracy
    $Accuracy=()=>{
        var accuracy=parseInt((this.state.lettersCount/this.state.index)*100)
        if(accuracy>=0 && accuracy <=100){
            this.props.handleAccuracy(accuracy+"%")
        }
        else{
            this.props.handleAccuracy(0+"%")
        }
    }
    ///handle Highlight for user key press
    handlechange=(event)=>{
        if(this.props.GameStatus){
                var arr;
                if(event.key==='backspace'){
                    arr=this.state.array;
                    arr[this.state.index]=<span style={classes.unused}>{this.state.value[this.state.index]}</span>
                    arr[this.state.index-1]=<span style={classes.unused}>{this.state.value[this.state.index-1]}</span>
                    arr[this.state.index-1]=<span style={classes.current}>{this.state.value[this.state.index-1]}</span>
                    var index=this.state.index-1;
                    this.setState({index:index,array:arr,lettersCount:this.state.lettersCount-1});
                }
                else if(event.key === this.state.array[this.state.index].props.children){
                    arr=this.state.array;
                    arr[this.state.index]=<span style={classes.correct}>{event.key}</span>
                    arr[this.state.index+1]=<span style={classes.current}>{this.state.value[this.state.index+1]}</span>
                    this.setState({index:this.state.index+1,array:arr,lettersCount:this.state.lettersCount+1});
                }
                else{
                    arr=this.state.array;
                    arr[this.state.index+1]=<span style={classes.current}>{this.state.value[this.state.index+1]}</span>
                    arr[this.state.index]=<span style={classes.wrong}>{this.state.value[this.state.index]}</span>
                    this.setState({index:this.state.index+1,array:arr});
                }
                this.$SpeedCount();
                this.$Accuracy();
                if(this.state.index===this.state.value.length-2){this.props.handleGameResult(true)}
        }
    }
    handlemovement=(event)=>{
        if((event.keyCode===8 || event.keyCode===46) && this.state.index!==0){
            event={key:'backspace'}
            this.handlechange(event)
        }
        else if(event.keyCode === 32){
           event.preventDefault();
           this.handlechange({'key':' '})
        }
    }
    //onMount fetch api content ,,, calc speed and ready to render
    Eval(){
        var arr=[],wordcount=0;
        var value=this.state.value;
        arr.push(<span key={9909} style={classes.current}>{value[0]}</span>);
        for(var i=1;i<value.length;i++){
            arr.push(<span key={i} style={classes.unused}>{value[i]}</span>);
            if(value[i]===' '){
                wordcount++;
            }
        }
        this.setState({array:arr,wordCount:parseInt(value.length/wordcount)});
    }
     Reset=()=>{
        this.props.handleReset();
        this.componentDidMount(1);
     }

     Reload=()=>{
        this.props.handleReset();
        this.componentDidMount();
     }

    render(){
        const {classes}=this.props;
        return(
            <>
                <Paper  
                        ref={this.myRef}
                        id="easy"
                        className={classes.contentEditable} 
                        tabIndex="0" 
                        elevation={4}
                        onKeyPress={this.handlechange} 
                        onKeyDown={this.handlemovement}
                        >                    
                        {this.state.array}
                </Paper>
                <Controller 
                        Start={this.props.handleStart} 
                        Reload={this.Reload}
                        Reset={this.Reset}
                        Status={this.props.GameStatus}
                        Change={this.Change}
                        />
            </>
        )
    }
}


export default withStyles(classes)(TypingBox);

const Controller=(props)=>{
    const classes = makeStyles(()=>(Styles))();

    return(
        <Box display="flex" justifyContent="space-around">
                    <Button 
                        onClick={(props.Status)? props.Reload : props.Start}
                        className={classes.start} variant="contained" color="secondary">
                        <Typography variant="h2">
                            {(props.Status)? 'Reload' : 'Start'}
                        </Typography>
                    </Button>
                    <Button 
                        onClick={(props.Status)? props.Reset : props.Reload}
                        className={classes.start} 
                        variant="contained" 
                        color="secondary">
                        <Typography variant="h2">
                            {(props.Status)? 'Reset' : 'Change'}
                        </Typography>
                    </Button>
        </Box>
    )
}
