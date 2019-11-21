import React from 'react'
import './member.css'
import axios from 'axios'

const Member =  (props) => {
    return(
        <>
        <div className='member-container' onClick={() => {
            props.handleNameClick(props.member.id)
        }}>
            <div className='member name'> {props.member.last_name}, {props.member.first_name} </div>
            <div className='member state'> {props.member.state || props.state} </div>
            <div className='member title'>{props.member.title || props.member.role} </div>
            <div className='member term'> {props.member.next_election}</div>
        </div>
            <div className='bar'/>
        </>
    )
}


export default Member