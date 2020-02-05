import React, { Component } from 'react'
export default class Draw extends Component {
    helperRender=() => {  
        let UI=[];
   for (let index = 0; index < this.props.boxes; index++) {
    UI.push( <div className="row">
    <div className="col-md-3">
    {this.props.text} {this.props.ubaid} </div>
    <div className="col-md-1 bg-danger">space</div>
    <div className="col-md-3">{this.props.text} 
    {this.props.ubaid}</div>
    <div className="col-md-2 bg-danger">space</div>
    <div className="col-md-3">
    {this.props.text} {this.props.ubaid}</div>
    </div> );
   }
   return UI;
    }
    render() {
        return (     
            <div>{this.helperRender()}</div>          
        );
    }
}
