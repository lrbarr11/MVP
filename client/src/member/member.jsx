import React from 'react';
import PropTypes from 'prop-types';

import './member.css';

const Member = ({ member, state, handleNameClick }) => (
  <>
    <div
      className="member-container"
      onClick={() => {
        handleNameClick(member.id);
      }}
      onKeyDown={() => {
        handleNameClick(member.id);
      }}
      role="button"
      tabIndex="-1"
    >
      <div className="member name">
        {' '}
        {member.last_name}
        ,
        {' '}
        {member.first_name}
        {' '}
      </div>
      <div className="member state">
        {' '}
        {member.state || state}
        {' '}
      </div>
      <div className="member title">
        {member.title || member.role}
        {' '}
      </div>
      <div className="member term">
        {' '}
        {member.next_election}
      </div>
    </div>
    <div className="bar" />
  </>
);

Member.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string,
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    state: PropTypes.string,
    title: PropTypes.string,
    role: PropTypes.string,
    next_election: PropTypes.string,
  }),
  state: PropTypes.string,
  handleNameClick: PropTypes.func.isRequired,
};

Member.defaultProps = {
  member: null,
  state: '',
};

export default Member;
