// import React from 'react'
// import axios from 'axios';

// class HoverInfo extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             hour: this.props.hour,
//             day: this.props.day,
//             ship: this.props.ship
//         }
//     }

//     queryDatabase(){
//         axios.get(`/api/hoverRouter/${this.state.day}/${this.state.hour}/${this.state.ship}`)
//         .then(response => {
//           console.log(response)
//         }).then(() => {
//            this.setState({isLoaded: true})
//         })
//     }

//     render(){
//         return (
//             <div>
//                 <div className = "hoverBox">
//                     <p>moop</p>
//                     <p>doop</p>
//                 </div>
//             </div>
//         )
//     }
// }

// export default HoverInfo;