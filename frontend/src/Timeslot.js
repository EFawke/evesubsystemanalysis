import React from 'react';

class Timeslot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            hotness: "Hourslot"
        };
    }

    onMouseEnter(){
        this.setState({isHovered: true});
    }

    onMouseLeave(){
        this.setState({isHovered: false});
    }

    checkHeat(){
        if(this.props.data === 0){
            return "Hourslot"
        } else if(this.props.data < 2) {
            return "LowHeat"
        } else if(this.props.data < 4){
            return "Hot"
        } else if(this.props.data > 10) {
            return "WhiteHot"
        } else {
            return "SuperHot"
        }
    }

    render(){
            return (
                <td className = {this.checkHeat()}><span className = "span">{this.props.data}</span></td>
            )
    }
};

export default Timeslot;