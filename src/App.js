import React from 'react';

import HexTile from './Components/HexTile/HexTile';

import './App.css';

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

function App() {

  let arr = [];

  let type = "round";
  let size = 7;

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

  // for(var i = 0; i < arr.length / 1.1; i++){
  //   arr.splice(Math.floor(Math.random()*arr.length), 1);
  // }

  let tiles =  arr.map((obj, idx)=>{
    return <HexTile data={obj} key={idx}/>
  })


  return (
    <div className="App">
      <div className="HexTileWrapper" id="HexTileWrapper">
        {tiles}
      </div>
    </div>
  );
}

export default App;