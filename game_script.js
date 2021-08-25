"use strict";

let gameArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let fieldElem = document.getElementById('table');
let squareColors = {
    0: 'lightgrey',
    2: 'aquamarine',
    4: 'aqua',
    8: 'chartreuse',
    16: 'cornflowerblue',
    32: 'chocolate',
    64: 'crimson',
    128: 'orange',
    256: 'yellow',
    512: 'blue',
    1024: 'red',
    2048: 'greenyellow',
}
//gameArr.forEach(function(item, index, array) {
//    console.log(item);
//});

function fieldRender(arr,elem) {
    if (!arr || !elem) return;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            let item = arr[i][j];
            elem.rows[j].cells[i].style.backgroundColor = squareColors[item];
            if (item == 0) item = '';
            elem.rows[j].cells[i].innerHTML = item;
            
        }
    }
};

function getZerosPos(arr) {
    let result = [];
    let item;
    if (!arr) return result;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            item = arr[i][j];
            if (item == 0) result.push([i,j]);
        }
    }
    return result;
}

function insertRandomSquare(arr,item) {
    let pos = getZerosPos(arr);
    let index = Math.floor(Math.random() * pos.length);
    arr[pos[index][0]][pos[index][1]] = item;
}

function newGame() {
    if (!gameArr) return result;
    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[0].length; j++) {
            gameArr[i][j] = 0;
        }
    }
    insertRandomSquare(gameArr,2);
    insertRandomSquare(gameArr,2);
    fieldRender(gameArr,fieldElem);
}


document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowUp':
            //console.log('ArrowUp key down');
            break;
        case 'ArrowDown':
            //console.log('ArrowDown key down');
            break;
        case 'ArrowRight':
            //console.log('ArrowRight key down');
            break;
        case 'ArrowLeft':
            //console.log('ArrowLeft key down');
            break;
    
        default:
            break;
    }
});
document.addEventListener('click', function(event) {
    if (event.target.dataset.start != undefined) {
        newGame();

    }
});

insertRandomSquare(gameArr,2);
insertRandomSquare(gameArr,4);
insertRandomSquare(gameArr,8);
insertRandomSquare(gameArr,16);
insertRandomSquare(gameArr,32);
insertRandomSquare(gameArr,64);
insertRandomSquare(gameArr,128);
insertRandomSquare(gameArr,256);
insertRandomSquare(gameArr,512);
insertRandomSquare(gameArr,1024);
insertRandomSquare(gameArr,2048);
//newGame();

//console.log(getZerosPos(gameArr));
//gameArr.forEach(function(item, index, array) {
//    console.log(item);
//});

fieldRender(gameArr,fieldElem);