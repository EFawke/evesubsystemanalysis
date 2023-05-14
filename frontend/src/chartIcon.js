import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Pie } from 'react-chartjs-2';

class ChartIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: this.props.type,
            isHovered: false,
            data: this.props.data,
        }
        this.handleHover = this.handleHover.bind(this);
    }

    //render a chart icon
    render() {
        return (
            <div className="chart_icon" onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                <div className="chart_icon_title">{this.state.type}</div>
                {this.state.isHovered ? <div className="chart_icon_hover">{this.state.data}</div> : null}
            </div>
        )
    }

}