import React from 'react'
import './Options.css'

function Options({Icon , title , underline}) {
    return (
        underline?
        <div className="options options__underline">
            <Icon className="options__icons"/>
            <p>{title}</p>
        </div>
        :
        <div className="options">
            <Icon className="options__icons"/>
            <p>{title}</p>
        </div>
    )
}

export default Options
