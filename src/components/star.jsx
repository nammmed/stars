import React, {useMemo} from 'react';
import {observer} from "mobx-react";
import camera from "./../store/camera";
import G from "./../App"

const Star = observer(({star}) => {
    const {m, x, y} = star;
    let r = Math.round(Math.sqrt(m / Math.PI) * camera.scale)
    if (r < 1) r = 1
    let left = Math.round((x - camera.x) * camera.scale - r);
    let top = Math.round((y - camera.y) * camera.scale - r);

    const style = useMemo(() => {
        return {
            left: left,
            top: top,
            width: r * 2,
            height: r * 2,
        }
    }, [left, top, r])

    const forceStyle = {
        width: Math.sqrt(star.fx ** 2 + star.fy ** 2) / G,
        transform: `rotate(${Math.atan2(star.fy, star.fx)}rad)`
    };
    const speedStyle = {
        width: Math.sqrt(star.vx ** 2 + star.vy ** 2) / G,
        transform: `rotate(${Math.atan2(star.vy, star.vx)}rad)`
    };

    return (
        <div className="star" style={style} onClick={() => camera.fix(star.id)}>
            {/*<div className="force" style={forceStyle} />
            <div className="speed" style={speedStyle} />*/}
            {/*<span style={{color: '#fff', position: 'absolute'}}>{star.fx} : {star.fy}</span>*/}
        </div>
    );
});

export default Star;