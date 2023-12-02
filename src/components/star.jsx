import React, {useMemo} from 'react';
import {observer} from "mobx-react";
import camera from "./../store/camera";

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

    return (
        <div className="star" style={style} onClick={() => camera.fix(star.id)}>
            {/*<div className="force" style={forceStyle}>*/}
            {/*</div>*/}
            <span style={{color: '#fff', position: 'absolute'}}>{r}</span>
        </div>
    );
});

export default Star;