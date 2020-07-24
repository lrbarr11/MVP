/* eslint no-console: ["error", { allow: ["error"]}] */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Committee from '../committee/committee';
import './memberpage.css';

class Memberpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member: [],
      votes: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    function memberInfo() {
      return axios({
        url: `https://api.propublica.org/congress/v1/members/${id}.json`,
        headers: { 'X-API-Key': process.env.API_KEY },
      });
    }

    function voteInfo() {
      return axios({
        url: `https://api.propublica.org/congress/v1/members/${id}/votes.json`,
        headers: { 'X-API-Key': process.env.API_KEY },
      });
    }

    axios.all([memberInfo(), voteInfo()])
      .then(axios.spread((mInfo, vInfo) => {
        this.setState({
          member: mInfo.data.results[0],
          votes: vInfo.data.results[0].votes,
        });
      }))
      .catch((err) => {
        console.error('error in memberpage: ', err);
      });
  }

  render() {
    const { member, votes } = this.state;
    if (member.roles) {
      return (
        <div className="memberpage-container">
          <div className="name">
            {member.last_name}
            ,
            {member.first_name}
          </div>
          <div>
            Party:
            {' '}
            {(member.current_party === 'R') ? 'Republican' : 'Democrat'}
          </div>
          <div className="committees-container">
            <div style={{ fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px' }}>Committees:</div>
            {member.roles[0].committees.map((committee) => (
              <Committee
                key={committee.code}
                roles={member.roles[0]}
                com={committee}
              />
            ))}
          </div>
          <div className="vote-container">
            <div className="vote-title">
              <div style={{ width: '70%' }}>Description</div>
              <div style={{ width: '10%' }}>Vote</div>
              <div style={{ width: '20%' }}>Outcome</div>
            </div>
            {votes.map((vote) => (
              <div key={vote.roll_call} className="vote-details-container">
                <div style={{ width: '70%' }}>{vote.description}</div>
                <div style={{ width: '10%' }}>{vote.position}</div>
                <div style={{ width: '20%' }}>{vote.result}</div>
              </div>
            ))}
          </div>
          <div className="contact-container">
            {(member.roles[0].contact_form)
              ? <a href={member.roles[0].contact_form}>Email</a> : <></>}
            <a href={member.url}>
              Website
            </a>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

Memberpage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Memberpage;
