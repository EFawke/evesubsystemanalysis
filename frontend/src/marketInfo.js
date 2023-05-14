import React from 'react';

class MarketInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            jita_sell: Number(this.props.evepraisalData.jita_sell),
            jita_sell_orders: this.props.evepraisalData.jita_sell_orders,
            jita_sell_volume: this.props.evepraisalData.jita_sell_volume,
            jita_buy: this.props.evepraisalData.jita_buy,
            jita_buy_orders: this.props.evepraisalData.jita_buy_orders,
            jita_buy_volume: this.props.evepraisalData.jita_buy_volume,
            amarr_sell: this.props.evepraisalData.amarr_sell,
            amarr_sell_orders: this.props.evepraisalData.amarr_sell_orders,
            amarr_sell_volume: this.props.evepraisalData.amarr_sell_volume,
            amarr_buy: this.props.evepraisalData.amarr_buy,
            amarr_buy_orders: this.props.evepraisalData.amarr_buy_orders,
            amarr_buy_volume: this.props.evepraisalData.amarr_buy_volume,
        }
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({ id: this.props.id });
        }
    }

    render() {
        return (
            <div className='market_info'>
                <p className='market_info_body_row_column_orders'>{this.state.jita_sell_orders} Sell Orders / {this.state.jita_sell_volume} units</p>
                <p className='market_info_body_row_column_orders'>{this.state.jita_buy_orders} Buy Orders / {this.state.jita_buy_volume} units</p>
            </div>
        )
    }
}

export default MarketInfo;