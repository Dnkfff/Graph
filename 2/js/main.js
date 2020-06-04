
'use strict';

window.onload = function (matrix) {

    const draw = (matrix) => {

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        ctx.font = '14px Tahoma';

        const couple = [];
        const points = [];


        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < 11; j++) {
                if (matrix[i][j] === 1) {
                    couple.push([i + 1, j + 1]);
                }
            }
        }

        // Вхідні і вихідні точки стрілок
        let input = [];
        let output = [];

        const CIRCLE = (numsOfTops) => {
            const centX = 425;
            const centY = 425;
            const bigCircle = 275;

            const angle = 2 * Math.PI / (numsOfTops - 1);

            let startAngle = Math.PI;
            ctx.beginPath()
            ctx.arc(centX, centY, 20, 0, Math.PI * 2);
            ctx.fillText(1, centX - 3, centY + 2);
            ctx.stroke();



            for (let i = 0; i < numsOfTops; i++) {


                let centerXOfNewVertex = centX + (bigCircle * Math.sin(startAngle));
                let centerYOfNewVertex = centY + (bigCircle * Math.cos(startAngle));

                points.push([centerXOfNewVertex, centerYOfNewVertex]);

                output.push({
                    right: [centerXOfNewVertex + 20, centerYOfNewVertex],
                    left: [centerXOfNewVertex - 20, centerYOfNewVertex]
                });

                input.push({
                    top: [centerXOfNewVertex, centerYOfNewVertex - 20],
                    bottom: [centerXOfNewVertex, centerYOfNewVertex + 20]
                });

                ctx.beginPath();

                ctx.arc(centerXOfNewVertex, centerYOfNewVertex, 20, 0, Math.PI * 2);

                ctx.fillText(i + 1, centerXOfNewVertex - 4, centerYOfNewVertex + 2);

                ctx.stroke();
                ctx.closePath();

                startAngle -= angle;
            }
        };

        CIRCLE(matrix.length);


        //Визначаємо пари вершин які мають зв'язоk
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < 11; j++) {
                if (matrix[i][j] === 1) {
                    couple.push([i + 1, j + 1]);
                }
            }
        };

        console.log(couple)



        const arrows = (fromX, fromY, toX, toY) => {
            const arrowSize = 8;
            let dx = toX - fromX;
            let dy = toY - fromY;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(fromX, fromY);
            const angle = Math.atan2(dy, dx);

            ctx.lineTo(toX, toY);
            ctx.lineTo(
                toX - arrowSize * Math.cos(angle - Math.PI / 6),
                toY - arrowSize * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(toX, toY);
            ctx.lineTo(
                toX - arrowSize * Math.cos(angle + Math.PI / 6),
                toY - arrowSize * Math.sin(angle + Math.PI / 6));
            ctx.stroke();

        }

        // Циклом будуємо стрілки
        for (let i = 0; i < couple.length; i++) {
            let fromX;
            let fromY;
            let toX;
            let toY;

            if (couple[i][0] === couple[i][1]) {
                ctx.beginPath();
                ctx.arc(points[couple[i][0] - 1][0], points[couple[i][0] - 1][1] - 26, 7, 0, 2 * Math.PI)
                ctx.stroke();
            } else if (points[couple[i][0] - 1][0] < points[couple[i][1] - 1][0]) {
                fromX = output[couple[i][0] - 1].right[0];
                fromY = output[couple[i][0] - 1].right[1];
                if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
                    toX = input[couple[i][1] - 1].top[0];
                    toY = input[couple[i][1] - 1].top[1];
                } else {
                    toX = input[couple[i][1] - 1].bottom[0];
                    toY = input[couple[i][1] - 1].bottom[1];
                }
            } else {
                fromX = output[couple[i][0] - 1].left[0];
                fromY = output[couple[i][0] - 1].left[1];
                if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
                    toX = input[couple[i][1] - 1].top[0];
                    toY = input[couple[i][1] - 1].top[1];
                } else {
                    toX = input[couple[i][1] - 1].bottom[0];
                    toY = input[couple[i][1] - 1].bottom[1];
                }
            }

            arrows(fromX, fromY, toX, toY)

        }

        let d = {
            exit1: 0,
            exit2: 0,
            exit3: 0,
            exit4: 0,
            exit5: 0,
            exit6: 0,
            exit7: 0,
            exit8: 0,
            exit9: 0,
            exit10: 0,

            enter1: 0,
            enter2: 0,
            enter3: 0,
            enter4: 0,
            enter5: 0,
            enter6: 0,
            enter7: 0,
            enter8: 0,
            enter9: 0,
            enter10: 0,
        };





        for (let i = 0; i < 8; i++) {
            for (let j = 1; j === 1; j++) {
                if (couple[i][j] === 1) {
                    d.enter1 += 1;
                } else if (couple[i][j] === 2) {
                    d.enter2 += 1;
                } else if (couple[i][j] === 3) {
                    d.enter3 += 1;
                } else if (couple[i][j] === 4) {
                    d.enter4 += 1;
                } else if (couple[i][j] === 5) {
                    d.enter5 += 1;
                } else if (couple[i][j] === 6) {
                    d.enter6 += 1;
                } else if (couple[i][j] === 7) {
                    d.enter7 += 1;
                } else if (couple[i][j] === 8) {
                    d.enter8 += 1;
                } else if (couple[i][j] === 9) {
                    d.enter9 += 1;
                } else if (couple[i][j] === 10) {
                    d.enter10 += 1;
                }
            }

        };

        console.log(couple[0][0])

        console.log(d)

        document.getElementById("counter1").innerHTML = d.enter1;
        document.getElementById("counter2").innerHTML = d.enter2;
        document.getElementById("counter3").innerHTML = d.enter3;
        document.getElementById("counter4").innerHTML = d.enter4;
        document.getElementById("counter5").innerHTML = d.enter5;
        document.getElementById("counter6").innerHTML = d.enter6;
        document.getElementById("counter7").innerHTML = d.enter7;
        document.getElementById("counter8").innerHTML = d.enter8;
        document.getElementById("counter9").innerHTML = d.enter9;
        document.getElementById("counter10").innerHTML = d.enter10;





        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 1; j++) {
                if (couple[i][j] === 1) {
                    d.exit1 += 1;
                } else if (couple[i][j] === 2) {
                    d.exit2 += 1;
                } else if (couple[i][j] === 3) {
                    d.exit3 += 1;
                } else if (couple[i][j] === 4) {
                    d.exit4 += 1;
                } else if (couple[i][j] === 5) {
                    d.exit5 += 1;
                } else if (couple[i][j] === 6) {
                    d.exit6 += 1;
                } else if (couple[i][j] === 7) {
                    d.exit7 += 1;
                } else if (couple[i][j] === 8) {
                    d.exit8 += 1;
                } else if (couple[i][j] === 9) {
                    d.exit9 += 1;
                } else if (couple[i][j] === 10) {
                    d.exit10 += 1;
                }
            }

        };


        document.getElementById("countt1").innerHTML = d.exit1;
        document.getElementById("countt2").innerHTML = d.exit2;
        document.getElementById("countt3").innerHTML = d.exit3;
        document.getElementById("countt4").innerHTML = d.exit4;
        document.getElementById("countt5").innerHTML = d.exit5;
        document.getElementById("countt6").innerHTML = d.exit6;
        document.getElementById("countt7").innerHTML = d.exit7;
        document.getElementById("countt8").innerHTML = d.exit8;
        document.getElementById("countt9").innerHTML = d.exit9;
        document.getElementById("countt10").innerHTML = d.exit10;



        console.log(matrix);

    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const draw2 = (matrix) => {

        let canvas = document.getElementById('canv1');
        let ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        ctx.font = '14px Tahoma';

        const couple = [];
        const points = [];


        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < 11; j++) {
                if (matrix[i][j] === 1) {
                    couple.push([i + 1, j + 1]);
                }
            }
        }

        // малюємо вершини
        // Вхідні і вихідні точки стрілок
        let input = [];
        let output = [];

        const CIRCLE = (numsOfTops) => {
            const centX = 425;
            const centY = 425;
            const bigCircle = 275;

            const angle = 2 * Math.PI / (numsOfTops - 1);

            let startAngle = Math.PI;
            ctx.beginPath()
            ctx.arc(centX, centY, 20, 0, Math.PI * 2);
            ctx.fillText(1, centX - 3, centY + 2);
            ctx.stroke();


            for (let i = 0; i < numsOfTops; i++) {


                let centerXOfNewVertex = centX + (bigCircle * Math.sin(startAngle));
                let centerYOfNewVertex = centY + (bigCircle * Math.cos(startAngle));

                points.push([centerXOfNewVertex, centerYOfNewVertex]);

                output.push({
                    right: [centerXOfNewVertex + 20, centerYOfNewVertex],
                    left: [centerXOfNewVertex - 20, centerYOfNewVertex]
                });

                input.push({
                    top: [centerXOfNewVertex, centerYOfNewVertex - 20],
                    bottom: [centerXOfNewVertex, centerYOfNewVertex + 20]
                });

                ctx.beginPath();

                ctx.arc(centerXOfNewVertex, centerYOfNewVertex, 20, 0, Math.PI * 2);

                ctx.fillText(i + 1, centerXOfNewVertex - 4, centerYOfNewVertex + 2);

                ctx.stroke();
                ctx.closePath();

                startAngle -= angle;
            }
        };

        // Будуэмо вершини
        CIRCLE(matrix.length);



        //Визначаємо пари вершин які мають зв'язоk
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < 11; j++) {
                if (matrix[i][j] === 1) {
                    couple.push([i + 1, j + 1]);
                }
            }
        };

        const arrows = (fromX, fromY, toX, toY) => {
            const arrowSize = 8;
            let dx = toX - fromX;
            let dy = toY - fromY;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(fromX, fromY);
            const angle = Math.atan2(dy, dx);

            ctx.lineTo(toX, toY);
            ctx.stroke();

        }




        // будуэмо вершини ненапрямленого графа
        for (let i = 0; i < couple.length; i++) {
            let fromX;
            let fromY;
            let toX;
            let toY;

            if (couple[i][0] === couple[i][1]) {
                ctx.beginPath();
                ctx.arc(points[couple[i][0] - 1][0], points[couple[i][0] - 1][1] - 26, 7, 0, 2 * Math.PI)
                ctx.stroke();
            } else if (points[couple[i][0] - 1][0] < points[couple[i][1] - 1][0]) {
                fromX = output[couple[i][0] - 1].right[0];
                fromY = output[couple[i][0] - 1].right[1];
                if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
                    toX = input[couple[i][1] - 1].top[0];
                    toY = input[couple[i][1] - 1].top[1];
                } else {
                    toX = input[couple[i][1] - 1].bottom[0];
                    toY = input[couple[i][1] - 1].bottom[1];
                }
            } else {
                fromX = output[couple[i][0] - 1].left[0];
                fromY = output[couple[i][0] - 1].left[1];
                if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
                    toX = input[couple[i][1] - 1].top[0];
                    toY = input[couple[i][1] - 1].top[1];
                } else {
                    toX = input[couple[i][1] - 1].bottom[0];
                    toY = input[couple[i][1] - 1].bottom[1];
                }
            }


            arrows(fromX, fromY, toX, toY)

        }

        // рахуэмо степені вершин ненапрямленного графа
        let deg = {
            counter1: 0,
            counter2: 0,
            counter3: 0,
            counter4: 0,
            counter5: 0,
            counter6: 0,
            counter7: 0,
            counter8: 0,
            counter9: 0,
            counter10: 0,
        };




        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 2; j++) {
                if (couple[i][j] === 1) {
                    deg.counter1 += 1;
                } else if (couple[i][j] === 2) {
                    deg.counter2 += 1;
                } else if (couple[i][j] === 3) {
                    deg.counter3 += 1;
                } else if (couple[i][j] === 4) {
                    deg.counter4 += 1;
                } else if (couple[i][j] === 5) {
                    deg.counter5 += 1;
                } else if (couple[i][j] === 6) {
                    deg.counter6 += 1;
                } else if (couple[i][j] === 7) {
                    deg.counter7 += 1;
                } else if (couple[i][j] === 8) {
                    deg.counter8 += 1;
                } else if (couple[i][j] === 9) {
                    deg.counter9 += 1;
                } else if (couple[i][j] === 10) {
                    deg.counter10 += 1;
                }
            }

        };

        document.getElementById("count1").innerHTML = deg.counter1;
        document.getElementById("count2").innerHTML = deg.counter2;
        document.getElementById("count3").innerHTML = deg.counter3;
        document.getElementById("count4").innerHTML = deg.counter4;
        document.getElementById("count5").innerHTML = deg.counter5;
        document.getElementById("count6").innerHTML = deg.counter6;
        document.getElementById("count7").innerHTML = deg.counter7;
        document.getElementById("count8").innerHTML = deg.counter8;
        document.getElementById("count9").innerHTML = deg.counter9;
        document.getElementById("count10").innerHTML = deg.counter10;



    }


    // Викликаэмо функції
    draw([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],

    ]);

    draw2([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ]);


}

