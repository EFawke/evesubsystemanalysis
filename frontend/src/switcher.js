import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Selector from './selector';
import { faGear } from '@fortawesome/free-solid-svg-icons'

class Switcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBeenClicked: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    //when the prop loads reload this component
    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.setState({ name: this.props.name });
        }
    }

    openNav() {
        this.setState({ hasBeenClicked: true })
    }

    //on click open nav
    handleClick() {
        if (this.state.hasBeenClicked) {
            this.closeNav();
        } else {
            this.openNav();
        }
    }

    //close nav
    closeNav() {
        this.setState({ hasBeenClicked: false })
    }

    render() {
        return (
            <div className="user_interface">
                <button className = "header_button" onClick={this.handleClick}><FontAwesomeIcon icon={faGear} /></button>
                <Selector openNav={this.state.hasBeenClicked}/>
            </div>
        )
    }
}
export default Switcher;