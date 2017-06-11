import React, { Component } from 'react';
class Month extends Component {
  render() {
    return (
      <div className="months">
        <div>{this.props.months[this.props.whichMonth]} {this.props.whichYear}</div>
      </div> 
    );
  }
}
export default Month;
