import React, {Component} from 'react';

import './HexTile.css';

class hexTile extends Component {
    sizeX = 50;
    sizeY = 50;
    x = this.props.data.x;
    y = this.props.data.y;
    idValue = "hex-" + this.x + this.y;
    styles = { 
        transform: `translate(${this.x*this.sizeX}px, ${this.y*this.sizeY}px)`,
        width: this.sizeX,
        height: this.sizeY,
        borderRadius: this.sizeX,
        boxSizing: 'border-box'
    };
    noneImgStyles = {
        backgroundColor: `rgba(${Math.random() * 50 + 205},${Math.random() * 35 + 180},${Math.random() * 50}, 0.3)`,
        border: `1px solid rgba(${Math.random() * 50 + 205},${Math.random() * 35 + 180},${Math.random() * 50}, 0.8)`,
    };
    imgStyle = {
        width: this.sizeY,
        height: this.sizeY
    }

    render(){
        return (
            <div className="HexTile" id={this.idValue} style={!this.props.img ? {...this.noneImgStyles, ...this.styles} : this.styles}>
                {this.props.img ? <img src={require('../../Assets/img/'+this.props.img)} style={this.imgStyle}/> : null}
            </div>
          );
    }
}

export default hexTile;
