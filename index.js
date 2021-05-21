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
  zombie : '*'
*/

const prompt = require('prompt-sync')({sigint: true});
const GF = require("./generate_field.js");
const MV = require("./move_player.js");
const MZ = require("./move_zombies.js");


class threeHundredThousandAndTen{
    constructor(){
        const width = prompt("Enter the width(30): ");
        const height = prompt("Enter the height(10): ");
        const rate = prompt("Enter the rate(10): ");

        const list = GF.generateField(width, height, rate); // generate a field and assign it to this.field
        this.field = list[0];
        this.zombies_positions = list[1];
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
            // move player
            const newMV = new MV.MovePlayer(this);
            let check_game_clear_or_not = newMV.movePlayer(false_or_direc);
            // update whereIam and field
            this.whereIam = newMV.whereIam;
            this.field = newMV.field;
            this._print();
            
            
            // move zombies
            const newMZ = new MZ.MoveZombies(this);
            const if_eaten_by_zombie = newMZ.moveZombies();
            // update field zombies_positions and field
            this.field = newMZ.field;
            this.zombies_positions = newMZ.zombies_positions;

            // check if player is eaten
            if (!if_eaten_by_zombie[0]){
                check_game_clear_or_not = [false, "eaten by a zombie"];
            }

            if (check_game_clear_or_not[0] === false){
                console.log("GAME OVER...");
                console.log(`CAUSE OF DEATH: ${check_game_clear_or_not[1]}`);
                console.log(`YOUR LAST COMMAND WAS ${direc}.`);
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


const game = new threeHundredThousandAndTen();
game.play();