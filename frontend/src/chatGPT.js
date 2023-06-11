import React from 'react';
import axios from 'axios';
import Loading from './loading.js';
import Cookies from 'js-cookie';

class ChatGPT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompt: null,
            advice: "",
            apiKey: null,
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
        if (window.location.pathname === "/") {
            axios.get(`/api/subsystems/45589`).then(response => {
                this.setState({ prompt: response.data.prompt });
                this.setState({ apiKey: response.data.apiKey });
            }).then(() => {

                console.log(this.state.prompt);

                //log prompt and api key
                // console.log(this.state.prompt);
                // console.log(this.state.apiKey);
                const apiKey = this.state.apiKey;
                const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                };
                const data = {
                    prompt: this.state.prompt,
                    max_tokens: 100,
                };

                axios.post(url, data, { headers })
                    .then(response => {
                        //console.log(response);
                        this.setState({ advice: response.data.choices[0].text });
                        this.setState({ isLoaded: true });
                    })
                    .catch(error => {
                        console.error(error);
                        this.setState({ error: error });
                    });
            })
                .catch((err) => {
                    // console.log(err);
                    // this.setState({ is404: true })
                })
        } if (window.location.pathname !== "/about/" && window.location.pathname !== "/") {
            axios.get(`/api/${window.location.pathname.slice(1)}`)
                .then(response => {
                    this.setState({ prompt: response.data.prompt });
                    this.setState({marketeerPrompt: response.data.marketeerPrompt})
                    this.setState({ apiKey: response.data.apiKey });
                }).then(() => {
                    console.log(this.state.prompt);
                    let profession = Cookies.get("profession") ? Cookies.get("profession") : "industrialist";

                    let usedPrompt;

                    if(profession === "marketeer"){
                        usedPrompt = this.state.marketeerPrompt;
                    }  else {
                        usedPrompt = this.state.prompt;
                    }

                    const apiKey = this.state.apiKey;
                    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    };
                    const data = {
                        prompt: usedPrompt,
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
                    // this.setState({ isLoaded: true })
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ is404: true })
                })
        }
        //axios api/about endpoint in the backend
        // const apiKey = this.props.apiKey;
        // const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${apiKey}`
        // };
        // const data = {
        //     prompt: this.props.prompt,
        //     max_tokens: 100,
        // };

        // axios.get(url, data, { headers })
        //     .then(response => {
        //         this.setState({ advice: response.data.choices[0].text });
        //         this.setState({ isLoaded: true });
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         this.setState({ error: error });
        //     });
    }

    render() {
        // if (this.state.error) {
        //     return (
        //         <div className={this.props.mode + ' chatGPT ui_box'}>
        //             <p className='gpt_response'>
        //                 Analysis not available. Please try again later.
        //             </p>
        //         </div>
        //     )
        // }
        if (!this.state.isLoaded) {
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