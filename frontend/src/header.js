import React from 'react';
import axios from 'axios';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.findShips()
    }
    findShips(e){
        axios.get()
        
    }
    render() {
        return (
            <div id = "transparent" className="sevenrem">
                <nav className="navbar navbar-dark" id = "header">
                </nav>
            </div>
        )
    }

}

export default Header;