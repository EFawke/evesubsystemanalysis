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
        axios.get('/api/key')
            .then(res => {
                const apiKey = res.data;
                const maxTokens = 200;
                const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                };

                const data = {
                    prompt: this.props.prompt,
                    max_tokens: maxTokens
                };

                fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(result => {
                        this.setState({ advice: result.choices[0].text });
                        this.setState({ isLoaded: true });
                    })
                    .catch(error => {
                        //try the fetch again
                        console.error('Error:', error);
                        this.setState({ error: error });
                    });
            })
        this.setState({ prompt: this.props.prompt });
        //this.setState({ isLoaded: true });
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