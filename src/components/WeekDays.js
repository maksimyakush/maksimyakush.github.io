import React, { Component } from 'react';
class WeekDays extends Component {
    render() {
        return <div className="days">{this.props.index}</div> 
    }
}
export default WeekDays;
