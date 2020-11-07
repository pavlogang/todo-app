import React, {Component} from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  render() {
    
    let classNamesActive = "btn btn-info";
    let classNamesDisable = "btn btn-outline-secondary";
    
    return (
    <div className="btn-group">
      <button type="button"
              className={classNamesActive}>All</button>
      <button type="button"
              className={classNamesDisable}>Active</button>
      <button type="button"
              className={classNamesDisable}
              onClick={this.props.onDoneStatus}
              >Done</button>
    </div>
  );
  }
}
