import React from 'react';
import github from './github.png'
import $ from 'jquery';
import axios from 'axios';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.findShips()
    }
    findShips(e){
        const query = $('#shipDataList').val()
        axios.get()
        
    }
    render() {
        return (
            <div id = "transparent" className="sevenrem">
                <nav className="navbar navbar-dark" id = "header">
                <a className = 'weightless' href = '#'><img className = "image" src = {github} alt = "github"/></a>
                </nav>
            </div>
        )
    }

}

export default Header;