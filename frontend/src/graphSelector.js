import React from 'react';
//import font-awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarChart } from '@fortawesome/free-solid-svg-icons'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

class GraphSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            graphType: "bar",
            isHovered: false,
        }
        this.handleChange = this.changeGraphType.bind(this)
        this.handleHover = this.handleHover.bind(this)
    }

    handleHover = (type) => {
        this.setState({ isHovered: !this.state.isHovered })
    }

    changeGraphType = (type) => {
        this.setState({ graphType: type })
        this.props.changeGraphType(type)
    }

    render() {
        return (
            <div className="graph_selector">
                <div className="graph_button">
                    <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                    <p className = "hide_before_hover">Bar Chart</p>
                </div>
                <div className="graph_button">
                    <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                    <p className = "hide_before_hover">Pie Chart</p>
                </div>
                <div className="graph_button">
                    <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
                    <p className = "hide_before_hover">Heat Map</p>
                </div>
            </div>
        )
    }
}

export default GraphSelector;