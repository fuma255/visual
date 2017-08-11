import VisualObject from './object';
import steplizePoint from '../tools/steplize';

class Line extends VisualObject {
    constructor(Visual, pathParams = [], options) {
        super();
        this.Visual = Visual;
        this.id = Symbol('line');

        const path = JSON.parse(JSON.stringify(pathParams));

        const outBox = {
            xMin: Infinity,
            xMax: -Infinity,
            yMin: Infinity,
            yMax: -Infinity,
        };

        path.forEach(point => {
            outBox.xMin = Math.min(outBox.xMin, point[0]);
            outBox.xMax = Math.max(outBox.xMax, point[0]);
            outBox.yMin = Math.min(outBox.yMin, point[1]);
            outBox.yMax = Math.max(outBox.yMax, point[1]);
        });

        this.Visual.sys.objects.push({
            id: this.id,
            type: Visual.sys.objectTypes.line,
            path: path.map(point => steplizePoint(point, this.Visual.options.grid.step)),
            options: JSON.parse(JSON.stringify(options)),
            object: this,
            sys: {
                outBox,
            },
        });
        this.Visual.draw();
    }
}

export default Line;