import React from 'react'
import axios from 'axios'
import Committee from '../committee/committee.jsx'
import {API_KEY} from '../../../config.js'
import './memberpage.css'
class Memberpage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id: this.props.id,
            member: [],
            vote: []
        }
    }
    
    
    componentDidMount(){
        const id = this.props.id
        function memberInfo(){
        return axios({
            url: `https://api.propublica.org/congress/v1/members/${id}.json`,
            headers: {'X-API-Key': API_KEY}
            })
        }
            
        function voteInfo(){
           return axios({
            url: `https://api.propublica.org/congress/v1/members/${id}/votes.json`,
            headers: {'X-API-Key': API_KEY}
            })
        }

        axios.all([memberInfo(), voteInfo()])
        .then(axios.spread((mInfo, vInfo) => {
            console.log(vInfo)
            console.log(mInfo)
            this.setState({
                member: mInfo.data.results[0],
                votes: vInfo.data.results[0].votes
            })
        }))
        .catch((err) => {
            console.log('error in memberpage: ', err)
        })
    }



    render(){
        if(this.state.member.roles){
            return (
                <div className="memberpage-container">
                    <div className='name'>
                        {this.state.member.last_name}, {this.state.member.first_name}
                    </div>
                    <div>
                        Party: {(this.state.member.current_party === 'R')? "Republican": "Democrat"}
                    </div>
                    <div className='committees-container'>
                        <div style={{fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px'}}>Committees:</div>
                        {this.state.member.roles[0].committees.map((committee) => {
                            return <Committee roles={this.state.member.roles[0]} com={committee}/>
                        })}
                    </div>
                    <div className="vote-container">
                        <div className='vote-title'>
                            <div style={{width: '70%'}}>Description</div>
                            <div style={{width: '10%'}}>Vote</div>
                            <div style={{width: '20%'}}>Outcome</div>
                        </div>
                    {this.state.votes.map((vote) => {
                        return (
                            <>
                            <div className='vote-details-container'>
                                <div style={{width: '70%'}}>{vote.description}</div>
                                <div style={{width: '10%'}}>{vote.position}</div>
                                <div style={{width: '20%'}}>{vote.result}</div>
                            </div>
                            </>
                        )
                    })}
                    </div>
                    <div className='contact-container'>
                        {(this.state.member.roles[0].contact_form) ? <a href={this.state.member.roles[0].contact_form}>Email</a> : <></>}
                        <a href={this.state.member.url}>
                            Website
                        </a >
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }

}

export default Memberpage