//import statements
import React from 'react';

//write a React class which displays a table with all 4 tech 3 cruisers (Loki, Tengu, Proteus, Legion) and their subsystems.
class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships: null,
            isLoaded: false
        }
    }
    //render a table. The table should have 4 columns. One for each tech 3 cruiser (Loki, Tengu, Proteus, Legion). Under the cruiser name there should be a list of all the subsystems for that cruiser, ordered by whether they are a defensive, offensive, core or propulsion subsystem. The subsystems should be links to the heat map for that subsystem.
    render() {
        return (
            <div className="selector-container">
                <table className = "data-table">
                    <tr>
                        <th>Loki</th>
                        <th>Tengu</th>
                        <th>Proteus</th>
                        <th>Legion</th>
                    </tr>
                    <tr>
                        <td id = "45595">Loki Defensive - Covert Reconfiguration</td>
                        <td id = "45589">Tengu Defensive - Covert Reconfiguration</td>
                        <td id = "45592">Proteus Defensive - Covert Reconfiguration</td>
                        <td id = "45586">Legion Defensive - Covert Reconfiguration</td>
                    </tr>
                    <tr>
                        <td id = "45596">Loki Defensive - Augmented Durability</td>
                        <td id = "45590">Tengu Defensive - Supplemental Screening</td>
                        <td id = "45593">Proteus Defensive - Augmented Plating</td>
                        <td id = "45587">Legion Defensive - Augmented Plating</td>
                    </tr>
                    <tr>
                        <td id = "45597">Loki Defensive - Adaptive Defense Node</td>
                        <td id = "45591">Tengu Defensive - Amplification Node</td>
                        <td id = "45594">Proteus Defensive - Nanobot Injector</td>
                        <td id = "45588">Legion Defensive - Nanobot Injector</td>
                    </tr>
                    <tr>
                        <td id = "45607">Loki Offensive - Projectile Scoping Array</td>
                        <td id = "45601">Tengu Offensive - Accelerated Ejection Bay</td>
                        <td id = "45604">Proteus Offensive - Hybrid Encoding Platform</td>
                        <td id = "45598">Legion Offensive - Liquid Crystal Magnifiers</td>
                    </tr>
                    <tr>
                        <td id = "45608">Loki Offensive - Launcher Efficiency Configuration</td>
                        <td id = "45602">Tengu Offensive - Magnetic Infusion Basin</td>
                        <td id = "45605">Proteus Offensive - Drone Synthesis Projector</td>
                        <td id = "45599">Legion Offensive - Assault Optimization</td>
                    </tr>
                    <tr>
                        <td id = "45609">Loki Offensive - Support Processor</td>
                        <td id = "45603">Tengu Offensive - Support Processor</td>
                        <td id = "45606">Proteus Offensive - Support Processor</td>
                        <td id = "45600">Legion Offensive - Support Processor</td>
                    </tr>
                    <tr>
                        <td id = "45631">Loki Core - Dissolution Sequencer</td>
                        <td id = "45625">Tengu Core - Electronic Efficiency Gate</td>
                        <td id = "45628">Proteus Core - Electronic Efficiency Gate</td>
                        <td id = "45622">Legion Core - Dissolution Sequencer</td>
                    </tr>
                    <tr>
                        <td id = "45632">Loki Core - Augmented Nuclear Reactor</td>
                        <td id = "45626">Tengu Core - Augmented Graviton Reactor</td>
                        <td id = "45629">Proteus Core - Augmented Fusion Reactor</td>
                        <td id = "45623">Legion Core - Augmented Antimatter Reactor</td>
                    </tr>
                    <tr>
                        <td id = "45633">Loki Core - Immobility Drivers</td>
                        <td id = "45627">Tengu Core - Obfuscation Manifold</td>
                        <td id = "45630">Proteus Core - Friction Extension Processor</td>
                        <td id = "45624">Legion Core - Energy Parasitic Complex</td>
                    </tr>
                    <tr>
                        <td id = "45619">Loki Propulsion - Interdiction Nullifier</td>
                        <td id = "45613">Tengu Propulsion - Interdiction Nullifier</td>
                        <td id = "45616">Proteus Propulsion - Interdiction Nullifier</td>
                        <td id = "45610">Legion Propulsion - Interdiction Nullifier</td>
                    </tr>
                    <tr>
                        <td id = "45620">Loki Propulsion - Intercalated Nanofibers</td>
                        <td id = "45614">Tengu Propulsion - Chassis Optimization</td>
                        <td id = "45617">Proteus Propulsion - Hyperspatial Optimization</td>
                        <td id = "45611">Legion Propulsion - Intercalated Nanofibers</td>
                    </tr>
                    <tr>
                        <td id = "45621">Loki Propulsion - Wake Limiter</td>
                        <td id = "45615">Tengu Propulsion - Fuel Catalyst</td>
                        <td id = "45618">Proteus Propulsion - Localized Injectors</td>
                        <td id = "45612">Legion Propulsion - Wake Limiter</td>
                    </tr>
                </table>
            </div>
        )
    }
}

//export the class
export default Selector;