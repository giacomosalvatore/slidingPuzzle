var tiles = [];

var blank = {
    x: 3,
    y: 3
}

var image = document.getElementById("image");
var tileheight = image.height/4;
var tilewidth = image.width/4;
var solved;
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
            box.move = (checksolution) => {
                if((positive(box.x - blank.x) + positive(box.y - blank.y)) <= 1){
                    let tmp;
                    tmp = box.x;
                    box.x = blank.x;
                    blank.x = tmp;
                    tmp = box.y;
                    box.y = blank.y;
                    blank.y = tmp;
                    box.style.top = box.x*tileheight + 'px';
                    box.style.left = box.y*tilewidth + 'px';
                    if(checksolution){
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
        let container = document.getElementById("container");
        container.style.height = tileheight*4 + 'px';
        container.style.width = tilewidth*4 + 'px';
        document.getElementById("button").style.top = tileheight*4+20 + 'px';
        tiles.forEach(tile => {
            container.appendChild(tile);
        });
    }

    tiles.pop();
    render();

}


var shuffle = () => {
    activate();
    if(solved){
        solved = false;
        setTimeout(() => {
            shuffle();
        }, 1000);
    }
    else
        for(let i=0; i<1000; i++){
            let n = Math.floor(Math.random()*15);
            let tile = tiles[n];
            tile.move(false);
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
    solved = true;
    for(let i = 0; i < tiles.length && solved; i++){
        let tile = tiles[i];
        if(tile.x*4 + tile.y +1 != tile.tilenumber){
            solved = false;
        }
    }
    if(solved){
        tiles.forEach(tile => {
            tile.onclick = null;
        });
        setTimeout(() => {
            image.hidden = false;
            image.style.opacity = 1;
            tiles.forEach(tile => {
                tile.style.opacity = 0;
            });
        }, 500);
    }
}

var activate = () => {
    image.hidden = true;
    image.style.opacity = 0;
    tiles.forEach(tile => {
        tile.style.opacity = 1;
        tile.onclick = tile.move;
    });
}
