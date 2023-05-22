import React from 'react';

class ChatGPT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompt: this.props.prompt,
            isLoaded: false,
        }
    }

    render() {
        return (
            <div className={this.props.mode + ' chatGPT ui_box'}>
                <p className='gpt_response'>
                    {this.props.advice}
                </p>
            </div>
        )
    }
}

export default ChatGPT;