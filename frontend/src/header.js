import React from 'react';
import github from './github.png'

class Header extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                <div className="dropdown">
                <button className="dropbtn">Rage Roller</button>
                <div className="dropdown-content">
                    <a href="/Marauders">Marauders</a>
                    <a href="/Dreadnoughts">Dreadnoughts</a>
                    <a href="/AllC5RattingShips">All C5 Ratting Ships</a>
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
                <a className = 'weightless' href = 'https://github.com/EFawke/rage-roller'><img className = "image" src = {github} alt = "github"/></a>
                </nav>
            </div>
        )
    }
}

export default Header;