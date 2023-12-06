const settings = {
    width: window.innerWidth,
    height: window.innerHeight,
    iterations: 0,
    zoom: 200
}

function draw(cls, fc) {
    settings.iterations = settings.width / settings.zoom
    settings.step = 5 / settings.zoom
    for (let i = 0; i < settings.iterations / settings.step; i++) {
        let x = centererp(-settings.iterations / 2, settings.iterations / 2, i, settings.iterations)
        console.log(x);
        if (x > settings.width / settings.zoom / 2 || x < -settings.width / settings.zoom / 2) break
        let result = eval(fc)
        point(x, result, cls)
    }
}

function centererp(start, end, i, iterations) {

    if (i % 2 == 0) {
        return (settings.iterations / 2 + lerp(start, end, i / iterations)) * settings.step / 2
    } else {
        return (-settings.iterations / 2 + lerp(end, start, i / iterations) - 1) * settings.step / 2
    }

}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

const graph = document.querySelector(".graph")

function point(x, y, cls = 'point') {

    const point = document.createElement('div')
    point.className = cls
    point.style.left = x * settings.zoom + settings.width / 2 + 'px'
    point.style.top = -y * settings.zoom + settings.height / 2 + 'px'
    graph.appendChild(point)
}

function setup() {
    draw('point blue', 'x!=0?Math.sin(x)/x:1')
    draw('point red', 'Math.sin(x)')
    draw('point green', 'Math.cos(x)')
}
setup()

let scroll = settings.zoom * 100;
window.addEventListener('wheel', (e) => {
    scroll += e.deltaY * -2
    settings.zoom = 5 + scroll / 100
    graph.innerHTML = ''
    setup()
})