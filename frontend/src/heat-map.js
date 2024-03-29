import axios from 'axios';
import React from 'react';
import Timeslot from './Timeslot';

class Heatmap extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         subsystem: this.props.heatMap,
         heatmap: null,
         Monday: this.props.heatMap.Monday,
         Tuesday: this.props.heatMap.Tuesday,
         Wednesday: this.props.heatMap.Wednesday,
         Thursday: this.props.heatMap.Thursday,
         Friday: this.props.heatMap.Friday,
         Saturday: this.props.heatMap.Saturday,
         Sunday: this.props.heatMap.Sunday,
      };
   }

   componentDidUpdate(prevProps) {
      if (this.props.heatMap !== prevProps.heatMap) {
         this.setState({ heatMap: this.props.heatMap });
      }
   }

   renderTableData(day) {
      const value = day;
      let weekday;
      let initial
      if (value === this.state.Monday) {
         weekday = this.state.Monday;
         initial = "M"
      } else if (value === this.state.Tuesday) {
         weekday = this.state.Tuesday
         initial = "T"
      } else if (value === this.state.Wednesday) {
         weekday = this.state.Wednesday
         initial = "W"
      } else if (value === this.state.Thursday) {
         weekday = this.state.Thursday
         initial = "T"
      } else if (value === this.state.Friday) {
         weekday = this.state.Friday
         initial = "F"
      } else if (value === this.state.Saturday) {
         weekday = this.state.Saturday
         initial = "S"
      } else if (value === this.state.Sunday) {
         weekday = this.state.Sunday
         initial = "S"
      }

      return (
         <tr>
            <td className="Top">{initial}</td>
            <Timeslot data={weekday[0]} />
            <Timeslot data={weekday[1]} />
            <Timeslot data={weekday[2]} />
            <Timeslot data={weekday[3]} />
            <Timeslot data={weekday[4]} />
            <Timeslot data={weekday[5]} />
            <Timeslot data={weekday[6]} />
            <Timeslot data={weekday[7]} />
            <Timeslot data={weekday[8]} />
            <Timeslot data={weekday[9]} />
            <Timeslot data={weekday[10]} />
            <Timeslot data={weekday[11]} />
            <Timeslot data={weekday[12]} />
            <Timeslot data={weekday[13]} />
            <Timeslot data={weekday[14]} />
            <Timeslot data={weekday[15]} />
            <Timeslot data={weekday[16]} />
            <Timeslot data={weekday[17]} />
            <Timeslot data={weekday[18]} />
            <Timeslot data={weekday[19]} />
            <Timeslot data={weekday[20]} />
            <Timeslot data={weekday[21]} />
            <Timeslot data={weekday[22]} />
            <Timeslot data={weekday[23]} />
         </tr>
      )
   }

   render() {
      return (
         <div>
            <div className = "heatmap_legend">
               <p>Heat Map</p>
            </div>
            <table className="Heatmap">
               <thead>
                  <tr>
                     <th className="Top"></th>
                     <th className="Top">00</th>
                     <th className="Top">01</th>
                     <th className="Top">02</th>
                     <th className="Top">03</th>
                     <th className="Top">04</th>
                     <th className="Top">05</th>
                     <th className="Top">06</th>
                     <th className="Top">07</th>
                     <th className="Top">08</th>
                     <th className="Top">09</th>
                     <th className="Top">10</th>
                     <th className="Top">11</th>
                     <th className="Top">12</th>
                     <th className="Top">13</th>
                     <th className="Top">14</th>
                     <th className="Top">15</th>
                     <th className="Top">16</th>
                     <th className="Top">17</th>
                     <th className="Top">18</th>
                     <th className="Top">19</th>
                     <th className="Top">20</th>
                     <th className="Top">21</th>
                     <th className="Top">22</th>
                     <th className="Top">23</th>
                  </tr>
               </thead>
               <tbody>
                  {this.renderTableData(this.state.Monday)}
                  {this.renderTableData(this.state.Tuesday)}
                  {this.renderTableData(this.state.Wednesday)}
                  {this.renderTableData(this.state.Thursday)}
                  {this.renderTableData(this.state.Friday)}
                  {this.renderTableData(this.state.Saturday)}
                  {this.renderTableData(this.state.Sunday)}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Heatmap