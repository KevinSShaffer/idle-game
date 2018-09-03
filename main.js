
// macro system for players to create unit actions and order them.  start players off with default actions and let them gain new verbs/nouns?

let circles = [];

window.onload = () => {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    canvas.onclick = event => {
        const pos = getCursorPosition(canvas, event);
        const found = circles.find(circle => {
            return isInsideCircle(pos.x, pos.y, circle);
        });

        if (found) {
            context.fillStyle = 'green';
            drawCircle(context, found);
        } else {
            const circle = { x: pos.x, y: pos.y, radius: 25 };
            
            context.fillStyle = 'black';
            drawCircle(context, circle); 
            circle.mobs = [ mobs.createSmallGoblin(), mobs.createGoblin(), mobs.createLargeGoblin() ];
            circle.units = [ units.warrior, units.priest, units.rogue ];

            circles.push(circle);
        }
    };

    requestAnimationFrame(mainLoop);
};

let time = Date.now();
function mainLoop() {
    let duration = Date.now() - time;

    circles.forEach(circle => {
        circle.mobs.forEach(mob => takeTurn(duration, mob, circle.units, circle.mobs))
        circle.units = circle.units.filter(unit => unit.hp > 0)
        circle.units.forEach(unit => takeTurn(duration, unit, circle.mobs, circle.units))
        circle.mobs = circle.mobs.filter(mob => mob.hp > 0)
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