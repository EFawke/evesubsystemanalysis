import React from 'react';
import axios from 'axios';
import Loading from './loading.js';

class ChatGPT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompt: this.props.prompt,
            advice: "",
            error: null,
            isLoaded: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.prompt !== prevProps.prompt) {
            this.setState({ prompt: this.props.prompt });
        }
    }

    componentDidMount() {
        //axios api/about endpoint in the backend
        // axios.get('/api/key')
        //     .then(res => {
        const apiKey = this.props.apiKey;
        const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        const data = {
            prompt: this.props.prompt,
            max_tokens: 100,
        };

        axios.post(url, data, { headers })
            .then(response => {
                this.setState({ advice: response.data.choices[0].text });
                this.setState({ isLoaded: true });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: error });
            });
        // })
        this.setState({ prompt: this.props.prompt });
    }

    render() {
        if (this.state.error) {
            return (
                <div className={this.props.mode + ' chatGPT ui_box'}>
                    <p className='gpt_response'>
                        Analysis not available. Please try again later.
                    </p>
                </div>
            )
        }
        if (!this.state.isLoaded) {
            //make a canvas loading animation
            return (
                <div className={this.props.mode + ' chatGPT ui_box'}>
                    <Loading />
                </div>
            )
        }
        return (
            <div className={this.props.mode + ' chatGPT ui_box'}>
                <p className='gpt_response'>
                    {this.state.advice}
                </p>
            </div>
        )
    }
}

export default ChatGPT;