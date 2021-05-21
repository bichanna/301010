function appendChar(field, random, i){
    if (random === 1){
        field[i].push("O");
    } else {
      field[i].push("░");
    }
    return field
}


function generateField(width, height, rate){
    let field = [];
    if (!width || !height || !rate){
        width = 30;
        height = 10;
        rate = 10;
    }

    for (let i=0; i<height; i++){
        field.push([]);
        for (let n=0; n<width; n++){
            let random = Math.floor(Math.random()*rate)+1;
            field = appendChar(field, random, i);
        }
    }
    const hatWidth = Math.floor(Math.random()*width);
    const hatHeight = Math.floor(Math.random()*height);
    
    field[hatHeight][hatWidth] = "^"; // defining the location of the hat
    field[0][0] = "@";
    return field;
}

module.exports.generateField = generateField;