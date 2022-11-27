import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import SearchOption from './SearchOption';

class SearchDiv extends React.Component {
    constructor(props){
        super(props);
        this.findShips = this.findShips.bind(this);
        this.state = {
            query: null,
            isLoaded: false,
            nameArr: null,
            idArr: null,
        };
    }
    findShips(e){
        const query = $('#shipDataList').val()
        if(query === ""){
            this.setState({isLoaded: false})
            this.setState({nameArr: null});
        } else {
            axios.get(`/api/Lookup/${query}`)
            .then(res => {
                let names = []
                let ids = []
                for(let i = 0; i < res.data.length; i ++){
                    names.push(res.data[i].ship_class_name)
                    ids.push(res.data[i].ship_class_id)
                }
                this.setState({idArr: ids})
                this.setState({nameArr: names})
                this.setState({isLoaded: true})
            })
        }
    }
    render() {
        if(!this.state.isLoaded){
            return (
                <div className = "ui-component">
                    <input className="form-control" list="datalistOptions" id="shipDataList" placeholder="Search ships..." onKeyUp={this.findShips}></input>
                </div>
            )
        } else {
            return (
                <div className = "ui-component">
                    <input className="form-control" list="datalistOptions" id="shipDataList" placeholder="Search ships..." onKeyUp={this.findShips}></input>
                    <datalist id="datalistOptions">
                        <SearchOption id = {this.state.idArr[0]} option = {this.state.nameArr[0]}/>
                        <SearchOption id = {this.state.idArr[1]} option = {this.state.nameArr[1]}/>
                        <SearchOption id = {this.state.idArr[2]} option = {this.state.nameArr[2]}/>
                        <SearchOption id = {this.state.idArr[3]} option = {this.state.nameArr[3]}/>
                        <SearchOption id = {this.state.idArr[4]} option = {this.state.nameArr[4]}/>
                    </datalist>
                </div>
            )
        }
    }
}

export default SearchDiv;