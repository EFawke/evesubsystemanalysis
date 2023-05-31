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
            price: this.props.jitaPrice,
            url: `https://images.evetech.net/types/${this.props.id}/icon?size=64`,
            advice: null,
            amarrPrice: this.props.amarrPrice,
        };
    }


    componentDidMount() {
        const apiKey = "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";
        const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

        const prompt = this.props.prompt;
        const maxTokens = 100;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const data = {
            prompt: prompt,
            max_tokens: maxTokens
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // Handle the API response here
                console.log(result);
                this.setState({ advice: result.choices[0].text})
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error:', error);
            });

        this.setState({ name: this.state.name });
        let jitaPrice = this.props.jitaPrice;
        jitaPrice = (jitaPrice / 1000000).toFixed(1);
        this.setState({ price: jitaPrice });
        this.setState({ isLoaded: true });
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