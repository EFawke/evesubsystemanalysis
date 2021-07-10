import React from 'react';
import axios from 'axios';

class Timeslot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfKills: null,
            hotness: "Hourslot",
            shipSelected: this.HomeCheck()
        };
        this.HomeCheck = this.HomeCheck.bind(this)
    }
    HomeCheck = () => {
        if(window.location.pathname === "/"){
            return "Heron"
        }
        else {
            return window.location.pathname
        }
    }
    fetchData(){
        axios.get(`/api/esi/${this.props.day}/${this.state.shipSelected}/${this.props.time}`)
        .then(response => {
            if(response.data.parsedData === 0){
                return this.setState({numberOfKills: ''})
            }
            return this.setState({numberOfKills: response.data.parsedData})
        }).then(() => {
            if(this.state.numberOfKills === ''){
                this.setState({hotness: "Hourslot"});
            } else if(this.state.numberOfKills <4){
                this.setState({hotness: "LowHeat"});
            } else if (this.state.numberOfKills <7){
                this.setState({hotness: "Hot"});
            } else {
                this.setState({hotness: "SuperHot"})
            }
        })
    }
    componentDidMount(){
        this.setState({shipSelected: window.location.pathname})
        this.fetchData();
    };
    render(){
            return (
                <td className = {this.state.hotness}>{this.state.numberOfKills}</td>
            )
    }
};

export default Timeslot;
