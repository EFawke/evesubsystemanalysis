import axios from 'axios';
import React from 'react';
import ChatGPT from './chatGPT';
import MarketInfo from './marketInfo';

class TopContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            id: this.props.id,
            name: this.props.name,
            price: null,
            order_count: null,
            volume: null,
            num_des: this.props.num_des,
            url: `https://images.evetech.net/types/${this.props.id}/icon?size=64`,
            evepraisalData: this.props.evepraisalData,
        };
    }


    componentDidMount() {
        this.setState({ isLoaded: true });
        this.setState({ name: this.state.name });
        let minJitaPrice = this.state.evepraisalData.jita_sell;
        minJitaPrice = (minJitaPrice / 1000000).toFixed(1);
        this.setState({ price: minJitaPrice })
        this.setState({ order_count: this.state.evepraisalData.jita_sell_orders });
        this.setState({ volume: this.state.evepraisalData.jita_sell_volume })
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({ id: this.props.id });
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className='top_container'>
                    loading...
                </div>
            )
        } else {
            return (
                <div className='top_container'>
                    <div id='top_container_name' className='ui_box'>
                        <img src={this.state.url}></img>
                        <div className='name_and_price'>
                            <h1 className='product_name'>{this.state.name}</h1>
                            <p className='product_price'>{this.state.price}<span className="quantity">M</span></p>
                        </div>
                    </div>
                    <ChatGPT prompt={this.props.prompt}/>
                    <MarketInfo evepraisalData={this.state.evepraisalData} />
                </div>
            )
        }
    }
}

export default TopContainer;