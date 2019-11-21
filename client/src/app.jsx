import React from 'react'
import axios from 'axios'
import Member from './member/member.jsx'
import Memberpage from './memberpage/memberpage.jsx'
import {API_KEY} from '../../config.js'
import './app.css'

const states = [
"State",
"None",
"AK", 
"AL", 
"AR", 
"AZ", 
"CA", 
"CO", 
"CT", 
"DE", 
"FL", 
"GA", 
"HI", 
"IA", 
"ID", 
"IL", 
"IN", 
"KS", 
"KY", 
"LA", 
"MA", 
"MD", 
"ME", 
"MI", 
"MN", 
"MO", 
"MS", 
"MT", 
"NC", 
"ND", 
"NE", 
"NH", 
"NJ", 
"NM", 
"NV", 
"NY", 
"OH", 
"OK", 
"OR", 
"PA", 
"RI", 
"SC", 
"SD", 
"TN", 
"TX", 
"UT", 
"VA", 
"VT", 
"WA", 
"WI", 
"WV", 
"WY"
]

class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            state: '',
            list: []
        }
        this.handleState = this.handleState.bind(this)
        this.handleNameClick = this.handleNameClick.bind(this)
        this.handleHome = this.handleHome.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
    }

    handleNameClick(id){
            this.setState({
                id
            })
    }

    handleState(e){
        if((e.target.value === "State") || (e.target.value === 'None')){
            this.handleTitle()
        } else {
            var state = e.target.value
            axios({
                url: `https://api.propublica.org/congress/v1/members/${this.state.title}/${state}/current.json`,
                headers: {'X-API-Key': API_KEY}
            })
            .then((res) => {
                this.setState({
                    list: res.data.results,
                    state
                })
            })   
        }
    }

    handleHome(){
        this.setState({
            list: []
        })
    }

    handleTitle(e){
        console.log(e.target.value)
        if(!e){
            var title= this.state.title
        } else {
            var title = e.target.value 
        }
        axios({
            url: `https://api.propublica.org/congress/v1/116/${title}/members.json`,
            headers: {'X-API-Key': API_KEY}
        })
        .then((res) => {
            console.log(res.data)
            this.setState({
                title,
                list: res.data.results[0].members
            })
        })
    }

    render(){
        if(this.state.id){
            return (
                <div>
                    <button onClick={() => this.setState({id: null})}>Back</button>
                    <Memberpage id={this.state.id}/>
                </div>
            )
        } else if(this.state.list[0]) {
            return (
                <>
                    <div className='buttons'>
                        <button onClick={this.handleHome}>Home</button>
                        <select onClick={this.handleTitle}>
                            <option>{this.state.title}</option>
                            <option value='house'>House</option>
                            <option value='senate'>Senate</option>}
                        </select>
                        <select onClick={this.handleState}>
                            {states.map((state) => {
                                return (
                                    <option value={state}>{state}</option>
                                )
                            })}
                        </select>
                    </div>
                        <div className="title-container">
                            <div className='label'>
                                Name
                            </div>
                            <div className='label'>
                                State
                            </div>
                            <div className='label'>
                                Title
                            </div>
                            <div className='label'>
                                Year of Re-Election
                            </div>
                        </div>
                        <div className='member-list'>
                            {this.state.list.map((member) => {
                            return (
                           
                                <Member member={member} state={this.state.state} handleNameClick={this.handleNameClick} />
                            )
                        })}
                        </div>
                </>
                )   
        } else {
            return (

                <>
            <select onChange={this.handleTitle}>
                    <option value="default">Choose a Department</option>
                    <option value="senate">Senate</option>
                    <option value='house'>House</option>
            </select>
            </>
            )
        }
    }
}


export default App