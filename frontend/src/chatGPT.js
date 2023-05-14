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
            <div className='chatGPT ui_box'>
                <p className='gpt_response'>
                    Based on the low demand for Loki Core - Dissolution Sequencer's and its relatively low sell price in Jita compared to the production cost, it is not recommended to produce this subsystem. Additionally, with only 3 units destroyed this week, there is little evidence of significant demand for this product in the near future.
                </p>
            </div>
        )
    }
}

export default ChatGPT;