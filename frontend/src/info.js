import React from 'react';
import axios from 'axios';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalDestroyed: null,
            shipSelected: this.props.shipSelected,
            totalDays: null
        };
        this.fetchTotalDestroyed = this.fetchTotalDestroyed.bind(this);
    }
    HomeCheck = () => {
        if(window.location.pathname === "/"){
            return "Heron"
        }
        else {
            return window.location.pathname
        }
    }
    fetchTotalDestroyed = () => {
        axios.get(`/api/esi/totalDestroyed/${this.state.shipSelected}`)
        .then(response => {
            return this.setState({totalDestroyed: response.data.totalDestroyed})
        })
    }
    calcTotalDays = () =>{
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date('2021-07-03T11:30:02Z')
        const secondDate = Date.now();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        this.setState({totalDays: diffDays});
    }
    componentDidMount(){
        this.calcTotalDays();
        this.fetchTotalDestroyed();
        this.calcTotalDays();
    };
    render(){
            return (
                <p className = "info">Fetching {this.state.totalDestroyed} {this.props.shipSelected} kills from the last {this.state.totalDays} days in wormhole space.</p>
            )
    }
};

export default Info;
