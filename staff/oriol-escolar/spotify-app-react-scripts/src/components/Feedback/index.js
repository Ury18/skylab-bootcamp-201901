import React from 'react'


function Feedback({message,level}){

    return <section className={`feedback ${level?`feedback--${level}`:''}`}>
    <p>{message}</p>
    </section>
}

export default Feedback