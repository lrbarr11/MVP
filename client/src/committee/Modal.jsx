import React from 'react'
import './Modal.css'

const Modal = function(props){
    var count = 0
    return(
        <div className='modal'>
            <div className='modal-content'>
                <div className='close' onClick={props.handleClick}>x</div>
                <div className='modal-subcommittees'>
                    <div style={{fontWeight: 'bold'}}>Subcommittees:</div>
                    {props.subs.map((sub) => {
                        if(sub.parent_committee_id === props.comId){
                            count++
                            return (
                                <div>
                                    {sub.name}
                                </div>
                            )
                        }
                    })}
                </div>
                {(count) ? <></> : <div style={{display: 'flex', alignItems: 'center'}}>No Subcommittees</div>}
            </div>
        </div>
    )
}

export default Modal