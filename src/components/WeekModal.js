import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { CSSTransitionGroup } from 'react-transition-group';
const styles = {    
    width: 100,
    overflow: "hidden",
    textAlign: "center",
    display: "block",
    cursor: "pointer",
};

class WeekModal extends React.Component {
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
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false}>    
          <li onClick={this.handleOpen}><span><i className="fa fa-clock-o" aria-hidden="true"></i>{this.props.start}</span>  <span><i className="fa fa-file-code-o" aria-hidden="true"></i>{this.props.type}: {this.props.title}</span></li>
        </CSSTransitionGroup>    
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
        <div className="lectors">{arr.map(key => <div key = {key} className = "lector"><img src={key.avatar} /><div>{key.name}</div></div>)}</div>
        <hr/>
        {this.props.description}
        <hr/>
        <div className="modal-info">
        <div>
          <div>Start {this.props.start}</div>
          <div>Duration {this.props.duration}</div>
        </div>
        <div className="resources">
          {this.props.resources.map(key => {
            return <div key = {key}><a href={key.resource} target="_blank">{key.type}</a></div>
          })}
        </div>  
        </div>
        </Dialog>
      </div>
    );
  }
}
export default WeekModal;
