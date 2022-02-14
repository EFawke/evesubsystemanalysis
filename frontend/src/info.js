import React from 'react';
import axios from 'axios';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            totalDestroyed: null,
            shipSelected: this.props.shipSelected,
            totalDays: null
        };
        this.fetchTotalDestroyed = this.fetchTotalDestroyed.bind(this);
    }
    HomeCheck = () => {
        //Homepage automatically displays Herons.
        if (window.location.pathname === "/") {
            this.setState({ shipSelected: "Heron" })
        }
        if (window.location.pathname === "/AllC5RattingShips") {
            this.setState({ shipSelected: "C5 Ratting Ship" })
        }
        if(window.location.pathname === "/Marauders"){
            this.setState({shipSelected : "Marauder"})
        }
        if(window.location.pathname === "/Dreadnoughts"){
            this.setState({shipSelected : "Dreadnought"})
        }
        else {
            return window.location.pathname
        }
    }
    fetchTotalDestroyed = () => {
        //Homepage automatically displays Herons.
        if (window.location.pathname === "/") {
            axios.get(`/api/info/totalDestroyed/Heron`).then(response => {
                this.setState({ totalDestroyed: response.data.totalDestroyed });
                this.setState({isLoaded: true})
            })
        }
        else if (this.props.shipSelected === 'Marauders' || this.props.shipSelected === 'Dreadnoughts' || this.props.shipSelected === 'AllC5RattingShips') {
            axios.get(`api/info/totalClassDestroyed/${this.props.shipSelected}`).then(response => {
                this.setState({ totalDestroyed: response.data.totalClassDestroyed });
            })
        } else {
        axios.get(`/api/info/totalDestroyed/${this.props.shipSelected}`)
            .then(response => {
                this.setState({ totalDestroyed: response.data.totalDestroyed })
                this.setState({isLoaded: true})
            })
        }
    }
    calcTotalDays = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date('2021-07-03T11:30:02Z')
        const secondDate = Date.now();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        this.setState({ totalDays: diffDays });
    }
    componentDidMount() {
        this.HomeCheck();
        this.fetchTotalDestroyed();
        this.calcTotalDays();
    };
    render() {
        const isLoaded = this.state.isLoaded
        if(!isLoaded){
            return (
                <div>Loading...</div>
            )
        }
        return (
            <p className="info">Fetching {this.state.totalDestroyed} <span className = "infoSpan">{this.state.shipSelected}</span> kills from the last <span>3 months</span> in wormhole space.</p>
        )
    }
};

export default Info;
