import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    return (
      <React.Fragment>
        <span><a href="https://www.nineleaps.com/">Ritual Tracker</a> @ Nineleaps Technologies Pvt. Ltd. </span>
        <span className="ml-auto">Powered by <a href="https://www.nineleaps.com/">Nineleaps Technologies Pvt. Ltd.</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
