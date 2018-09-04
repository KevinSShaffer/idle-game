
let circles = [];

window.onload = () => {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    const camp = camps.createGoblinCamp();
    const circle = { x: camp.coordinates.x, y: camp.coordinates.y, radius: 25 };
            
    context.fillStyle = 'black';
    drawCircle(context, circle); 
    circle.units = [ units.warrior, units.priest, units.rogue ];
    circle.camp = camp;

    circles.push(circle);

    requestAnimationFrame(mainLoop);
};

let time = Date.now();
function mainLoop() {
    let duration = Date.now() - time;

    circles.forEach(circle => {
        circle.camp.spawns.forEach(spawn => spawn.trySpawn(duration));
        circle.camp.mobs.forEach(mob => takeTurn(duration, mob, circle.units, circle.camp.mobs))
        circle.units = circle.units.filter(unit => !unit.isDead)
        circle.units.forEach(unit => takeTurn(duration, unit, circle.camp.mobs, circle.units))
        circle.camp.spawns.forEach(spawn => spawn.tryKill());
    })
    
    time = Date.now();
    requestAnimationFrame(mainLoop);
}

function takeTurn(duration, unit, enemies, allies) {
    unit.timer -= duration;
    if (unit.timer <= 0) {
        unit.action(unit, enemies, allies);
        unit.timer = unit.spd + unit.timer;
    }
}

function isInsideCircle(x, y, circle) {
    x = Math.abs(x - circle.x);
    if (x > circle.radius) return false;
    y = Math.abs(y - circle.y);
    if (y > circle.radius) return false;

    return circle.radius >= Math.sqrt(x * x + y * y);
}

function drawCircle(context, circle) {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fill();
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return { 
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}