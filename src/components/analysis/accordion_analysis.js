import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children, isOpen, toggleAccordion }) => {
  return (
    <div className="accordion">
      <div className="accordion-title" onClick={toggleAccordion}>
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
  isOpen: PropTypes.bool,
  toggleAccordion: PropTypes.func
};

export default Accordion;