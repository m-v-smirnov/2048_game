"use strict";

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

function cellMoveEnable(arr2d,elem) {
    let zeros = getZerosPos(arr2d);
    let horizMoveEnable = false;
    let vertMoveEnable = false;
    if (zeros.length > 0) {
        return true;
    }
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = 1; j < arr2d[0].length; j++) {
            vertMoveEnable = vertMoveEnable || (arr2d[i][j] == arr2d[i][j-1]);
        }
    }
    for (let j = 0; j < arr2d[0].length; j++) {
        for (let i = 1; i < arr2d.length; i++) {
            horizMoveEnable = horizMoveEnable || (arr2d[i][j] == arr2d[i-1][j]);
        }
    }
    if (!horizMoveEnable && !vertMoveEnable) {
        let event = new Event("gameover");
        elem.dispatchEvent(event);
    }
    return (horizMoveEnable || vertMoveEnable);

}

function mergeEqualCellsLeft(arr2d) {
    for (let j = 0; j < arr2d.length; j++) {
        for (let i = 1; i < arr2d.length; i++) {
            if (arr2d[i][j] == arr2d[i-1][j]) {
                arr2d[i][j] = 0;
                arr2d[i-1][j] *= 2;
                computeScore(arr2d[i-1][j]);
            }
        }
    }
}
function mergeEqualCellsRight(arr2d) {
    for (let j = 0; j < arr2d.length; j++) {
        for (let i = arr2d.length-1; i > 0; i--) {
            if (arr2d[i][j] == arr2d[i-1][j]) {
                arr2d[i-1][j] = 0;
                arr2d[i][j] *= 2;
                computeScore(arr2d[i][j]);
            }
        }
    }
}
function mergeEqualCellsUp(arr2d) {
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = 1; j < arr2d.length; j++) {
            if (arr2d[i][j] == arr2d[i][j-1]) {
                arr2d[i][j] = 0;
                arr2d[i][j-1] *= 2;
                computeScore(arr2d[i][j-1]);
            }
        }
    }
}
function mergeEqualCellsDown(arr2d) {
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = arr2d.length-1; j > 0; j--) {
            if (arr2d[i][j] == arr2d[i][j-1]) {
                arr2d[i][j-1] = 0;
                arr2d[i][j] *= 2;
                computeScore(arr2d[i][j]);
            }
        }
    }
}

function insertRandomSquare(arr2d,item) {
    let zeros = getZerosPos(arr2d);
    if (zeros.length > 0) {
        let index = Math.floor(Math.random() * zeros.length);
        arr2d[zeros[index][0]][zeros[index][1]] = item;
    }
}

function newGame() {
    gameNotOver = true;
    localStorage.setItem('score',0);
    let elem = document.getElementById("game__over");
    if(elem) {
        elem.remove();
    }
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

function computeScore(arg) {
    let score= arg + Number(localStorage.getItem('score'));
    let scoreElem = document.getElementById('score');
    let bestElem = document.getElementById('best');
    
    localStorage.setItem('score',score);
    scoreElem.style.color = 'white';
    scoreElem.innerHTML = score;

    if(score > Number(localStorage.getItem('best'))) {
        localStorage.setItem('best',score)
    }
    bestElem.style.color = 'white';
    bestElem.innerHTML = Number(localStorage.getItem('best'));
}


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

let gameArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let fieldElem = document.getElementById('table');
let gameNotOver;

let bestElem = document.getElementById('best');
    
bestElem.style.color = 'white';
bestElem.innerHTML = Number(localStorage.getItem('best'));

document.addEventListener('keydown', function(event) {
    
    switch (event.code) {
        case 'ArrowUp':
            //console.log('ArrowUp key down');
            event.preventDefault();
            if (gameNotOver && cellMoveEnable(gameArr,fieldElem)) {
                moveAllCellsUp(gameArr);
                mergeEqualCellsUp(gameArr);
                moveAllCellsUp(gameArr);
                insertRandomSquare(gameArr,2);
                fieldRender(gameArr,fieldElem);    
            }
            break;
        case 'ArrowDown':
            //console.log('ArrowDown key down');
            event.preventDefault();
            if (gameNotOver && cellMoveEnable(gameArr,fieldElem)) {
                moveAllCellsDown(gameArr);
                mergeEqualCellsDown(gameArr);
                moveAllCellsDown(gameArr);
                insertRandomSquare(gameArr,2);
                fieldRender(gameArr,fieldElem);    
            }
            break;
        case 'ArrowRight':
            //console.log('ArrowRight key down');
            event.preventDefault();
            if (gameNotOver && cellMoveEnable(gameArr,fieldElem)) {
                moveAllCellsRight(gameArr);
                mergeEqualCellsRight(gameArr);
                moveAllCellsRight(gameArr);
                insertRandomSquare(gameArr,2);
                fieldRender(gameArr,fieldElem);
            }
            break;
        case 'ArrowLeft':
            //console.log('ArrowLeft key down');
            event.preventDefault();
            if (gameNotOver && cellMoveEnable(gameArr,fieldElem)) {
                moveAllCellsLeft(gameArr);
                mergeEqualCellsLeft(gameArr);
                moveAllCellsLeft(gameArr);
                insertRandomSquare(gameArr,2);
                fieldRender(gameArr,fieldElem);
            }
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
fieldElem.addEventListener('gameover', function() {
    console.log("game over");
    gameNotOver = false;
    let elem = document.createElement('div');
    elem.className = "game__over";
    elem.id = "game__over";
    elem.innerHTML = "GAME OVER";
    fieldElem.after(elem); 
});




/*insertRandomSquare(gameArr,2);
insertRandomSquare(gameArr,4);
insertRandomSquare(gameArr,8);
insertRandomSquare(gameArr,16);
insertRandomSquare(gameArr,32);
insertRandomSquare(gameArr,64);
insertRandomSquare(gameArr,128);
insertRandomSquare(gameArr,256);
insertRandomSquare(gameArr,512);
insertRandomSquare(gameArr,1024);
insertRandomSquare(gameArr,2048);*/
//console.log(getZerosPos(gameArr));
//gameArr.forEach(function(item, index, array) {
//    console.log(item);
//});

newGame();
fieldRender(gameArr,fieldElem);