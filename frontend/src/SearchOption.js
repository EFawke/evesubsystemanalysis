import React from 'react';

class SearchOption extends React.Component {
    render() {
        return (
            <option>{this.props.option}</option>
        )
    }
}

export default SearchOption;