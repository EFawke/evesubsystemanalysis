import React from 'react';
import github from './github.png'

class Header extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                <div className="dropdown">
                <button className="dropbtn">Ships</button>
                <div className="dropdown-content">
                    <a href="/Golem/">Golem</a>
                    <a href="/Paladin/">Paladin</a>
                    <a href="/Vargur/">Vargur</a>
                    <a href="/Kronos/">Kronos</a>
                    <a href="/Revelation/">Revelation</a>
                    <a href="/Phoenix/">Phoenix</a>
                    <a href="/Moros/">Moros</a>
                    <a href="/Naglfar/">Naglfar</a>
                    <a href="/Gila/">Gila</a>
                    <a href="/Praxis/">Praxis</a>
                    <a href="/Nestor/">Nestor</a>
                    <a href="/Leshak/">Leshak</a>
                    <a href="/Rattlesnake/">Rattlesnake</a>
                    <a href="/Heron/">Heron</a>
                </div>
            </div>
                <h1 className = "Name">Rage Roll</h1>
                <a className = 'weightless' href = '#'><img className = "image" src = {github} alt = "github"/></a>
                </nav>
            </div>
        )
    }
}

export default Header;