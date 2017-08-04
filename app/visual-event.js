/* globals window */

import MatchTool from './tools/match';
import steplizePoint from './tools/steplize';
import { scaleReverse } from './tools/scalelize';

const Event = self => {
    const canvas = self.canvas;
    let mousedownPos = [];
    let hoveredObj = [];
    let pickupedObj = [];
    const step = self.options.grid.step;

    canvas.addEventListener('mousedown', e => {
        if (hoveredObj.length >= 1) {
            pickupedObj = [{
                pathSnapshoot: JSON.parse(JSON.stringify(hoveredObj[0].data.path)),
                origin: Object.assign(hoveredObj[0]),
            }];
            mousedownPos = scaleReverse([
                [e.pageX, e.pageY],
            ], self.options.grid.scale)[0];
        }
    });

    window.addEventListener('mousemove', e => {
        let x = 0;
        let y = 0;
        if (pickupedObj.length === 0) {
            x = e.offsetX;
            y = e.offsetY;
            if (e.target !== canvas) {
                x = -999;
                y = -999;
            }

            [x, y] = scaleReverse([
                [x, y],
            ], self.options.grid.scale)[0];

            hoveredObj = MatchTool.match([x, y], self.sys.objects);
        } else {
            x = e.pageX;
            y = e.pageY;
            [x, y] = scaleReverse([
                [x, y],
            ], self.options.grid.scale)[0];
            let movedPos = [x - mousedownPos[0], y - mousedownPos[1]];
            movedPos = steplizePoint(movedPos, step);

            const snapShootPath = pickupedObj[0].pathSnapshoot;

            let newPath = [];
            const isMoveSingle = (pickupedObj[0].origin.type === 'point') && (pickupedObj[0].origin.length < 10);
            if (isMoveSingle) {
                const singleIndex = pickupedObj[0].origin.index;
                const path = pickupedObj[0].origin.data.path;
                path[singleIndex][0] = snapShootPath[singleIndex][0] + movedPos[0];
                path[singleIndex][1] = snapShootPath[singleIndex][1] + movedPos[1];
                path[singleIndex] = steplizePoint(path[singleIndex], step);
            } else {
                newPath = snapShootPath.map(item => {
                    let x = item[0];
                    let y = item[1];
                    x += movedPos[0];
                    y += movedPos[1];
                    return steplizePoint([x, y], step);
                });
                pickupedObj[0].origin.data.path = newPath;
            }
            e.preventDefault();
        }
        self.draw();
    });


    window.addEventListener('mouseup', () => {
        pickupedObj = [];
        mousedownPos = [];
    });
};

export default Event;