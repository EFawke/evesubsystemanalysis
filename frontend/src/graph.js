import axios from 'axios';
import React from 'react';
import Timeslot from './Timeslot';

class Graph extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         isLoaded: false,
         shipSelected: this.props.shipSelected,
         heatmap: null,
         Monday: null,
         Tuesday: null,
         Wednesday: null,
         Thursday: null,
         Friday: null,
         Saturday: null,
         Sunday: null
     };
   }

   renderTableData(day) {
       const value = day;
       let weekday;
       let initial
       if(value === this.state.Monday){
          weekday = this.state.Monday;
          initial = "M"
       } else if(value === this.state.Tuesday){
          weekday = this.state.Tuesday
          initial = "T"
       } else if(value === this.state.Wednesday){
          weekday = this.state.Wednesday
          initial = "W"
       } else if(value === this.state.Thursday){
          weekday = this.state.Thursday
          initial = "T"
       } else if(value === this.state.Friday){
          weekday = this.state.Friday
          initial = "F"
       } else if(value === this.state.Saturday){
          weekday = this.state.Saturday
          initial = "S"
       } else if(value === this.state.Sunday){
          weekday = this.state.Sunday
          initial = "S"
       }
       
       
        return (
            <tr>
                <td className = "Top">{initial}</td>
                <Timeslot data = {weekday[0]}/>
                <Timeslot data = {weekday[1]}/>
                <Timeslot data = {weekday[2]}/>
                <Timeslot data = {weekday[3]}/>
                <Timeslot data = {weekday[4]}/>
                <Timeslot data = {weekday[5]}/>
                <Timeslot data = {weekday[6]}/>
                <Timeslot data = {weekday[7]}/>
                <Timeslot data = {weekday[8]}/>
                <Timeslot data = {weekday[9]}/>
                <Timeslot data = {weekday[10]}/>
                <Timeslot data = {weekday[11]}/>
                <Timeslot data = {weekday[12]}/>
                <Timeslot data = {weekday[13]}/>
                <Timeslot data = {weekday[14]}/>
                <Timeslot data = {weekday[15]}/>
                <Timeslot data = {weekday[16]}/>
                <Timeslot data = {weekday[17]}/>
                <Timeslot data = {weekday[18]}/>
                <Timeslot data = {weekday[19]}/>
                <Timeslot data = {weekday[20]}/>
                <Timeslot data = {weekday[21]}/>
                <Timeslot data = {weekday[22]}/>
                <Timeslot data = {weekday[23]}/>
            </tr>
            )
 }

   componentDidMount() {
      if (window.location.pathname === "/") {
         axios.get(`/api/subsystems/45622`).then(response => {
             const heatmap = response.data
             this.setState({Monday: heatmap.Monday});
             this.setState({Tuesday: heatmap.Tuesday})
             this.setState({Wednesday: heatmap.Wednesday})
             this.setState({Thursday: heatmap.Thursday})
             this.setState({Friday: heatmap.Friday})
             this.setState({Saturday: heatmap.Saturday})
             this.setState({Sunday: heatmap.Sunday})
         }).then(() => {
            this.setState({isLoaded: true})
         })
     } else {
     axios.get(`/api/subsystems/${this.props.shipSelected}`)
         .then(response => {
           const heatmap = response.data
           this.setState({Monday: heatmap.Monday});
           this.setState({Tuesday: heatmap.Tuesday})
           this.setState({Wednesday: heatmap.Wednesday})
           this.setState({Thursday: heatmap.Thursday})
           this.setState({Friday: heatmap.Friday})
           this.setState({Saturday: heatmap.Saturday})
           this.setState({Sunday: heatmap.Sunday})
           console.log(heatmap)
         }).then(() => {
            this.setState({isLoaded: true})
         })
     }
};

 render() {
    const isLoaded = this.state.isLoaded
    if(!isLoaded){
       return (
          <div>Loading...</div>
       )
    }
    return (
       <div>
       </div>
    )
 }
}

export default Graph