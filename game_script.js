"use strict";

let gameArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let fieldElem = document.getElementById('table');
//gameArr.forEach(function(item, index, array) {
//    console.log(item);
//});

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

function fieldRender(arr,elem) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            fieldElem.rows[i].cells[j].innerHTML = arr[j][i];
        }
    }
};

gameArr[2][1] = 1024;
gameArr[3][3] = 32;

gameArr.forEach(function(item, index, array) {
    console.log(item);
});

fieldRender(gameArr,fieldElem);