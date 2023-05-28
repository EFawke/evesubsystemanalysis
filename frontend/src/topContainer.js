import axios from 'axios';
import React from 'react';
import ChatGPT from './chatGPT';
// import MarketInfo from './marketInfo';

class TopContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            id: this.props.id,
            name: this.props.name,
            price: null,
            url: `https://images.evetech.net/types/${this.props.id}/icon?size=64`,
            marketData: this.props.marketData,
            advice: null,
        };
    }


    componentDidMount() {
        // const apiKey = "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";
        // const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

        // const prompt = this.props.prompt;
        // const maxTokens = 100;

        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${apiKey}`
        // };

        // const data = {
        //     prompt: prompt,
        //     max_tokens: maxTokens
        // };

        // fetch(apiUrl, {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(data)
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //         // Handle the API response here
        //         console.log(result);
        //         this.setState({ advice: result.choices[0].text})
        //     })
        //     .catch(error => {
        //         // Handle any errors that occur during the request
        //         console.error('Error:', error);
        //     });

        // // axios.get()
        this.setState({ isLoaded: true });
        this.setState({ name: this.state.name });
        let array = this.state.marketData;
        let lastValue = array[array.length - 1];
        let minJitaPrice = lastValue.jita_sell;
        minJitaPrice = (minJitaPrice / 1000000).toFixed(1);
        this.setState({ price: minJitaPrice })
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
                    <div id='top_container_name' className={this.props.mode + ' ui_box'}>
                        <img src={this.state.url}></img>
                        <div className='name_and_price'>
                            <h1 className='product_name'>{this.state.name}</h1>
                            <p className='product_price'>{this.state.price}<span className="quantity">M</span></p>
                        </div>
                    </div>
                    <ChatGPT advice={this.state.advice} prompt={this.props.prompt} mode={this.props.mode} />
                </div>
            )
        }
    }
}

export default TopContainer;