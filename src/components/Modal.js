import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { CSSTransitionGroup } from 'react-transition-group';
import Chip from 'material-ui/Chip';
import {blue300} from 'material-ui/styles/colors';
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Timer from 'material-ui/svg-icons/image/timer';
import Device from 'material-ui/svg-icons/device/access-time';
import Description from 'material-ui/svg-icons/action/description';
import Feedback from 'material-ui/svg-icons/action/feedback';
const styles = {};
const stylesIcon = {
  position: "absolute",
  left:-30,
  top: -3,  
};
class Modal extends React.Component {
  constructor() {
    super();
    this.getBackgroundColor = this.getBackgroundColor.bind(this);
  }
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
    
  getBackgroundColor() {
   let lectureObj = {...styles};
   let eventObj = {...styles};
   let webinarObj = {...styles};
   let deadlineObj = {...styles};
   let workshopObj = {...styles};
    if(this.props.type === "lecture") {
        return Object.assign(lectureObj, {backgroundColor:"purple"})
    }
    else if(this.props.type === "event") {
        return Object.assign(eventObj, {backgroundColor:"orange"})
    }
    else if(this.props.type === "webinar") {
        return Object.assign(webinarObj, {backgroundColor:"#333"})
    }
    else if(this.props.type === "deadline") {
        return Object.assign(deadlineObj, {backgroundColor:"green"})
    }
    else if(this.props.type === "workshop") {
        return Object.assign(workshopObj, {backgroundColor:"brown"})
    }
    else return styles;
  }  
    
  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    let arr = [];
    for(let i = 0; i < this.props.JSONInfo.JSONTrainers.length; i++) {
      if (this.props.speakers.indexOf(this.props.JSONInfo.JSONTrainers[i].id) > -1 ) {
        arr.push(this.props.JSONInfo.JSONTrainers[i]);        
      }
    }
    return (
      <div>
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout = {300}
          transitionEnter={false}
          transitionLeave={false}>    
          <Chip label="Dialog" onClick={this.handleOpen} backgroundColor={blue300} style={this.getBackgroundColor()}>{this.props.type}</Chip>
        </CSSTransitionGroup>    
        <Dialog
          title = {this.props.title}
          actions = {actions}
          modal = {false}
          open = {this.state.open}
          onRequestClose = {this.handleClose} >
            <div className = "lectors">{arr.map(key => <div key = {key} className = "lector"><img src = {key.avatar} alt = "Avatar" /><div>{key.name}</div></div>)}</div>
            <hr/>
            {this.props.description}
            <hr/>
            <div className="modal-info">
              <div>
                <div className="relative"><Device style = {stylesIcon} /> {this.props.start}</div>
                <div className="relative"><Timer style = {stylesIcon} /> {this.props.duration}</div>
              </div>                                   
              <div className="feedback">
                <ListItem primaryText = "Feedback" 
                  leftIcon={<Feedback />}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={[<div>
                                  <form action = "">
                                    <TextField
                                      hintText = "Type your feedback here!"
                                      multiLine = {true}
                                      rows = {2}
                                      rowsMax = {4}/>
                                    <input type="submit" value = "Send" />
                                  </form>
                                </div>,]} /> 
                </div>
                <div className="resources">
                  <ListItem primaryText="Resources"
                    leftIcon={<Description />}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={this.props.resources.map((key)=>[<div key = {key}><a href={key.resource} target="_blank">{key.type}</a></div>,])} />              
                </div>           
              </div>
            </Dialog>
      </div>
    );
  }
}
export default Modal;
