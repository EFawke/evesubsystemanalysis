import React from 'react';
import Header from './header';

class FauxHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="sevenrem bg-dark">
                <nav className='navbar navbar-dark bg-dark' id = "fauxheader">
                    <h1 className = "Name">Rage Roll</h1>
                </nav>
                <Header />
            </div>
        )
    }

}

export default FauxHeader;