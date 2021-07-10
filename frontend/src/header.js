import React from 'react';
import github from './github.png'

class Header extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-dark bg-dark">
                <div class="dropdown">
                <button class="dropbtn">Rage Roller</button>
                <div class="dropdown-content">
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
                <a className = 'weightless' href = 'https://github.com/EFawke/rage-roll'><img className = "image" src = {github} alt = "github"/></a>
                </nav>
            </div>
        )
    }
}

export default Header;