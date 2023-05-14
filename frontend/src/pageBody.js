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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarChart } from '@fortawesome/free-solid-svg-icons'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faPlaneCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import Heatmap from './heat-map';

class PageBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            heatMap: this.props.heatMap,
            graph: this.props.graph,
            pie: this.props.pieChart,
            selected: "pie",
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
            Legend
        );
        if (this.state.selected === "bar") {
            return (
                <div className="page_body">
                    {/* <div className="graph_selector" id="data_mode">
                        <button className="graph_button data_mode_buttons" onClick={() => {
                            this.setState({ mode: "demand" });
                        }}>
                            <FontAwesomeIcon className="icon_svg" icon={faPlaneCircleXmark} size="lg" />
                            <p className="hide_before_hover">Demand</p>
                        </button>
                        <button className="graph_button data_mode_buttons" onClick={() => {
                            this.setState({ mode: "price_history" });
                        }}>
                            <FontAwesomeIcon className="icon_svg" icon={faArrowTrendUp} size="lg" />
                            <p className="hide_before_hover">Market</p>
                        </button>
                    </div> */}
                    <div className="bottom_half_container">
                        <div className="the_data ui_box">
                            <Bar data={this.props.barData} options={this.props.barOptions} />
                        </div>
                        <div className="graph_selector">
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "pie" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                                <p className="hide_before_hover">Pie Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "bar" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                                <p className="hide_before_hover">Bar Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "heat" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
                                <p className="hide_before_hover">Heat Map</p>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.selected === "pie") {
            return (
                <div className="page_body">
                    {/* <div className="graph_selector" id="data_mode">
                        <button className="graph_button data_mode_buttons" onClick={() => {
                            this.setState({ mode: "demand" });
                        }}>
                            <FontAwesomeIcon className="icon_svg" icon={faPlaneCircleXmark} size="lg" />
                            <p className="hide_before_hover">Demand</p>
                        </button>
                        <button className="graph_button data_mode_buttons" onClick={() => {
                            this.setState({ mode: "price_history" });
                        }}>
                            <FontAwesomeIcon className="icon_svg" icon={faArrowTrendUp} size="lg" />
                            <p className="hide_before_hover">Market</p>
                        </button>
                    </div> */}
                    <div className="bottom_half_container">
                        <div className="the_data ui_box">
                            <Pie data={this.props.pieData} options={this.props.pieOptions} />
                        </div>
                        <div className="graph_selector">
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "pie" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                                <p className="hide_before_hover">Pie Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "bar" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                                <p className="hide_before_hover">Bar Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "heat" });
                            }}>
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
                    <div className="bottom_half_container">
                        <div className="the_data ui_box">
                            <Heatmap heatMap={this.props.heatMap} />
                        </div>
                        <div className="graph_selector">
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "pie" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faPieChart} size="lg" />
                                <p className="hide_before_hover">Pie Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "bar" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faBarChart} size="lg" />
                                <p className="hide_before_hover">Bar Chart</p>
                            </button>
                            <button className="graph_button" onClick={() => {
                                this.setState({ selected: "heat" });
                            }}>
                                <FontAwesomeIcon className="icon_svg" icon={faCalendarDays} size="lg" />
                                <p className="hide_before_hover">Heat Map</p>
                            </button>
                        </div>
                    </div>
                    {/* <div className="graph_selector" id="data_mode">
                        <button className="graph_button data_mode_buttons" onClick={() => {
                            this.setState({ mode: "demand" });
                        }}>
                            <FontAwesomeIcon className="icon_svg" icon={faPlaneCircleXmark} size="lg" />
                            <p className="hide_before_hover">Demand</p>
                        </button>
                        <button className="graph_button data_mode_buttons" onClick={() => {
                            this.setState({ mode: "price_history" });
                        }}>
                            <FontAwesomeIcon className="icon_svg" icon={faArrowTrendUp} size="lg" />
                            <p className="hide_before_hover">Market</p>
                        </button>
                    </div> */}
                </div>
            )
        }
    }
}

export default PageBody;