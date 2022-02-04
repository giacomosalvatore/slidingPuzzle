var tiles = [];

var blank = {
    x: 3,
    y: 3
}

var tileheight = 30;
var tilewidth = 30;

for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
        let box = document.createElement("canvas");
        box.style.top = i*tileheight + "px";
        box.style.left = j*tilewidth + "px";
        box.x = i;
        box.y = j;
        box.move = function(){
            if((positive(box.x - blank.x) + positive(box.y - blank.y)) <= 1){
                console.log("moving" + box.x + box.y);
                let tmp;
                tmp = box.x;
                box.x = blank.x;
                blank.x = tmp;
                tmp = box.y;
                box.y = blank.y;
                blank.y = tmp;
                box.style.top = box.x*tileheight + 'px';
                box.style.left = box.y*tilewidth + 'px';
            }
        }
        box.onclick = box.move;
        box.innerText = i*4 + j + 1;
        tiles.push(box);
    }
}
var render = () => {
    tiles.forEach(tile => {
        document.body.appendChild(tile);
    });
}

tiles.pop();
render();



var shuffle = () => {
    for(let i=0; i<1000; i++){
        let n = Math.floor(Math.random()*15);
        let tile = tiles[n];
        tile.move();
    }
}

var positive = x => {
    if(x<0){
        return -x;
    }
    return x;
}
