
function basicAttack(self, enemies, allies) {
    const unit = enemies.find(unit => unit.hp > 0);

    if (unit) {
        console.log(`${self.name} deals ${self.atk} damage to ${unit.name}`);
        unit.takeDamage(self.atk);
    }
}

function basicHeal(self, enemies, allies) {
    const hurtAlly = allies.find(ally => ally.hp < ally.maxhp);

    if (hurtAlly) {
        console.log(`priest heals ${hurtAlly.name} for ${self.matk}`);
        hurtAlly.hp += self.matk;
        hurtAlly.hp = hurtAlly.hp > hurtAlly.maxhp ? hurtAlly.maxhp : hurtAlly.hp;
    }
}
