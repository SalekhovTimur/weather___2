import React, { useState } from 'react';
import classes from './Condition.module.css';



const Conditions = (props) => {
    return (
        <>
            <div className={classes.Wrapper}>
                {props.error && <small className={classes.Small}>Please enter a valid city.</small>}
                {props.loading && <div className={classes.Loader}></div>}
                {props.responseObj.cod === 200 ?
                    <div>
                        <p><strong>{props.responseObj.name}</strong></p>
                        <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description} and feels like {Math.round(props.responseObj.main.feels_like)}.</p>
                        
                    </div>
                : null
                
                }
                
            </div>
        </>
    )
 }
 export default Conditions;