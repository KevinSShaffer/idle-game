
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
}

const mobs = {
    createSmallGoblin: () => new Unit('goblin', 8, 1100, 1, 0, 0, basicAttack),
    createGoblin: () => new Unit('goblin', 8, 1200, 1, 0, 0, basicAttack),
    createLargeGoblin: () => new Unit('goblin', 9, 1400, 2, 0, 0, basicAttack),
    createWolf: () => new Unit('wolf', 6, 800, 1, 0, 0, basicAttack)
}

const units = {
    warrior: new Unit('warrior', 16, 1400, 1, 0, 0, basicAttack),
    rogue: new Unit('rogue', 11, 900, 2, 0, 0, basicAttack),
    priest: new Unit('priest', 13, 1400, 1, 14, 3, basicHeal)
}