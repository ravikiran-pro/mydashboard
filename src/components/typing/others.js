import React from 'react';
import Activities from './activities';

export default function Others({Speed,Accuracy}){
    return(
        <>
            <Activities Value={Speed}/>
            <Activities Value={Accuracy}/>
        </>
    )
}