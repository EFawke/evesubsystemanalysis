import React from 'react';
import axios from 'axios';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            // totalDestroyed: null,
            shipSelected: this.props.shipSelected,
            // totalDays: null
        };
    }
    HomeCheck = () => {
        if (window.location.pathname === "/") {
            this.setState({ shipSelected: "Heron" })
        } else {
            return window.location.pathname
        }
    }
    componentDidMount() {
        // this.HomeCheck();
        if (window.location.pathname === "/") {
            axios.get(`/api/counter/totalDestroyed/Heron`).then(response => {
                const totalDes = response.data.number;
                this.setState({ totalDestroyed: totalDes })
                this.setState({shipSelected: "Heron"})
                this.setState({days: response.data.days})
            }).then(() => {
                this.setState({ isLoaded: true })
            })
        } else {
            axios.get(`/api/counter/totalDestroyed/${this.props.shipSelected}`).then(response => {
                const totalDes = response.data.number;
                this.setState({ totalDestroyed: totalDes })
                this.setState({days: response.data.days})
            }).then(() => {
                this.setState({ isLoaded: true })
            })
        }
    };
    render() {
        const isLoaded = this.state.isLoaded
        if (!isLoaded) {
            return (
                <div>Loading...</div>
            )
        }
        if(this.state.totalDestroyed === 0){
            return (
                <p className = "info"><span className = "infoSpan">{this.state.shipSelected}</span>, I haven't heard that name in years.</p>
            )
        } else {
            return (
                <p className="info">Fetching {this.state.totalDestroyed} <span className="infoSpan">{this.state.shipSelected}</span> kills from the last <span>{this.state.days}</span> days in wormhole space.</p>
            )
        }
    }
};

export default Info;
