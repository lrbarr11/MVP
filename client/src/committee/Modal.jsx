import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = ({ subs, comId, handleClick }) => {
  let count = 0;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close" role="button" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>x</div>
        <div className="modal-subcommittees">
          <div style={{ fontWeight: 'bold' }}>Subcommittees:</div>
          {subs.map((sub) => {
            if (sub.parent_committee_id === comId) {
              count += 1;
              return (
                <div key={sub.code}>
                  {sub.name}
                </div>
              );
            }
            return null;
          })}
        </div>
        {(count) ? <></> : <div style={{ display: 'flex', alignItems: 'center' }}>No Subcommittees</div>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  subs: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    parent_committee_id: PropTypes.string,
  })).isRequired,
  comId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Modal;
