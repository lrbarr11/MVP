import React from 'react';
import axios from 'axios';
import Member from './member/member';
import Memberpage from './memberpage/memberpage';
import { STATES } from './helpers/data';
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: '',
      list: [],
      id: '',
      chamber: '',
    };
    this.handleState = this.handleState.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleChamber = this.handleChamber.bind(this);
  }

  handleNameClick(id) {
    this.setState({
      id,
    });
  }

  handleState(e) {
    if ((e.target.value === 'State') || (e.target.value === 'None')) {
      this.handleChamber();
    } else {
      const state = e.target.value;
      const { chamber } = this.state;
      axios({
        url: `https://api.propublica.org/congress/v1/members/${chamber.toLowerCase()}/${state}/current.json`,
        headers: { 'X-API-Key': process.env.API_KEY },
      })
        .then((res) => {
          this.setState({
            list: res.data.results,
            state,
          });
        });
    }
  }

  handleHome() {
    this.setState({
      list: [],
    });
  }

  handleChamber(e) {
    let { chamber } = this.state;
    if (e) {
      chamber = e.target.value;
    }
    axios({
      url: `https://api.propublica.org/congress/v1/116/${chamber.toLowerCase()}/members.json`,
      headers: { 'X-API-Key': process.env.API_KEY },
    })
      .then((res) => {
        this.setState({
          chamber,
          list: res.data.results[0].members,
        });
      });
  }

  render() {
    const {
      id,
      list,
      chamber,
      state,
    } = this.state;
    if (id) {
      return (
        <div>
          <button type="button" onClick={() => this.setState({ id: null })}>Back</button>
          <Memberpage id={id} />
        </div>
      );
    } if (list[0]) {
      return (
        <>
          <div className="buttons">
            <button type="button" onClick={this.handleHome}>Home</button>
            <select onClick={this.handleChamber}>
              <option>{chamber}</option>
              <option value="House">House</option>
              <option value="Senate">Senate</option>
            </select>
            <select onClick={this.handleState}>
              {STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div className="title-container">
            <div className="label">
              Name
            </div>
            <div className="label">
              State
            </div>
            <div className="label">
              Title
            </div>
            <div className="label">
              Year of Re-Election
            </div>
          </div>
          <div className="member-list">
            {list.map((member) => (
              <Member
                key={member.id}
                member={member}
                state={state}
                handleNameClick={this.handleNameClick}
              />
            ))}
          </div>
        </>
      );
    }
    return (
      <select onChange={this.handleChamber}>
        <option value="Default">Choose a Chamber</option>
        <option value="Senate">Senate</option>
        <option value="House">House</option>
      </select>
    );
  }
}

export default App;
