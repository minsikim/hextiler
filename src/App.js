import React, {Component}from 'react';
import Slider, { Range } from 'rc-slider';

import HexTile from './Components/HexTile/HexTile';

import './App.css';
import 'rc-slider/assets/index.css';

function getHexX(c){

  let xAmount = 0;
  const xDistance = 0.5 * Math.sqrt(3);

  let layer = c[0];
  let nth = c[1];
	
  let hexPoints = [];
  if(layer !== 0){
    for(var i = 0; i <= 6; i++){
      hexPoints.push(i * layer);
    }
  }
  if(nth === 0 || nth === layer * 6 / 2){
    xAmount = 0;
  }else if(hexPoints[1] <= nth && nth <= hexPoints[2]){
    xAmount = layer;
  }else if(hexPoints[4] <= nth && nth <= hexPoints[5]){
    xAmount = -layer;
  }else if(hexPoints[0] < nth && nth < hexPoints[1]){
    xAmount = nth;
  }else if(hexPoints[2] < nth && nth < hexPoints[3]){
    xAmount = -(nth - hexPoints[3]);
  }else if(hexPoints[3] < nth && nth < hexPoints[4]){
    xAmount = -(nth - hexPoints[3]);
  }else if(hexPoints[5] < nth && nth < hexPoints[6]){
    xAmount = nth - hexPoints[6];
  }

  return xAmount * xDistance;
}

function getHexY(c){
  let yAmount = 0;

  let layer = c[0];
  let nth = c[1];

  let hexPoints = [];
  if(layer !== 0){
    for(var i = 0; i <= 6; i++){
      hexPoints.push(i * layer);
    }
  }

  if(layer % 2 === 0){
    if(nth === layer * 6 / 4 || nth === layer * 6 * 3 / 4){
      yAmount = 0;
    }else if(hexPoints[0] === nth){
      yAmount = layer;
    }else if(hexPoints[3] === nth){
      yAmount = -layer;
    }else if(hexPoints[1] <= nth && nth <= hexPoints[2]){
      yAmount = - ( nth - ( layer * 6 / 4 ) );
    }else if(hexPoints[4] <= nth && nth <= hexPoints[5]){
      yAmount = nth - ( layer * 6 * 3 / 4 );
    }else if(hexPoints[0] < nth && nth < hexPoints[1]){
      yAmount =  (-(nth - hexPoints[1])) * 0.5 + layer / 2;
    }else if(hexPoints[2] < nth && nth < hexPoints[3]){
      yAmount = -((nth - hexPoints[2]) * 0.5 + layer / 2);
    }else if(hexPoints[3] < nth && nth < hexPoints[4]){
      yAmount = -((hexPoints[4] -nth) * 0.5 + layer / 2);
    }else if(hexPoints[5] < nth && nth < hexPoints[6]){
      yAmount = ((nth - hexPoints[5])) * 0.5 + layer / 2;
    }
  }else{
    if(nth === layer * 6 / 4 || nth === layer * 6 * 3 / 4){
      yAmount = 0;
    }else if(hexPoints[0] === nth){
      yAmount = layer;
    }else if(hexPoints[3] === nth){
      yAmount = -layer;
    }else if(hexPoints[1] <= nth && nth <= hexPoints[2]){
      yAmount = - ( nth - ( layer * 6 / 4 ) );
    }else if(hexPoints[4] <= nth && nth <= hexPoints[5]){
      yAmount = nth - ( layer * 6 * 3 / 4 );
    }else if(hexPoints[0] < nth && nth < hexPoints[1]){
      yAmount =  (-(nth - hexPoints[1])) * 0.5 + layer / 2;
    }else if(hexPoints[2] < nth && nth < hexPoints[3]){
      yAmount = -((nth - hexPoints[2]) * 0.5 + layer / 2);
    }else if(hexPoints[3] < nth && nth < hexPoints[4]){
      yAmount = -((hexPoints[4] -nth) * 0.5 + layer / 2);
    }else if(hexPoints[5] < nth && nth < hexPoints[6]){
      yAmount = ((nth - hexPoints[5])) * 0.5 + layer / 2;
    }
  }

  return yAmount;
}

class App extends Component{

  state = {
    tileArray: [],
    hexType: "round",
    size: 7,
    density: 100,
    generateOnChange: true
  }

  genHexTiles = () => {
    let arr = [];

    let type = this.state.hexType;
    let size = this.state.size;
  
    if(type === "round"){
      for(var i = 0; size > i; i++){
        for(var j = 0; (i * 6) + 1 > j; j++){
          arr.push({
            coordinates : [i, j],
            x: getHexX([i, j]),
            y : getHexY([i, j])
          })
        }
      }
    }
    return arr;
  }

  randomDelete = (array) => {
    let tempArr = array ? array : this.state.tileArray;
    let tempLength = tempArr.length;
    for(var i = 0; i < tempLength * (100 - this.state.density) / 100; i++){
      console.log(tempArr.length);
      tempArr.splice(Math.floor(Math.random()*tempArr.length), 1);
    }
    return tempArr;
  }

  updateTileArray = () => {
    let array = this.genHexTiles();
    this.setState((prevState)=>{
      if(prevState.tileArray !== array){
        return{
          tileArray: array
        }
      }
    })
  }

  changeHiveSize = (val)=>{
    if(val && this.state.size !== val-1) this.setState({size: val-1})
    if(this.state.generateOnChange) this.updateTileArray();
  }
  changeDensity = (val)=>{
    if(val && this.state.density !== val) this.setState({density: val})
    if(this.state.generateOnChange) this.updateTileArray();
  }

  componentDidMount(){
    this.updateTileArray()
  }

  render(){
    let tempArray = this.state.tileArray;
    let tiles =  this.randomDelete(tempArray).map((obj, idx)=>{
      return <HexTile data={obj} key={idx} img={"hex-05.png"}/>
    })
    
    return (
      <div className="App">
        <div className="HexTileWrapper" id="HexTileWrapper">
          {tiles}
        </div>
        <div className="Controller">
          <div className="CustomRanges">
              <p>Hive Size : {this.state.size}</p>
              <Slider id="SliderSize" min={0} max={30} defaultValue={7} tipFormatter={value => `${value}`} 
                  onChange={this.changeHiveSize}
                  marks={{0:"0", 10:"10", 20:"20", 30:"30"}}/>
          </div>
          <div className="CustomRanges">
              <p>Density : {this.state.desity}</p>
              <Slider id="SliderDensity" min={0} max={100} defaultValue={100} tipFormatter={value => `${value}%`} 
                  onChange={this.changeDensity}
                  marks={{0:"0", 25:"25", 50:"50", 75:"75", 100:"100"}}/>
          </div>
          <button onClick={this.updateTileArray}>Generate</button>
        </div>
        
      </div>
    );
  }

}

export default App;