import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class SearchDiv extends React.Component {
    constructor(props){
        super(props);
        this.findShips()
    }
    findShips(e){
        const query = $('#shipDataList').val()
        axios.get(`https://esi.evetech.net/latest/search/?categories=inventory_type&datasource=tranquility&language=en&search=${query}&strict=false`)
            .catch(err => {
                console.log(err)
            })
            .then(res => {
                if(!res){
                    return
                } else {
                    console.log(res.data)
                }
            })
        
    }
    render() {
        return (
            <div class = "ui-component">
                <input class="form-control" list="datalistOptions" id="shipDataList" placeholder="Search ships..." onKeyDown={this.findShips}></input>
                <datalist id="datalistOptions">
                    <option value = "hi"></option>
                </datalist>
            </div>
        )
    }

}

export default SearchDiv;