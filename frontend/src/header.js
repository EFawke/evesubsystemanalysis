import React from 'react';
import Heatmap from './heat-map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'


class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <header className="main-header navbar navbar-dark">
                    <div className='navAnchors'>
                    <a className="header_anchor" href="/">EveSubsystemAnalytics</a>
                    <a className="header_anchor" href="/about/">About</a>
                    </div>
                    <div className='input_addornments'>
                        <input className="header_search" type="text" placeholder="Search... " />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    {/* <Heatmap heatMap={this.props.heatMap} /> */}
                </header>
            </div>
        )
    }

}

export default Header;