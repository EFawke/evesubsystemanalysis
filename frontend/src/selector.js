//import statements
import React from 'react';
import SubsystemsTable from './subsystemsTable.js';
import Cookies from 'js-cookie';
import ModeSelector from './modeSelector.js';
import GraphTypeSelector from './GraphTypeSelector.js';
import MarketSelector from './marketSelector.js';
import ProfessionSelector from './userProfession.js';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships: null,
            isLoaded: false,
            openNav: this.props.openNav,
            // industrialist: Cookies.get('industrialist') === undefined || Cookies.get('industrialist') === "true" ? true : false,
            // marketeer: Cookies.get('marketeer') === undefined || Cookies.get('marketeer') === "false" ? false : true,
            // dark: Cookies.get('dark') === undefined || Cookies.get('dark') === "true" ? true : false,
            // light: Cookies.get('light') === undefined || Cookies.get('light') === "false" ? false : true,
            // jita: Cookies.get('jita') === undefined || Cookies.get('jita') === "true" ? true : false,
            // amarr: Cookies.get('amarr') === undefined || Cookies.get('amarr') === "false" ? false : true,
            // units_destroyed: Cookies.get('units_destroyed') === undefined || Cookies.get('units_destroyed') === "true" ? true : false,
            // market_info: Cookies.get('market_info') === undefined || Cookies.get('market_info') === "false" ? false : true,
        }
    }

    //add a method that checks if openNav has been changed
    componentDidUpdate(prevProps) {
        if (this.props.openNav !== prevProps.openNav) {
            this.setState({ openNav: this.props.openNav });
        }
    }    

    render() {
        if (this.state.openNav) {
            return (
                <div className="selector_container">
                    <h1 className='table_header'>Subsystems List</h1>
                    <SubsystemsTable />
                    <h1 className='table_header table_settings'>Settings</h1>
                    <div className="display_option">
                        <div className="setting_column">
                            <h2 className="setting_header">Use Case:</h2>
                            <h3 className="setting_description">(Used in tailoring your market analysis)</h3>
                            <ProfessionSelector />
                        </div>
                        <div className="setting_column">
                            <h2 className="setting_header">Color Scheme:</h2>
                            <h3 className="setting_description">(Dark mode is recommended)</h3>
                            <ModeSelector />
                        </div>
                        <div className="setting_column">
                            <h2 className="setting_header">Market Hub:</h2>
                            <h3 className="setting_description">(Where you do most of your trading)</h3>
                            <MarketSelector />
                        </div>
                        <div className="setting_column">
                            <h2 className="setting_header">Data View:</h2>
                            <h3 className="setting_description">(Changes the graphs that are displayed)</h3>
                            <GraphTypeSelector />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="hidden"></div>
            )
        }
    }
}

//export the class
export default Selector;