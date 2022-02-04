var tiles = [];

var blank = {
    x: 3,
    y: 3
}

var image = document.getElementById("image");
var tileheight = image.height/4;
var tilewidth = image.width/4;
image.onload = function() {



    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let box = document.createElement("canvas");
            box.style.top = i*tileheight + "px";
            box.style.left = j*tilewidth + "px";
            box.height = tileheight;
            box.width = tilewidth;

            box.getContext('2d').drawImage(
                image, 
                tileheight*j, tilewidth*i, tileheight, tilewidth, 
                0, 0, tilewidth, tileheight
            );

            box.x = i;
            box.y = j;
            box.move = function(shuffling = false){
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
                    if(shuffling){
                        checkSolved();
                    }
                }
            }
            box.onclick = box.move;
            box.tilenumber = i*4 + j + 1;
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

}


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

var checkSolved = () => {
    console.log("Checking solution");
    let solved = true;
    for(let i = 0; i < tiles.length && solved; i++){
        let tile = tiles[i];
        if(tile.x*4 + tile.y +1 != tile.tilenumber){
            solved = false;
            console.log(tile.x*4 + ' '+ tile.y + ' =' + tile.tilenumber);
        }
    }
    if(solved){
        setTimeout(() => {alert("Solved solution")}, 900);
    }
}
