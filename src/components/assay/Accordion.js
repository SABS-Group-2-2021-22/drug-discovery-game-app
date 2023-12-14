import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="accordion">
      <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className={`accordion-arrow ${isOpen ? 'open' : 'closed'}`}></span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
