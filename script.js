
var tiles = [];

// virtual position of the blank tile
var blank = {
    x: 3,
    y: 3
}

var puzzleSolved = false;

// gets the image from the dom as soon as it load and sets the tiles dimensions accordingly
var image = document.getElementById("image");
var tileheight = image.height/4;
var tilewidth = image.width/4;

image.onload = function() {

    // this code designed with a double for loop
    // could be implemented with a single for loop
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){

            // generates the tile giving it dimensions and positions
            let box = document.createElement("canvas");
            box.style.top = i*tileheight + "px";
            box.style.left = j*tilewidth + "px";
            box.height = tileheight;
            box.width = tilewidth;

            // fills the tiles with the corresponding portion of the image
            box.getContext('2d').drawImage(
                image, 
                tileheight*j, tilewidth*i, tileheight, tilewidth, 
                0, 0, tilewidth, tileheight
            );

            // tilenumber is the original position
            // it's the number that would be on the tile in the original version of the puzzle
            box.tilenumber = i*4 + j + 1;

            // x and y represent the current position
            box.x = i;
            box.y = j;

            // if the tile can move in the blank spot, 
            // switches the tile's coorinates with the blank spot's
            // and moves the tile in the blank spot
            box.move = (checksolution = true) => {
                if((absoluteValue(box.x - blank.x) + absoluteValue(box.y - blank.y)) <= 1){
                    let tmp;
                    tmp = box.x;
                    box.x = blank.x;
                    blank.x = tmp;
                    tmp = box.y;
                    box.y = blank.y;
                    blank.y = tmp;
                    box.style.top = box.x*tileheight + 'px';
                    box.style.left = box.y*tilewidth + 'px';

                    // if it's shuffling, it must not check if the puzzle is solved
                    if(checksolution){
                        checkSolved();
                    }
                }
            }
            box.onclick = box.move;
            
            tiles.push(box);
        }
    }

    tiles.pop();

    let container = document.getElementById("container");
    container.style.height = tileheight*4 + 'px';
    container.style.width = tilewidth*4 + 'px';
    document.getElementById("button").style.top = tileheight*4+30 + 'px';
    tiles.forEach(tile => {
        container.appendChild(tile);
    });
}

var shuffle = () => {

    activateBoard();

    // if it's already solved, waits for the animation to finish before sfuffling
    if(puzzleSolved){
        puzzleSolved = false;
        setTimeout(() => {
            shuffle();
        }, 1200);
    }
    else{

        // shuffles the tiles by trying random moves on the board
        // ! inefficient - many attempts to move a tile fail
        // !! you can't just switch random tiles - it would make the puzzle unsolvable half of the times
        for(let i=0; i<1000; i++){
            let n = Math.floor(Math.random()*15);
            let tile = tiles[n];
            tile.move(false);
        }
    }
}

// returns the absoluteValue of a number
// !! need to switch this with Math.abs
var absoluteValue = x => {
    if(x<0){
        return -x;
    }
    return x;
}

var checkSolved = () => {

    // checks if the puzzle is solved by comparing the original position 
    // of every tile with its current one
    puzzleSolved = true;
    for(let i = 0; i < tiles.length && puzzleSolved; i++){
        let tile = tiles[i];
        if(tile.x*4 + tile.y +1 != tile.tilenumber){
            puzzleSolved = false;
        }
    }

    if(puzzleSolved){

        
        // - disables the click event for every tile
        tiles.forEach(tile => {
            tile.onclick = null;
        });

        
        // - replaces the tiles with the original image
        setTimeout(() => {
            image.hidden = false;
            image.style.opacity = 1;
            tiles.forEach(tile => {
                tile.style.opacity = 0;
            });
        }, 500);
    }
}


// hides the original image
// makes tiles visible and reactivates their click listeners 
var activateBoard = () => {
    image.style.opacity = 0;
    tiles.forEach(tile => {
        tile.style.opacity = 1;
        tile.onclick = tile.move;
    });
}
