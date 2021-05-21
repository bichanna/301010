
class MovePlayer{
    constructor(index){
        this.whereIam = index.whereIam;
        this.field = index.field;
    }

    _check(direc){  // this checks wether the player is going to die or not
        if (this.whereIam[0]+direc[0] === -1 || this.whereIam[1]+direc[1] === -1){
            return [false, "undefined"];

        } else if (this.whereIam[0]+direc[0] === this.field.length || this.whereIam[1]+direc[1] === this.field[0].length){
            return [false, "undefined"];
        
        } else if (this.field[this.whereIam[0]+direc[0]][this.whereIam[1]+direc[1]] === "O"){
            return [false, "fallllllll......"];
        
        } else if (this.field[this.whereIam[0]+direc[0]][this.whereIam[1]+direc[1]] === "^"){
            return ["game clear!", "Found the hat!!"];

        } else if (this.field[this.whereIam[0]+direc[0]][this.whereIam[1]+direc[1]] === "*"){
            return [false, "eaten by a zombie."];

        } else {
        return [true];
        }
    }
    
    movePlayer(direc){  // this method actually moves the player
        let check = this._check(direc);   // call check method to check wether the player's next move is fine or bad
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
}
module.exports.MovePlayer = MovePlayer;