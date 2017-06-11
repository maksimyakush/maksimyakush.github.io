import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
class WeekInfo extends Component {
  constructor(props) {
    super(props);
    this.week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    this.state = {open: false};
  }
  render() {
    let arr =  this.props.JSONInfo.JSONEvents.filter(key => key.start.getDate() == this.props.index.getDate() && key.start.getMonth() == this.props.index.getMonth())
    return (
      <div>
        {arr.map((a,i)=><ListItem key={1} primaryText={a[i].description} />)}
      </div>
    )
  }
}
export default WeekInfo;
