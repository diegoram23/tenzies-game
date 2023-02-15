import React from 'react'

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "#ffffff"
    }
    return (
        
        <div>
            <h2 style={styles}  className='die--face'>{props.value}</h2>
        </div>
    )
}