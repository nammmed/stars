import React, {useEffect, useState} from 'react';
import Star from "./components/star";
import camera from "./store/camera";
import Controls from "./components/controls";

const timeStep = 40;
const G = 6.67 * Math.pow(10,-11);

// export var stars = [
//     {
//         id: 0,
//         m: 1000,
//         x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0, fx: 0, fy: 0,
//     },
//     {
//         id: 1,
//         m: 1,
//         x: 200, y: 200, vx: -1, vy: 1, ax: 0, ay: 0, fx: 0, fy: 0,
//     },
// ]

export var stars = [];
for (let i = 0; i <= 100; i++) {
    stars.push({
        id: i,
        m: Math.random() * (5.972 * Math.pow(10, 24) - 1) + 1,
        x: (Math.random()*1800) * Math.pow(10,12) + 1,
        y: (Math.random()*800) * Math.pow(10,12) + 1,
        vx: (Math.random()-0.5) * Math.pow(10, 11),
        vy: (Math.random()-0.5) * Math.pow(10, 11),
    })
}

function App() {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
                setTime(Date.now());
                calcStars();
            },
            timeStep
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="app" onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}>
            <div className="time">
                {timeConverter(time)}<br/>
                stars left: {stars.length}
            </div>
            {stars.map(star =>
                <Star key={star.id} star={{...star}}/>
            )}
            <Controls />
        </div>
    );
}

function calcStars() {
    //сначала поиск столкновений
    for (let i = 0; i < stars.length - 1; ++i) {
        for (let j = i + 1; j < stars.length; ++j) {
            let r1 = Math.ceil(Math.sqrt(stars[i].m / Math.PI) * camera.scale)
            let r2 = Math.ceil(Math.sqrt(stars[j].m / Math.PI) * camera.scale)
            let r = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
            if (r < r1 || r < r2) {
                //столкновение
                stars[i].m += stars[j].m
                stars[i].vx = (stars[j].vx*stars[j].m + stars[i].vx*stars[i].m) / (stars[i].m + stars[j].m)
                stars[i].vy += (stars[j].vy*stars[j].m + stars[i].vy*stars[i].m) / (stars[i].m + stars[j].m)
                stars.splice(j, 1);
            }
        }
    }

    //обнуляем силы
    for (let i in stars)
        stars[i].fx = stars[i].fy = 0

    //рассчитываем силы притяжения
    for (let i = 0; i < stars.length - 1; ++i) {
        for (let j = i + 1; j < stars.length; ++j) {
            let dx = stars[i].x - stars[j].x
            let dy = stars[i].y - stars[j].y
            let r = Math.sqrt(dx * dx + dy * dy);
            if (r < 1) r = 1;
            let f = G * stars[i].m * stars[j].m / (r * r);
            let fx = f * dx / r;
            let fy = f * dy / r;
            stars[i].fx -= fx;
            stars[j].fx += fx;
            stars[i].fy -= fy;
            stars[j].fy += fy;
        }
    }

    //рассчитываем остальные параметры
    for (let i in stars) {
        stars[i].ax = stars[i].fx / stars[i].m
        stars[i].ay = stars[i].fy / stars[i].m
        stars[i].vx = stars[i].vx + stars[i].ax
        stars[i].vy = stars[i].vy + stars[i].ay
        stars[i].x = stars[i].x + stars[i].vx
        stars[i].y = stars[i].y + stars[i].vy

        if (camera.isFixed && camera.isFixed === i) {
            camera.setX(stars[i].x - window.innerWidth/2)
            camera.setY(stars[i].y - window.innerHeight/2)
        }
    }
}

function handleWheel(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const offsetX = mouseX - window.innerWidth / 2;
    const offsetY = mouseY - window.innerHeight / 2;

    if (e.deltaY < 0) {
        camera.incScale()
        camera.setX(camera.x - offsetX);
        camera.setY(camera.y - offsetY);
    } else {
        camera.decScale()
        camera.setX(camera.x + offsetX);
        camera.setY(camera.y + offsetY);
    }
}

function handleMouseDown(event) {
    if (event.button === 0) {
        camera.isDragging = true;
        camera.dragStartX = event.clientX;
        camera.dragStartY = event.clientY;
    }
}

function handleMouseMove(event) {
    if (camera.isDragging) {
        const deltaX = (event.clientX - camera.dragStartX) / camera.scale;
        const deltaY = (event.clientY - camera.dragStartY) / camera.scale;
        camera.setX(camera.x - deltaX);
        camera.setY(camera.y - deltaY);
        camera.dragStartX = event.clientX;
        camera.dragStartY = event.clientY;
    }
}

function handleMouseUp(event) {
    if (event.button === 0) {
        camera.isDragging = false;
    }
}

window.addEventListener('load', () => {
    camera.center();
});
window.addEventListener('resize', () => {
    camera.center();
});

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

export default App;
