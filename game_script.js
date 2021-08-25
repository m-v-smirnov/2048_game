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

function fieldRender(arr2d,elem) {
    if (!arr2d || !elem) return;
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = 0; j < arr2d[0].length; j++) {
            let item = arr2d[i][j];
            elem.rows[j].cells[i].style.backgroundColor = squareColors[item];
            if (item == 0) item = '';
            elem.rows[j].cells[i].innerHTML = item;
            
        }
    }
};

function getZerosPos(arr2d) {
    let result = [];
    let item;
    if (!arr2d) return result;
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = 0; j < arr2d[0].length; j++) {
            item = arr2d[i][j];
            if (item == 0) result.push([i,j]);
        }
    }
    return result;
}

function moveItemsToEdge(arr) {
    let tempArr = Array(arr.length).fill(0);
    let j = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != 0) {
        tempArr[j] = arr[i];
        j++;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i] = tempArr[i];
    }
}

function moveAllCellsUp(arr2d) {
    for (let i = 0; i < arr2d.length; i++) {
        moveItemsToEdge(arr2d[i]);
    } 
}

function moveAllCellsDown(arr2d) {
    for (let i = 0; i < arr2d.length; i++) {
        arr2d[i].reverse();
        moveItemsToEdge(arr2d[i]);
        arr2d[i].reverse();
    } 
}

function moveAllCellsLeft(arr2d) {
    let tempArr = new Array(arr2d.length);

    for (let j = 0; j < arr2d.length; j++) {
        for (let i = 0; i < arr2d.length; i++) {
            tempArr[i] = arr2d[i][j]; 
        }
    
        moveItemsToEdge(tempArr);

        for (let i = 0; i < arr2d.length; i++) {
            arr2d[i][j] = tempArr[i]; 
        }
    }
}

function moveAllCellsRight(arr2d) {
    let tempArr = new Array(arr2d.length);

    for (let j = 0; j < arr2d.length; j++) {
        for (let i = 0; i < arr2d.length; i++) {
            tempArr[i] = arr2d[i][j]; 
        }
        
        tempArr.reverse();
        moveItemsToEdge(tempArr);
        tempArr.reverse();
        
        for (let i = 0; i < arr2d.length; i++) {
            arr2d[i][j] = tempArr[i]; 
        }
    }
}

function insertRandomSquare(arr2d,item) {
    let pos = getZerosPos(arr2d);
    let index = Math.floor(Math.random() * pos.length);
    arr2d[pos[index][0]][pos[index][1]] = item;
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
    //event.preventDefault();
    switch (event.code) {
        case 'ArrowUp':
            //console.log('ArrowUp key down');
            moveAllCellsUp(gameArr);
            fieldRender(gameArr,fieldElem);
            break;
        case 'ArrowDown':
            //console.log('ArrowDown key down');
            moveAllCellsDown(gameArr);
            fieldRender(gameArr,fieldElem);
            break;
        case 'ArrowRight':
            //console.log('ArrowRight key down');
            moveAllCellsRight(gameArr);
            fieldRender(gameArr,fieldElem);
            break;
        case 'ArrowLeft':
            //console.log('ArrowLeft key down');
            moveAllCellsLeft(gameArr);
            fieldRender(gameArr,fieldElem);
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