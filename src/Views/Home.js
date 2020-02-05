import React, { Component } from 'react'
import FirstComponent from '../Component/FirstComponent'
import Draw from '../Component/Draw'
export default class Home extends Component {
 state = { boxes:5,
    text:"Hello Rehman", }
  handleBoxChange = (rockstar) => {
  this.setState({boxes:rockstar.target.value});  }
  handleTextChange = (newstar) => {
    this.setState({text:newstar.target.value})}
  render() {
    return (<div> <FirstComponent 
     valueBox={this.state.boxes}
      valueText={this.state.text}
        handlerBox={this.handleBoxChange}
         handlerText={this.handleTextChange}/>
        <Draw   ubaid={this.props.rehmanName} 
         boxes={this.state.boxes} 
         text={this.state.text}></Draw></div>
    )
  }
}
