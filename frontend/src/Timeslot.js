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
        if(window.location.pathname === "/Marauders"){
            return "Marauders"
        }
        if(window.location.pathname === "/Dreadnoughts"){
            return "Dreadnoughts"
        }
        if(window.location.pathname === "/AllC5RattingShips"){
            return "AllC5RattingShips"
        }
        else {
            return window.location.pathname
        }
    }

    fetchMarauders(){
        if(this.state.shipSelected !== "Marauders"){
            return;
        }
        axios.get(`/api/Marauders/${this.props.day}/Marauders/${this.props.time}`)
        .then(response => {
            if(response.data.Marauders === 0){
                return this.setState({numberOfKills: ''})
            }
            return this.setState({numberOfKills: response.data.Marauders})
        }).then(() => {
            if(this.state.numberOfKills === ''){
                this.setState({hotness: "Hourslot"});
            } else if(this.state.numberOfKills <2){
                this.setState({hotness: "LowHeat"});
            } else if (this.state.numberOfKills <4){
                this.setState({hotness: "Hot"});
            } else {
                this.setState({hotness: "SuperHot"})
            }
        })
    }

    fetchDreadnoughts(){
        if(this.state.shipSelected !== "Dreadnoughts"){
            return;
        }
        axios.get(`/api/Dreadnoughts/${this.props.day}/Dreadnoughts/${this.props.time}`)
        .then(response => {
            if(response.data.dreads === 0){
                return this.setState({numberOfKills: ''})
            }
            return this.setState({numberOfKills: response.data.dreads})
        }).then(() => {
            if(this.state.numberOfKills === ''){
                this.setState({hotness: "Hourslot"});
            } else if(this.state.numberOfKills <2){
                this.setState({hotness: "LowHeat"});
            } else if (this.state.numberOfKills <4){
                this.setState({hotness: "Hot"});
            } else {
                this.setState({hotness: "SuperHot"})
            }
        })
    }

    fetchAllC5RattingShips(){
        if(this.state.shipSelected !== "AllC5RattingShips"){
            return;
        }
        axios.get(`/api/C5/${this.props.day}/AllC5RattingShips/${this.props.time}`)
        .then(response => {
            if(response.data.C5Data === 0){
                return this.setState({numberOfKills: ''})
            }
            return this.setState({numberOfKills: response.data.C5Data})
        }).then(() => {
            if(this.state.numberOfKills === ''){
                this.setState({hotness: "Hourslot"});
            } else if(this.state.numberOfKills <2){
                this.setState({hotness: "LowHeat"});
            } else if (this.state.numberOfKills <4){
                this.setState({hotness: "Hot"});
            } else {
                this.setState({hotness: "SuperHot"})
            }
        })
    }

    fetchData(){
        //Prevent fetch for groups of ships.
        if(this.state.shipSelected === "Marauders" || this.state.shipSelected === "Dreadnoughts" || this.state.shipSelected === "AllC5RattingShips"){
            return;
        }
        axios.get(`/api/ShipType/${this.props.day}/${this.state.shipSelected}/${this.props.time}`)
        .then(response => {
            if(response.data.parsedData === 0){
                return this.setState({numberOfKills: ''})
            }
            return this.setState({numberOfKills: response.data.parsedData})
        }).then(() => {
            if(this.state.numberOfKills === ''){
                this.setState({hotness: "Hourslot"});
            } else if(this.state.numberOfKills <2){
                this.setState({hotness: "LowHeat"});
            } else if (this.state.numberOfKills <4){
                this.setState({hotness: "Hot"});
            } else {
                this.setState({hotness: "SuperHot"})
            }
        })
    }
    componentDidMount(){
        // this.setState({shipSelected: window.location.pathname})
        this.fetchDreadnoughts();
        this.fetchMarauders();
        this.fetchAllC5RattingShips();
        this.fetchData();
    };
    render(){
            return (
                <td className = {this.state.hotness}><span className = "span">{this.state.numberOfKills}</span></td>
            )
    }
};

export default Timeslot;
