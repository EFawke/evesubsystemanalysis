import React from 'react';
import axios from 'axios';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            // totalDestroyed: null,
            shipSelected: this.props.shipSelected,
            totalDays: null
        };
    }
    HomeCheck = () => {
        if (window.location.pathname === "/") {
            this.setState({ shipSelected: "Heron" })
        } else {
            return window.location.pathname
        }
    }
    // fetchTotalDestroyed = () => {
    //     if (window.location.pathname === "/") {
    //         axios.get(`/api/info/totalDestroyed/Heron`)
    //         .then(response => {
    //             this.setState({ totalDestroyed: response.data.totalDestroyed });
    //         })
    //         .then(() => {
    //             this.setState({isLoaded: true})
    //         })
    //     } else {
    //     axios.get(`/api/info/totalDestroyed/${this.props.shipSelected}`)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({ totalDestroyed: response.data.totalDestroyed })
    //         })
    //         .then(() => {
    //             this.setState({isLoaded: true})
    //         })
    //     }
    // }
    calcTotalDays = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date('2021-07-03T11:30:02Z')
        const secondDate = Date.now();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        this.setState({ totalDays: diffDays });
    }
    componentDidMount() {
        // this.HomeCheck();
        if (window.location.pathname === "/") {
            axios.get(`/api/info/totalDestroyed/Heron`).then(response => {
                const totalDes = response.data;
                this.setState({ totalDestroyed: totalDes })
            }).then(() => {
                this.setState({ isLoaded: true })
            })
        } else {
            axios.get(`/api/info/totalDestroyed/${this.props.shipSelected}`).then(response => {
                const totalDes = response.data;
                this.setState({ totalDestroyed: totalDes })
            }).then(() => {
                this.setState({ isLoaded: true })
            })
        }
        // this.fetchTotalDestroyed();
        this.calcTotalDays();
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
