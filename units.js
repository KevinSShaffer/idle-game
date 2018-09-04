
class Camp {
    constructor(name, coordinates, spawns) {
        this.name = name;
        this.coordinates = coordinates;
        this.spawns = spawns;
    }

    get mobs() {
        return this.spawns.map(spawn => spawn.mob).filter(mob => mob);
    }
}

class SpawnPoint {
    constructor(mobs, rate) {
        this.mobs = mobs;
        this.rate = rate;
        this.timer = 0;
        this.mob = null;
    }

    tryKill() {
        if (this.mob && this.mob.isDead) {
            this.mob = null;
            this.timer = this.rate;
        }
    }
    trySpawn(duration) {
        if (this.mob) {
            return false;
        } else {
            this.timer -= duration;

            if (this.timer <= 0) {
                this.timer = 0;
                this.mob = this._newMob();
                return true;
            } 
        }      

        return false;
    }
    _newMob() {
        let newMob = {i:-1, rand: -1};
        
        this.mobs.forEach((mob, i) => {
            const rand = this._getRandomInt(mob.chance);
            if (rand > newMob.rand) {
                newMob.i = i;
                newMob.rand = rand;
            }
        });

        console.log(`${this.mobs[newMob.i].name} appears`)

        return this.mobs[newMob.i].spawn();
    }
    _getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

class Unit {
    constructor(name, hp, spd, atk, mp, matk, action) {
        this.name = name;
        this.maxhp = hp;
        this.hp = hp;
        this.spd = spd;
        this.timer = spd;
        this.atk = atk || 0;
        this.mp = mp || 0;
        this.matk = matk || 0;

        this.action = action;
    }

    takeDamage(atk) {
        this.hp -= atk;

        if (this.isDead) {
            console.log(`${this.name} has been slain`);
        }
    }
    get isDead() {
        return this.hp <= 0;
    }
}

class Mob extends Unit {
    constructor(name, hp, spd, atk, mp, matk, chance, action) {
        super(name, hp, spd, atk, mp, matk, action);

        this.chance = chance;
    }
    spawn() {
        return new Mob(this.name, this.hp, this.spd, this.atk, this.mp, this.matk, this.chance, this.action);
    }
}

const camps = {
    createGoblinCamp: () => new Camp('a goblin camp', {x:50,y:50}, [
        new SpawnPoint([mobs.createSmallGoblin(), mobs.createGoblin()], 15000),
        new SpawnPoint([mobs.createSmallGoblin(), mobs.createGoblin()], 15000),
        new SpawnPoint([mobs.createGoblin(), mobs.createLargeGoblin()], 15000),
        new SpawnPoint([mobs.createGoblin(), mobs.createLargeGoblin(), mobs.createGoblinKing()], 15000)
    ])
}

const mobs = {
    createSmallGoblin: () => new Mob('a small goblin', 8, 1100, 1, 0, 0, 80, basicAttack),
    createGoblin: () => new Mob('a goblin', 8, 1200, 1, 0, 0, 70, basicAttack),
    createLargeGoblin: () => new Mob('a large goblin', 9, 1400, 2, 0, 0, 50, basicAttack),
    createGoblinKing: () => new Mob('Goblin King', 22, 1400, 4, 0, 0, 20, basicAttack),
    createWolf: () => new Mob('a wolf', 6, 800, 1, 0, 0, 80, basicAttack)
}

const units = {
    warrior: new Unit('warrior', 16, 1400, 1, 0, 0, basicAttack),
    rogue: new Unit('rogue', 11, 900, 2, 0, 0, basicAttack),
    priest: new Unit('priest', 13, 1400, 1, 14, 3, basicHeal)
}