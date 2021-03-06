function DrawLine(Visual, obj, options) {
    // console.log(obj);
    const ctx = Visual.ctx;
    // draw basic line
    ctx.beginPath();
    ctx.save();

    Object.keys(obj.options).forEach(key => {
        ctx[key] = obj.options[key];
    });
    const usePath = obj.path;
    usePath.forEach((item, index) => {
        if (index === 0) {
            ctx.moveTo(item[0], item[1]);
        } else {
            ctx.lineTo(item[0], item[1]);
        }
    });
    ctx.stroke();
    ctx.restore();

    if (obj && obj.isActive) {
        ctx.canvas.style.cursor = 'pointer';
        ctx.save();
        // draw base line
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = '#d6d6d6';
        usePath.forEach((item, index) => {
            if (index === 0) {
                ctx.moveTo(item[0] + 1, item[1] + 1);
            } else {
                ctx.lineTo(item[0] + 1, item[1] + 1);
            }
        });
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        usePath.forEach((item, index) => {
            if (index === 0) {
                ctx.moveTo(item[0], item[1]);
            } else {
                ctx.lineTo(item[0], item[1]);
            }
        });
        ctx.stroke();

        // draw handle
        ctx.beginPath();
        ctx.strokeStyle = '#d6d6d6';
        usePath.forEach(item => {
            ctx.rect(item[0] - 4, item[1] - 4, 8, 8);
        });
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        usePath.forEach(item => {
            ctx.rect(item[0] - 3, item[1] - 3, 6, 6);
        });
        ctx.stroke();

        let strokeRadius = 14;
        let strokeStyle = 'rgba(255, 0, 0, 1)';
        let fillStyle = '#f00';
        if (options) {
            if (options.strokeRadius) {
                strokeRadius = options.strokeRadius;
            } else if (options.strokeStyle) {
                strokeStyle = options.strokeStyle;
            } else if (options.fillStyle) {
                fillStyle = options.fillStyle;
            }
        }
        if (obj.isActive.type === 'point' && obj.isActive.length < 10) {
            if (obj.isActive.indexs) {
                obj.isActive.indexs.map(index => {
                    const point = usePath[index];
                    ctx.beginPath();
                    ctx.strokeStyle = strokeStyle;
                    ctx.fillStyle = fillStyle;
                    ctx.rect(point[0] - (strokeRadius / 2), point[1] - (strokeRadius / 2), strokeRadius, strokeRadius, Math.PI * 2);
                    ctx.stroke();
                });
            } else {
                const point = usePath[obj.isActive.index];
                ctx.beginPath();
                ctx.strokeStyle = strokeStyle;
                ctx.fillStyle = fillStyle;
                ctx.rect(point[0] - (strokeRadius / 2), point[1] - (strokeRadius / 2), strokeRadius, strokeRadius, Math.PI * 2);
                ctx.stroke();
            }
        }

        ctx.restore();
    }
}

export default DrawLine;