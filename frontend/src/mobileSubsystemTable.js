import React from "react";

class MobileSubsystemsTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mobile-subsystems-table">
                <table>
                    <thead>
                        <tr>
                            <th>Subsystem</th>
                            <th>Losses</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.subsystems.map((subsystem, index) => {
                            return (
                                <tr key={index}>
                                    <td>{subsystem.name}</td>
                                    <td>{subsystem.losses}</td>
                                    <td>{subsystem.value}</td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                        
                </table>
            </div>
            
        )
    }
}

export default MobileSubsystemsTable;