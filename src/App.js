import React, {useEffect, useState} from 'react';
import Star from "./components/star";
import camera from "./store/camera";
import Controls from "./components/controls";

const timeStep = 40;
//const starsCount = 200;
const timeScale = 1;
export const G = 6.67 * Math.pow(10,-11) * timeScale;

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
// for (let i = 0; i <= starsCount-1; i++) {
//     stars.push({
//         id: i,
//         m: Math.random() * (5.972 * Math.pow(10, 24) - 1) + 1,
//         x: (Math.random()*10000) * Math.pow(10,12) + 1,
//         y: (Math.random()*10000) * Math.pow(10,12) + 1,
//         vx: 0,//(Math.random()-0.5) * Math.pow(10, 11),
//         vy: 0,//(Math.random()-0.5) * Math.pow(10, 11),
//     })
// }
//stars[0].m = 1.98847 * Math.pow(10, 30)

stars = [
    {id: 0, m: 1.989 * Math.pow(10, 30), r: 696340 * Math.pow(10, 3), x: 0, y: 0, vx: 0, vy: 0, name: 'Солнце'},  // Солнце
    {id: 1, m: 0.330 * Math.pow(10, 24), r: 2439.7 * Math.pow(10, 3), x: 46 * Math.pow(10, 9), y: 0, vx: 0, vy: 47.87 * Math.pow(10, 3), name: 'Меркурий'},  // Меркурий
    {id: 2, m: 4.867 * Math.pow(10, 24), r: 6051.8 * Math.pow(10, 3), x: 107.48 * Math.pow(10, 9), y: 0, vx: 0, vy: 35.02 * Math.pow(10, 3), name: 'Венера'},  // Венера
    {id: 3, m: 5.972 * Math.pow(10, 24), r: 6371 * Math.pow(10, 3), x: 147.09 * Math.pow(10, 9), y: 0, vx: 0, vy: 29.29 * Math.pow(10, 3), name: 'Земля'},  // Земля
    {id: 4, m: 0.64171 * Math.pow(10, 24), r: 3389.5 * Math.pow(10, 3), x: 206.62 * Math.pow(10, 9), y: 0, vx: 0, vy: 24.07 * Math.pow(10, 3), name: 'Марс'},  // Марс
    {id: 5, m: 1898 * Math.pow(10, 24), r: 69911 * Math.pow(10, 3), x: 740.52 * Math.pow(10, 9), y: 0, vx: 0, vy: 13.07 * Math.pow(10, 3), name: 'Юпитер'},  // Юпитер
    {id: 6, m: 568.3 * Math.pow(10, 24), r: 58232 * Math.pow(10, 3), x: 1352.55 * Math.pow(10, 9), y: 0, vx: 0, vy: 9.68 * Math.pow(10, 3), name: 'Сатурн'},  // Сатурн
    {id: 7, m: 86.81 * Math.pow(10, 24), r: 25362 * Math.pow(10, 3), x: 2741.3 * Math.pow(10, 9), y: 0, vx: 0, vy: 6.8 * Math.pow(10, 3), name: 'Уран'},  // Уран
    {id: 8, m: 102.4 * Math.pow(10, 24), r: 24622 * Math.pow(10, 3), x: 4444.45 * Math.pow(10, 9), y: 0, vx: 0, vy: 5.43 * Math.pow(10, 3), name: 'Нептун'},  // Нептун
    {id: 9, m: 0.01303 * Math.pow(10, 24), r: 1188.3 * Math.pow(10, 3), x: 5936.82 * Math.pow(10, 9), y: 0, vx: 0, vy: 4.67 * Math.pow(10, 3), name: 'Плутон'},  // Плутон
    {id: 10, m: 0.07346 * Math.pow(10, 24), r: 1737.1 * Math.pow(10, 3), x: 147.09 * Math.pow(10, 9) + 384.4 * Math.pow(10, 6), y: 0, vx: 0, vy: 29.29 * Math.pow(10, 3) + 1.022 * Math.pow(10, 3), name: 'Луна'},  // Луна
    {id: 13, m: 0.1221 * Math.pow(10, 30), r: 200000 * Math.pow(10, 3), x: 4.0175 * Math.pow(10, 16), y: 0, vx: 0, vy: 13.07 * Math.pow(10, 3), name: 'Проксима Центавра'}, // Проксима Центавра
    {id: 14, m: 0.089 * Math.pow(10, 24), r: 1821.6 * Math.pow(10, 3), x: 740.52 * Math.pow(10, 9) + 421.8 * Math.pow(10, 6), y: 0, vx: 0, vy: 13.07 * Math.pow(10, 3) + 17.334 * Math.pow(10, 3), name: 'Ио'},  // Ио
    {id: 15, m: 0.048 * Math.pow(10, 24), r: 1560.8 * Math.pow(10, 3), x: 740.52 * Math.pow(10, 9) + 671.1 * Math.pow(10, 6), y: 0, vx: 0, vy: 13.07 * Math.pow(10, 3) + 13.740 * Math.pow(10, 3), name: 'Европа'},  // Европа
    {id: 16, m: 0.148 * Math.pow(10, 24), r: 2631.2 * Math.pow(10, 3), x: 740.52 * Math.pow(10, 9) + 1070 * Math.pow(10, 6), y: 0, vx: 0, vy: 13.07 * Math.pow(10, 3) + 10.880 * Math.pow(10, 3), name: 'Ганимед'},  // Ганимед
    {id: 17, m: 0.1076 * Math.pow(10, 24), r: 2410.3 * Math.pow(10, 3), x: 740.52 * Math.pow(10, 9) + 1883 * Math.pow(10, 6), y: 0, vx: 0, vy: 13.07 * Math.pow(10, 3) + 8.204 * Math.pow(10, 3), name: 'Каллисто'},  // Каллисто
    {id: 18, m: 0.0000374 * Math.pow(10, 24), r: 198.2 * Math.pow(10, 3), x: 1352.55 * Math.pow(10, 9) + 185.52 * Math.pow(10, 6), y: 0, vx: 0, vy: 9.68 * Math.pow(10, 3) + 14.317 * Math.pow(10, 3), name: 'Мимас'},  // Мимас
    {id: 19, m: 0.0001106 * Math.pow(10, 24), r: 252.1 * Math.pow(10, 3), x: 1352.55 * Math.pow(10, 9) + 238.02 * Math.pow(10, 6), y: 0, vx: 0, vy: 9.68 * Math.pow(10, 3) + 12.634 * Math.pow(10, 3), name: 'Энцелад'},  // Энцелад
    {id: 20, m: 0.000618 * Math.pow(10, 24), r: 531.1 * Math.pow(10, 3), x: 1352.55 * Math.pow(10, 9) + 294.66 * Math.pow(10, 6), y: 0, vx: 0, vy: 9.68 * Math.pow(10, 3) + 11.36 * Math.pow(10, 3), name: 'Тефия'},  // Тефия
    {id: 21, m: 0.001096 * Math.pow(10, 24), r: 561.4 * Math.pow(10, 3), x: 1352.55 * Math.pow(10, 9) + 377.40 * Math.pow(10, 6), y: 0, vx: 0, vy: 9.68 * Math.pow(10, 3) + 10.03 * Math.pow(10, 3), name: 'Диона'},  // Диона
    {id: 22, m: 0.002306 * Math.pow(10, 24), r: 764.5 * Math.pow(10, 3), x: 1352.55 * Math.pow(10, 9) + 527.04 * Math.pow(10, 6), y: 0, vx: 0, vy: 9.68 * Math.pow(10, 3) + 8.52 * Math.pow(10, 3), name: 'Рея'},  // Рея
    {id: 23, m: 0.001586 * Math.pow(10, 24), r: 606 * Math.pow(10, 3), x: 5936.82 * Math.pow(10, 9) + 19591 * Math.pow(10, 3), y: 0, vx: 0, vy: 4.67 * Math.pow(10, 3) + 0.21 * Math.pow(10, 3), name: 'Харон'},  // Харон
];

function App() {
    const [time, setTime] = useState(Date.now());
    const [maxWeight, setMaxWeight] = useState(0)
    const [showForces, toggleForces] = useState(false)

    const handleChange = () => {
        toggleForces(!showForces);
    };


    useEffect(() => {
        const interval = setInterval(() => {
                setTime(Date.now());
                camera.updatePosition()
                calcStars();
                for (let i in stars) {
                    if (stars[i].m > maxWeight) setMaxWeight(stars[i].m)
                }
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
            {/*}
            <div className="time">
                <p>{timeConverter(time)}</p>
                <p>stars left: {stars.length}</p>
                <p>max weight: {maxWeight}</p>
                <label>
                    <input type="checkbox" checked={showForces} onChange={handleChange} />
                    Показывать силу и скорость
                </label>
            </div>
            */}
            <div className="stars-wrapper">
                {stars.map(star =>
                    <Star key={star.id} star={{...star}} />
                )}
            </div>
            {/*}
            <Controls />
            */}
        </div>
    );
}

function calcStars() {
    //сначала поиск столкновений
    for (let i = 0; i < stars.length - 1; ++i) {
        for (let j = i + 1; j < stars.length; ++j) {
            let r1 = stars[i].r
            let r2 = stars[j].r
            let r = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
            if (r < r1 || r < r2) {
                //столкновение
               // stars[i].m += stars[j].m
               // stars[i].vx = (stars[j].vx * stars[j].m + stars[i].vx * stars[i].m) / (stars[i].m + stars[j].m)
                //stars[i].vy += (stars[j].vy * stars[j].m + stars[i].vy * stars[i].m) / (stars[i].m + stars[j].m)
                //stars[j] = undefined;
                    //stars.splice(j, 1);
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
            camera.setX(stars[i].x - window.innerWidth/2 / camera.scale)
            camera.setY(stars[i].y - window.innerHeight/2 / camera.scale)
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
        camera.setX(camera.x + offsetX / camera.scale);
        camera.setY(camera.y + offsetY / camera.scale);
    } else {
        camera.decScale()
        camera.setX(camera.x + offsetX / camera.scale);
        camera.setY(camera.y + offsetY / camera.scale);
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
        camera.strongSetX(camera.x - deltaX);
        camera.strongSetY(camera.y - deltaY);
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
