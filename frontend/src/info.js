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
                const totalDes = response.data;
                this.setState({ totalDestroyed: totalDes })
            }).then(() => {
                this.setState({ isLoaded: true })
            })
        } else {
            axios.get(`/api/counter/totalDestroyed/${this.props.shipSelected}`).then(response => {
                const totalDes = response.data;
                this.setState({ totalDestroyed: totalDes })
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
        return (
            <p className="info">Fetching {this.state.totalDestroyed} <span className="infoSpan">{this.state.shipSelected}</span> kills from the last <span>3 months</span> in wormhole space.</p>
        )
    }
};

export default Info;
