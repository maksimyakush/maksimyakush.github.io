import React, { Component } from 'react';
import Modal from './Modal.js';
import {msToTime, startTime} from "../helpers";
class Square extends Component {
  render() {
    let index = this.props.currentIndex;
    let arr =  this.props.JSONInfo.JSONEvents.filter(key=>{
      return key.start.getDate() === this.props.index.getDate() && key.start.getMonth() === this.props.index.getMonth() && key.start.getFullYear() === this.props.index.getFullYear();
    })
    return (  
      <div className = "wrapper">      
        <div className = "square">
          <div className = "date">{this.props.index.getDate()}</div>
          {arr.map((key, i) => <div key = {i} className = "chip">
                                <Modal key = {key.id}  
                                  index = {key.id} 
                                  resources = {key.resources} 
                                  duration = {msToTime(key.duration)} 
                                  description = {key.description} 
                                  start = {startTime(key.start.getHours(), key.start.getMinutes())} 
                                  title = {key.title} 
                                  type = {key.type} 
                                  speakers = {key.speakers}  
                                  JSONInfo = {this.props.JSONInfo} />
                              </div>)}
        </div>        
      </div>  
    );
  }
}
export default Square;
