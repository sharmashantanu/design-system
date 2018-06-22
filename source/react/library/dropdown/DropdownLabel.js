import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  /** Text to render in place of a current label */
  placeholder: PropTypes.string,
  /** Human readable identifier for the current selected option */
  label: PropTypes.string,
  select: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
};

const defaultProps = {
  placeholder: '',
  label: '',
  select: false,
  disabled: false,
  error: '',
  tabIndex: 0,
  onClick: () => {},
};

/**
 * `DropdownLabel` allows users to open `Dropdown`s, and displays either a prompt or the currently
 * selected `Dropdown` item.
 */

class DropdownLabel extends React.Component {
  render() {
    let label = this.props.label;

    if (this.props.placeholder && !label) {
      label = this.props.placeholder;
    } else if (!label) {
      label = 'Select One';
    }

    const className = classnames('rc-dropdown-toggle', {
      'rc-dropdown-toggle-select': this.props.select,
      'rc-dropdown-toggle-error': this.props.error,
    });

    return (
      <a
        role="button"
        tabIndex={ this.props.tabIndex }
        disabled={ this.props.disabled }
        onClick={ this.props.onClick }
        className={ className }
      >
        <span className="rc-dropdown-label">
          <span className="rc-dropdown-label-text">{ label }</span> <Icon width="8px" height="8px" type="chevron-down" />
        </span>
      </a>
    );
  }
}

DropdownLabel.propTypes = propTypes;
DropdownLabel.defaultProps = defaultProps;

export default DropdownLabel;
