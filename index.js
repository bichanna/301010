/*
      
    |\  | |--| |--\ |--   ----- /--
    | \ | |  | |  | |--     |   \--\    <--- Please help me with this. This sucks!!
    |  \| |__| |__/ |__   |_/   ___|
*/

/*  this is all charactors this game contains
  hat : '^'
  hole : 'O'
  fieldCharacter : '░'
  player : '@'
  zombie : 'Z'
*/

const prompt = require('prompt-sync')({sigint: true});
const GF = require("./generate_field.js");


class FindHatGame{
    constructor(){
        const width = prompt("Enter the width(30): ");
        const height = prompt("Enter the height(10): ");
        const rate = prompt("Enter the rate(10): ");

        this.field = GF.generateField(width, height, rate); // generate a field and assign it to this.field
        this.whereIam = [0,0];
    }

    _print(){
        for (let i of this.field){
          console.log(i.join(""));
        }
    }

    _checkDirection(direc){
        direc = direc.toLowerCase();
        if (direc === "down" || direc === "d"){
            return [1,0];
        } else if (direc === "up" || direc === "u"){
            return [-1,0];
        } else if (direc === "right" || direc === "r"){
            return [0,1];
        } else if (direc === "left" || direc === "l"){
            return [0,-1];
        } else if (direc === "stay" || direc === "s"){
            return [0,0];
        } else {
            return false;
        }
    }    

    check(direc){  // this checks wether the player is going to die or not
        if (this.whereIam[0]+direc[0] === -1 || this.whereIam[1]+direc[1] === -1){
        return [false, "undefined"];

        } else if (this.whereIam[0]+direc[0] === this.field.length || this.whereIam[1]+direc[1] === this.field[0].length){
        return [false, "undefined"];
        
        } else if (this.field[this.whereIam[0]+direc[0]][this.whereIam[1]+direc[1]] === "O"){
        return [false, "fallllllll......"];
        
        } else if (this.field[this.whereIam[0]+direc[0]][this.whereIam[1]+direc[1]] === "^"){
        return ["game clear!", "Found the hat!!"];

        } else {
        return [true];
        }
    }
    
    _movePlayer(direc){  // this method actually moves the player
        let check = this.check(direc);   // call check method to check wether the player's next move is fine or bad
        if (!check[0]){
            return check;
        } else if (check[0]==="game clear!"){
            return check;
        } else if (direc[0] === 0){
            if (direc[1] === 1){
                this.field[this.whereIam[0]][this.whereIam[1]+1] = "@";
                this.field[this.whereIam[0]][this.whereIam[1]] = "░"
                this.whereIam = [this.whereIam[0],this.whereIam[1]+1];
                return "ok";
            } else if (direc[1] === 0) {  // return only "ok" because the player just wants to stay where they are
                return "ok"
            } else {
                this.field[this.whereIam[0]][this.whereIam[1]-1] = "@";
                this.field[this.whereIam[0]][this.whereIam[1]] = "░"
                this.whereIam = [this.whereIam[0],this.whereIam[1]-1];
                return "ok";
            }
        } else if (direc[0] === 1) {  // user wants to go down
            this.field[this.whereIam[0]+1][this.whereIam[1]] = "@";
            this.field[this.whereIam[0]][this.whereIam[1]] = "░"
            this.whereIam = [this.whereIam[0]+1,this.whereIam[1]];
            return "ok";
        } else if (direc[0] === -1) { // user wants to go up
            this.field[this.whereIam[0]-1][this.whereIam[1]] = "@";
            this.field[this.whereIam[0]][this.whereIam[1]] = "░"
            this.whereIam = [this.whereIam[0]-1,this.whereIam[1]];
            return "ok";
        }
    }

    play(){
        prompt("This is the original find-hat game.\n");

        while (true){
            this._print();
            const direc = prompt("command: ");
            // check if the user entered a proper command
            const false_or_direc = this._checkDirection(direc);
            if (false_or_direc === false){
                console.log("PLEASE ENTER PROPER COMMAND.");
                prompt("");
                continue;
            }

            const check_game_clear_or_not = this._movePlayer(false_or_direc);

            if (check_game_clear_or_not[0] === false){
                console.log("GAME OVER...");
                console.log(`CAUSE OF DEATH: ${check_game_clear_or_not[1]}`);
                prompt("");
                break;
            } else if (check_game_clear_or_not[0] === "game clear!"){
                console.log("FOUND THE HAT!");
                console.log("GAME CLEAR!")
                prompt("");
                break;
            }
        }
    }
}


const game = new FindHatGame();
game.play();