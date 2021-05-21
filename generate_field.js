function appendChar(field, random, i, n){
    let zombies_positions = [];
    if (random === 1){
        const zombies_or_hole = Math.floor(Math.random()*2);
        if (zombies_or_hole === 0){
            field[i].push("O");
        } else if (zombies_or_hole === 1){
            field[i].push("*");
            zombies_positions.push([i,n]);   // add each zombie's position so that I can manage all zombies.
        }
    } else {
      field[i].push("░");
    }
    return [field, zombies_positions];
}


function generateField(width, height, rate){
    let field = [];
    let zombies_positions = [];
    if (!width || !height || !rate){
        width = 30;
        height = 10;
        rate = 10;
    }

    for (let i=0; i<height; i++){
        field.push([]);
        for (let n=0; n<width; n++){
            let random = Math.floor(Math.random()*rate)+1;
            const list = appendChar(field, random, i, n);
            field = list[0];
            zombies_positions = list[1];
        }
    }
    const hatWidth = Math.floor(Math.random()*width);
    const hatHeight = Math.floor(Math.random()*height);
    
    field[hatHeight][hatWidth] = "^"; // defining the location of the hat
    field[0][0] = "@";
    return [field, zombies_positions];
}

module.exports.generateField = generateField;