import React from 'react';
import Drawer from 'material-ui/Drawer';
import WeekModal from "./WeekModal";
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import {stringifyWeekMode, msToTime, startTime, weekShort} from "../helpers";
import Subheader from 'material-ui/Subheader';
const styles = {
  textAlign: "center",
  display: "inline",
  padding: 0,
  width: 100,   
}
export default class DrawerOpenRightExample extends React.Component {
  constructor(props) {
    super(props);
    this.week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
 
  render() {   
    return (
      <div className="toggle">
      <Toggle label = "Week mode"  onToggle = {this.handleToggle}  />      
        <Drawer width={300} openSecondary={true} open={this.state.open} >
        <div className="months-controllers">
          <i className="fa fa-chevron-left" aria-hidden="true" onClick = {this.props.prevWeek}></i>
            <Subheader style = {styles}>Switch weeks</Subheader>
            <i className="fa fa-chevron-right" aria-hidden="true" onClick = {this.props.nextWeek}></i>
        </div>
        {this.props.week.map((key, i) => {
          let arr =  this.props.JSONInfo.JSONEvents.filter( k => {
            return k.start.getDate() === key.getDate() && k.start.getMonth() === key.getMonth();
          })
          return (
            <div key = {key}>
              <ListItem key = {key}
                primaryText={<span className = "week-date">{stringifyWeekMode(key)}</span>}
                initiallyOpen = {true}
                leftIcon={<span className = "week-short">{weekShort(key.getDay())}</span>}
                primaryTogglesNestedList = {true}
                insetChildren = {true}
                nestedItems = {arr.map((key,i)=>[<div>
                                                <WeekModal key = {key.id}  
                                                  index = {key.id} 
                                                  resources = {key.resources} 
                                                  duration = {msToTime(key.duration)} 
                                                  description = {key.description} 
                                                  start = {startTime(key.start.getHours(), key.start.getMinutes())} 
                                                  title = {key.title} 
                                                  hello = {key.type} 
                                                  speakers = {key.speakers} 
                                                  index1 = {i}    
                                                  JSONInfo = {this.props.JSONInfo} /><Divider inset={true} /></div>,])} />              
            </div>
          )
        })}
        </Drawer>
      </div>
    );
  }
}
