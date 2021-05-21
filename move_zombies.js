class MoveZombies{
    constructor(index){
        this.field = index.field;
        this.zombies_positions = index.zombies_positions;
    }

    generateZombieDirec(currentPo){  // generate and check a new proper direction for each zombie
        let random;
        while (true){
        random = Math.floor(Math.random()*4)+1;  // 1=up, 2=down, 3=right, 4=left
        if (random === 1){ // up
            if (currentPo[0]-1 === -1 || this.field[currentPo[0]-1][currentPo[1]] === "O" || this.field[currentPo[0]-1][currentPo[1]] === "^"){
                continue;

            } else {
                return [currentPo[0]-1, currentPo[1], "░"];
            }
        } else if (random === 2){ // down
            if (currentPo[0]+1 === this.field.length || this.field[currentPo[0]+1][currentPo[1]] === "O" || this.field[currentPo[0]+1][currentPo[1]] === "^"){
                continue;

            } else {
                return [currentPo[0]+1, currentPo[1], "░"];
            }
        } else if (random === 3){ // right
            if (currentPo[1]+1 === this.field[0].length || this.field[currentPo[0]][currentPo[1]+1] === "O" || this.field[currentPo[0]][currentPo[1]+1] === "^"){
                continue;

            } else {
                return [currentPo[0], currentPo[1]+1, "░"];
            }
        } else if (random === 4){ // left
            if (currentPo[1]-1 === -1 || this.field[currentPo[0]][currentPo[1]-1] === "O" || this.field[currentPo[0]][currentPo[1]-1] === "^"){
                continue;

            } else {
                return [currentPo[0], currentPo[1]-1, "░"];
            }
        }
        }
    }

    moveZombies(){
        let new_po;
        for (let i in this.zombies_positions){
            new_po = this.generateZombieDirec(this.zombies_positions[i]);
            const if_eaten_by_zombie = this.checkZombieEaten(new_po);
            if (if_eaten_by_zombie){
                return [false, "eaten by a zombie"];
            } else {
                this.field[new_po[0]][new_po[1]] = "*";
                this.field[this.zombies_positions[i][0]][this.zombies_positions[i][1]] = new_po[2];
                this.zombies_positions[i] = new_po;
            }
        }
        return [true];
    }

    checkZombieEaten(new_po){
        // console.log(this.field[new_po[0]][new_po[1]]);
        if (this.field[new_po[0]][new_po[1]] === "@"){
          return true;
        } else {
          return false;
        }
      }
}

module.exports.MoveZombies = MoveZombies;