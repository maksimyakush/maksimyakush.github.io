import React, { Component } from 'react';
import Week from "./components/Week"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Square from "./components/Square";
import WeekDays from "./components/WeekDays";
import Month from "./components/Month";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
class App extends Component {
  constructor() {
    super();
    this.year = new Date().getFullYear();
    this.today = new Date().getDate();
    this.month = new Date().getMonth();
    this.dayOfWeek = new Date().getDay();
    this.whichWeek = 0;
    this.weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];        
    this.months = ["January",  "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.JSONInfo = {
        JSONEvents:[],
        JSONTrainers:[],
    }
    this.week = [];
    this.state = {
        whichYear: this.year,
        whichMonth: this.month,
        dates: this.getDates(),
        week: [],
    };
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.getDates = this.getDates.bind(this);
    this.divideMonth = this.divideMonth.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
  }

  divideMonth() {   
    let newDates = [...this.state.dates];  
    let currentMonth = this.month;
    let newMonth = newDates.filter(key => key.getMonth()  ===  currentMonth);
    let lastDayOfFirstWeek;
    for(let i = 0; i <= newMonth.length; i++) {
      if (newMonth[i].getDay()  ===  0) {
        lastDayOfFirstWeek = i;
        break;
      }
    }
    let first = newMonth.splice(0,lastDayOfFirstWeek + 1);
    let second = newMonth.splice(0,7);
    let third = newMonth.splice(0,7);
    let forth = newMonth.splice(0,7);
    this.week = [first,second, third, forth]
    if(newMonth.length > 0) {
       this.week[4] = [...newMonth]; 
    }
    return this.week;
  }

  componentDidMount() {
    let urls = ["http://128.199.53.150/events", "http://128.199.53.150/trainers"];
    Promise.all(urls.map(url=>fetch(url)))
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(res => {
      this.JSONInfo.JSONEvents = res[0].map(key => {
        key.start = new Date(key.start.slice(0,4), key.start.slice(5,7)-1, key.start.slice(8,10), key.start.slice(11,13), key.start.slice(14,16), key.start.slice(17,19));
        return key;
      })
      this.JSONInfo.JSONTrainers = res[1]; 
      this.divideMonth();
      this.setState({
        whichMonth: this.month,
        dates: this.getDates(),
        whichYear: this.state.dates[0].getFullYear(),
        week: this.week[this.whichWeek], 
      })  
      document.querySelector(".toggle .fa-chevron-left").style.display = "none";        
    })
  }

  getDates() {   
    let arr = new Array(new Date(2017,this.month+1,0).getDate()).fill("x");
    let datesNew = arr.map((key,i) => new Date(this.year,this.month,i + 1));
    if(datesNew[0].getDay() === 2) {
        datesNew.unshift(new Date(this.year,this.month,0));
     } else if (datesNew[0].getDay() === 3) {
        datesNew.unshift(new Date(this.year,this.month,0));
        datesNew.unshift(new Date(this.year,this.month,-1));
     }
     else if (datesNew[0].getDay() === 4) {
        datesNew.unshift(new Date(this.year,this.month,0));
        datesNew.unshift(new Date(this.year,this.month,-1));
        datesNew.unshift(new Date(this.year,this.month,-2));
     }
     else if (datesNew[0].getDay() === 5) {
        datesNew.unshift(new Date(this.year,this.month,0));
        datesNew.unshift(new Date(this.year,this.month,-1));
        datesNew.unshift(new Date(this.year,this.month,-2));
        datesNew.unshift(new Date(this.year,this.month,-3));
     }
     else if (datesNew[0].getDay() === 6) {
        datesNew.unshift(new Date(this.year,this.month,0));
        datesNew.unshift(new Date(this.year,this.month,-1));
        datesNew.unshift(new Date(this.year,this.month,-2));
        datesNew.unshift(new Date(this.year,this.month,-3));
        datesNew.unshift(new Date(this.year,this.month,-4));
     }
     else if (datesNew[0].getDay() === 0) {
        datesNew.unshift(new Date(this.year,this.month,0));
        datesNew.unshift(new Date(this.year,this.month,-1));
        datesNew.unshift(new Date(this.year,this.month,-2));
        datesNew.unshift(new Date(this.year,this.month,-3));
        datesNew.unshift(new Date(this.year,this.month,-4));
        datesNew.unshift(new Date(this.year,this.month,-5));
     }
     let counter = 1;
     while (datesNew.length < 42) {       
        datesNew.push(new Date(this.year, this.month + 1, counter));
        ++counter;
     }
     return datesNew;
  }

  nextMonth() {  
    new Promise(res => {
      ++this.month;
      if(this.month >= 12) {
        this.month = 0;
        ++this.year;
      }
      return res(this.setState({
        whichMonth: this.month,
        dates: this.getDates(),
        whichYear: this.year,     
      })
    )}) 
    .then(res => {
      this.divideMonth();
      this.whichWeek = 0;
      this.setState({week: this.week[this.whichWeek],})    
    })
  }

  prevMonth() {
    --this.month;
    if(this.month<0) {
      this.month = 11;
      --this.year;
    }
    new Promise(res=> {
      return res(
        this.setState({
          whichMonth: this.month,
          dates: this.getDates(),
          whichYear: this.year,   
        })
    )})
    .then(res => {
      this.divideMonth();
      this.whichWeek = 0;
      this.setState({week: this.week[this.whichWeek]})    
    })
  }

  nextWeek() {
    ++this.whichWeek;
    if(this.whichWeek>=4) document.querySelector(".toggle .fa-chevron-right").style.display = "none";
    document.querySelector(".toggle .fa-chevron-left").style.display = "";
    this.setState({week: this.week[this.whichWeek]})
  }

  prevWeek() {
    --this.whichWeek;
    if(this.whichWeek<=0) document.querySelector(".toggle .fa-chevron-left").style.display = "none";
    document.querySelector(".toggle .fa-chevron-right").style.display = "";
    this.setState({week: this.week[this.whichWeek]})
  }
    
  render() {
    return (
      <MuiThemeProvider>
        <div className="main">
          <div className="months-controllers">
            <i className="fa fa-chevron-left" aria-hidden="true" onClick = {this.prevMonth}></i>
            <Month months = {this.months} whichMonth = {this.state.whichMonth} whichYear = {this.state.whichYear} />
            <i className="fa fa-chevron-right" aria-hidden="true" onClick = {this.nextMonth}></i>    
          </div>
          <div className="App">
            <Week 
              dates = {this.state.dates} 
              week = {this.state.week}
              nextWeek = {this.nextWeek}
              prevWeek = {this.prevWeek}
            JSONInfo = {this.JSONInfo}  />
            {this.weeks.map((key) => <WeekDays key = {key} index = {key} />)}
            {this.state.dates.map((key, i)=><Square key = {i} index = {key} currentIndex = {i}  JSONInfo = {this.JSONInfo} />)}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }   
}
export default App;
