import React, { Component } from 'react'
export default class UserOne extends Component {
    state = {
        userName:"Rehman",
      }  
    render() {
        return (
            <div>
            <div>
            <div className="row">
            <div className="col-md-3 bg-info">
            {this.props.mainName}</div>
            <div className="col-md-3 bg-danger">
            <input type="text" 
            onChange={this.props.handlerName}
             value={this.props.mainName} 
             id=""/>
            </div>
            </div>    
            </div>   
            </div>
        )
    }
}
