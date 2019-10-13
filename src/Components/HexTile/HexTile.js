import React, {Component} from 'react';

import './HexTile.css';

class hexTile extends Component {
    size = 30;
    x = this.props.data.x;
    y = this.props.data.y;
    idValue = "hex-" + this.x + this.y;
    styles = { 
        transform: `translate(${this.x*this.size}px, ${this.y*this.size}px)`,
        width: this.size-2,
        height: this.size-2,
        borderRadius: this.size
    };

    render(){
        return (
            <div className="HexTile" id={this.idValue} style={this.styles}>
        
            </div>
          );
    }
}

export default hexTile;
