import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

class Committee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let { open } = this.state;
    open = !open;
    this.setState({
      open,
    });
  }

  render() {
    const { com, roles } = this.props;
    const { open } = this.state;
    return (
      <>
        <div
          style={{
            cursor: 'pointer', display: 'flex', justifyContent: 'center', paddingBottom: '5px',
          }}
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
          role="button"
          tabIndex="-1"
        >
          {com.name}
        </div>
        {open ? (
          <Modal
            subs={roles.subcommittees}
            comId={com.code}
            handleClick={this.handleClick}
          />
        ) : <div /> }
      </>
    );
  }
}

Committee.propTypes = {
  com: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  }),
  roles: PropTypes.shape({
    subcommittees: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      parent_committee_id: PropTypes.string,
    })),
  }),
};

Committee.defaultProps = {
  com: null,
  roles: null,
};

export default Committee;
