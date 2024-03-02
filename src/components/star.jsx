import React, {useMemo} from 'react';
import {observer} from "mobx-react";
import camera from "./../store/camera";
import G from "./../App"

const Star = observer(({star}) => {
    const {m, x, y, r, name} = star;
    let visible_radius = Math.round(r * camera.scale)
    if (visible_radius < 1) visible_radius = 1
    let left = Math.round((x - camera.x) * camera.scale - visible_radius);
    let top = Math.round((y - camera.y) * camera.scale - visible_radius);

    const style = useMemo(() => {
        return {
            left: left,
            top: top,
            width: visible_radius * 2,
            height: visible_radius * 2,
        }
    }, [left, top, visible_radius])

    const forceStyle = {
        width: Math.sqrt(star.fx ** 2 + star.fy ** 2) / G,
        transform: `rotate(${Math.atan2(star.fy, star.fx)}rad)`
    };
    const speedStyle = {
        width: Math.sqrt(star.vx ** 2 + star.vy ** 2) / G,
        transform: `rotate(${Math.atan2(star.vy, star.vx)}rad)`
    };

    return (
        <div className="star" style={style} onClick={() => camera.fix(star.id)} title={name}>
            {camera.showForces &&
                <>
                    <div className="force" style={forceStyle}/>
                    <div className="speed" style={speedStyle} />
                </>
            }
            {/*<span style={{color: '#fff', position: 'absolute'}}>{star.fx} : {star.fy}</span>*/}
        </div>
    );
});

export default Star;