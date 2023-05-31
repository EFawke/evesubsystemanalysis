import React from 'react';

class TopContainerAbout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            name: "About",
        };
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
        if (!this.state.isLoaded) {
            return (
                <div className='top_container'>
                    loading...
                </div>
            )
        } else {
            return (
                <div className='top_container'>
                    <div id='top_container_name' className={this.props.mode}>
                        <div className='name_and_price'>
                            <h1>{this.state.name}</h1>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default TopContainerAbout;