import React from 'react';
import Heatmap from './heat-map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            searchTable: {},
            searchResult: {}, // Added state to store the search result
            display: "hide",
        };
    }

    // Function to perform fuzzy search
    performFuzzySearch = (searchTerm) => {
        //if the searchTerm is blank then return an empty object
        if (searchTerm === "") {
            this.setState({ searchResult: {} });
            this.setState({ display: "hide" });
            return;
        }
        this.setState({ display: "show" });
        const searchData = {
            "Legion Core - Dissolution Sequencer": 45622,
            "Legion Core - Augmented Antimatter Reactor": 45623,
            "Legion Core - Energy Parasitic Complex": 45624,
            "Tengu Core - Electronic Efficiency Gate": 45625,
            "Tengu Core - Augmented Graviton Reactor": 45626,
            "Tengu Core - Obfuscation Manifold": 45627,
            "Proteus Core - Electronic Efficiency Gate": 45628,
            "Proteus Core - Augmented Fusion Reactor": 45629,
            "Proteus Core - Friction Extension Processor": 45630,
            "Loki Core - Dissolution Sequencer": 45631,
            "Loki Core - Augmented Nuclear Reactor": 45632,
            "Loki Core - Immobility Drivers": 45633,
            "Legion Defensive - Covert Reconfiguration": 45586,
            "Legion Defensive - Augmented Plating": 45587,
            "Legion Defensive - Nanobot Injector": 45588,
            "Tengu Defensive - Covert Reconfiguration": 45589,
            "Tengu Defensive - Supplemental Screening": 45590,
            "Tengu Defensive - Amplification Node": 45591,
            "Proteus Defensive - Covert Reconfiguration": 45592,
            "Proteus Defensive - Augmented Plating": 45593,
            "Proteus Defensive - Nanobot Injector": 45594,
            "Loki Defensive - Covert Reconfiguration": 45595,
            "Loki Defensive - Augmented Durability": 45596,
            "Loki Defensive - Adaptive Defense Node": 45597,
            "Legion Propulsion - Interdiction Nullifier": 45610,
            "Legion Propulsion - Intercalated Nanofibers": 45611,
            "Legion Propulsion - Wake Limiter": 45612,
            "Tengu Propulsion - Interdiction Nullifier": 45613,
            "Tengu Propulsion - Chassis Optimization": 45614,
            "Tengu Propulsion - Fuel Catalyst": 45615,
            "Proteus Propulsion - Interdiction Nullifier": 45616,
            "Proteus Propulsion - Hyperspatial Optimization": 45617,
            "Proteus Propulsion - Localized Injectors": 45618,
            "Loki Propulsion - Interdiction Nullifier": 45619,
            "Loki Propulsion - Intercalated Nanofibers": 45620,
            "Loki Propulsion - Wake Limiter": 45621,
            "Legion Offensive - Liquid Crystal Magnifiers": 45598,
            "Legion Offensive - Assault Optimization": 45599,
            "Legion Offensive - Support Processor": 45600,
            "Tengu Offensive - Accelerated Ejection Bay": 45601,
            "Tengu Offensive - Magnetic Infusion Basin": 45602,
            "Tengu Offensive - Support Processor": 45603,
            "Proteus Offensive - Hybrid Encoding Platform": 45604,
            "Proteus Offensive - Drone Synthesis Projector": 45605,
            "Proteus Offensive - Support Processor": 45606,
            "Loki Offensive - Projectile Scoping Array": 45607,
            "Loki Offensive - Launcher Efficiency Configuration": 45608,
            "Loki Offensive - Support Processor": 45609
        };

        const searchResult = {};
        for (const [name, id] of Object.entries(searchData)) {
            if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchResult[name] = id;
            }
        }

        this.setState({ searchResult });
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
        return (
            <div className="header">
                <header className="main-header nav nav-dark">
                    <div className='navAnchors'>
                        <a className={this.props.mode + " header_anchor"} href="/">EveSubsystemAnalytics <span className='version_span gray'>(V. 1.0.0)</span></a>
                        <a className={this.props.mode + " header_anchor"} href="/about/">About</a>
                    </div>
                    <div className={this.props.mode + " input_addornments"}>
                        <input
                            className={this.props.mode + " header_search"}
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => this.performFuzzySearch(e.target.value)} // Call fuzzy search function on input change
                        />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </header>
                {/* Display the search result */}
                <div className="results_container">
                    <table>
                        <thead>
                            <tr>
                                {/* <th className={this.state.display}>Name</th> */}
                                {/* <th className = {this.state.display}>ID</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(this.state.searchResult).map(([name, id]) => (
                                <tr key={id}>
                                    <td><a className = "results_anchor" href={`/subsystems/${id}/`}>{name}</a></td>
                                    {/* <td>{name}</td> */}
                                    {/* <td>{id}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Header;
