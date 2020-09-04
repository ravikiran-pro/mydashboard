import React,{useState,useEffect} from 'react';
import Activities from './activities';

export default function Timer({GameTime,GameStatus,handleGameResult}){
    const [seconds,timerRun] = useState(GameTime);
    const [isActive,setIsActive] = useState(true);
    const [CountDown,setCountDown] = useState()
    
    useEffect(()=>{
        let interval=null;
        if(isActive){
            interval=setInterval(() => {
                timerRun(seconds => seconds - 1);
              }, 1000);
        }else if(!isActive && seconds !==5){
            clearInterval(interval);
        }
        var timer=returnFormattedToSeconds(seconds);

        setCountDown(timer);
        if(timer==="0:00"){
            setIsActive(!isActive);
            handleGameResult();
        }

        function returnFormattedToSeconds(time){
            var minutes = Math.floor(time / 60),
                seconds = Math.round(time - minutes * 60);
        
            seconds = seconds < 10 ? '0' + seconds : seconds;
        
            return minutes + ":" + seconds;
        }

        return () => clearInterval(interval);
    },[seconds])

    return(
    <>
        <Activities Value={CountDown}/>
    </>
    )
}

