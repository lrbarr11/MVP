import React from 'react'
import Modal from './Modal.jsx'

class Committee extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({
            open: !this.state.open
        })
    }
    
 
    render(){
        return (
        <>
            <div style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', paddingBottom: '5px'}} onClick={() => this.handleClick()}>
                {this.props.com.name}
            </div>
            {(this.state.open) ? <Modal subs={this.props.roles.subcommittees} comId={this.props.com.code} handleClick={this.handleClick}/> : <div/>}
        </>
        )}
}

export default Committee