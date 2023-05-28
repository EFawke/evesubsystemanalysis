import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarChart } from '@fortawesome/free-solid-svg-icons'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faLineChart } from '@fortawesome/free-solid-svg-icons'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { faPlaneCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import Heatmap from './heat-map';
import { Line } from 'react-chartjs-2';


class PageBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            heatMap: this.props.heatMap,
            graph: this.props.graph,
            pie: this.props.pieChart,
            selected: "pie",
            hub: "jita",
            mode: this.props.mode ? this.props.mode : "dark",
        }
    }

    componentDidMount() {
        this.setState({ selected: "pie" })
    }

    componentDidUpdate(prevProps) {
        //update the mode prop
        if (this.props.mode !== prevProps.mode) {
            this.setState({ mode: this.props.mode });
        }
    }

    render() {
        ChartJS.register(
            ArcElement,
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend,
            PointElement,
            LineElement,
        );
        
        if(this.props.view === "marketeer"){
            return(
                <div></div>
            )
        }

        if (this.state.selected === "bar") {
            return (
                <div className="page_body">
                    {/* <h1 className={this.state.mode + " product_name"}>Subsystem Loss Tracker</h1> */}
                    <div className="bottom_half_container">
                        <div className={this.props.mode + " the_data ui_box"}>
                            <Bar data={this.props.barData} options={this.props.barOptions} />
                        </div>
                        <div className={this.props.mode + " graph_selector"}>
                            <button className="graph_button" onClick={() => this.setState({ selected: "pie" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                                <p className="hide_before_hover">Pie Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => this.setState({ selected: "bar" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                                <p className="hide_before_hover">Bar Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => this.setState({ selected: "heat" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
                                <p className="hide_before_hover">Heat Map</p>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        // if (this.state.selected === "pie") {
        //     return (
        //         <div className="page_body">
        //             <h1 className={this.state.mode + " product_name"}>Subsystem Loss Tracker</h1>
        //             <div className="bottom_half_container">
        //                 <div className={this.props.mode + " the_data ui_box"}>
        //                     <Pie data={this.props.pieData} options={this.props.pieOptions} />
        //                 </div>
        //                 <div className={this.props.mode + " graph_selector"}>
        //                     <button className="graph_button" onClick={() => this.setState({ selected: "pie" })}>
        //                         <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
        //                         <p className="hide_before_hover">Pie Chart</p>
        //                     </button>
        //                     <button className="graph_button" onClick={() => this.setState({ selected: "bar" })}>
        //                         <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
        //                         <p className="hide_before_hover">Bar Chart</p>
        //                     </button>
        //                     <button className="graph_button" onClick={() => this.setState({ selected: "heat" })}>
        //                         <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
        //                         <p className="hide_before_hover">Heat Map</p>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        if (this.state.selected === "pie") {
            return (
                <div className="page_body">
                    {/* <h1 className={this.state.mode + " product_name"}>Subsystem Loss Tracker</h1> */}
                    <div className="bottom_half_container">
                        <div className={this.props.mode + " the_data ui_box"}>
                            <Pie data={this.props.pieData} options={this.props.pieOptions} />
                        </div>
                        <div className={this.props.mode + " graph_selector"}>
                            <button className="graph_button" onClick={() => this.setState({ selected: "pie" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                                <p className="hide_before_hover">Pie Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => this.setState({ selected: "bar" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                                <p className="hide_before_hover">Bar Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => this.setState({ selected: "heat" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
                                <p className="hide_before_hover">Heat Map</p>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.selected === "heat") {
            return (
                <div className="page_body">
                    {/* <h1 className={this.state.mode + " product_name"}>Subsystem Loss Tracker</h1> */}
                    <div className="bottom_half_container">
                        <div className={this.props.mode + " the_data ui_box"}>
                            <Heatmap heatMap={this.props.heatMap} />
                        </div>
                        <div className={this.props.mode + " graph_selector"}>
                            <button className="graph_button" onClick={() => this.setState({ selected: "pie" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                                <p className="hide_before_hover">Pie Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => this.setState({ selected: "bar" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                                <p className="hide_before_hover">Bar Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => this.setState({ selected: "heat" })}>
                                <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
                                <p className="hide_before_hover">Heat Map</p>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default PageBody;