import React, { Component } from 'react'
export default class FirstComponent extends Component {
    render() {
        return (
            <div className="container">
              <div className="title-box bg-primary">
<h1>Please Enter the number of Box you want to  </h1></div>
         ]<div className="form-group">
              <label htmlFor="">Number of boxes</label> 
                <input type="number"  
                onChange={this.props.handlerBox}
                 value={this.props.valueBox}/>
                  </div>
   <div className="form-group">
    <label htmlFor="">Text inside the Box</label>
     <input type="text" 
                 onChange={this.props.handlerText}
                  value={this.props.valueText}/>
                  </div> 
            </div>  
        );
    }
}
