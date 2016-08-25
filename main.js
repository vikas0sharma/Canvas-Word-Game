(function () {


    var myCanvas = document.getElementById('myCanvas');
    var context;
    var ans = document.getElementById('ansTxt');
    var modal = document.getElementById('myModal');

    var container = {
        x: 0,
        y: 0,
        width: 800,
        height:800
    };


    //var x = 100, y = 100, dx = 5, dy = 5;

    var xmlhttp = new XMLHttpRequest();
    var url = "data.js";
    var words;
    var bubbles = [];
    var randomWord;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            words = JSON.parse(xmlhttp.responseText);
            console.log(words);
            var nRnd = Math.floor((Math.random() * words.length));
            randomWord = words[nRnd].toString();
            for (var i = 0; i < randomWord.length; i++) {
                //bubbles.push(new Bubble(Math.abs(Math.floor((Math.random() * container.width) - 30)), Math.abs(Math.floor((Math.random() * container.width) - 30)), 30, Math.abs((Math.floor((Math.random() * 10) + 1))), Math.abs((Math.floor((Math.random() * 10) + 1))), getRandomColor(), randomWord[i]));
                bubbles.push(new Bubble(getRandomInt(30, 750), getRandomInt(30, 750), 30, getRandomInt(1, 10), getRandomInt(1, 10), getRandomColor(), randomWord[i]));

            }
            console.log(bubbles);
            setInterval(function () {
                draw(bubbles);
            }, 100);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    myCanvas.addEventListener("click", function (e) {

        var clickedX = e.pageX - this.offsetLeft;
        var clickedY = e.pageY - this.offsetTop;

        for (var i = 0; i < bubbles.length; i++) {
            if (clickedX < bubbles[i].right && clickedX > bubbles[i].left && clickedY > bubbles[i].top && clickedY < bubbles[i].bottom) {
                ans.value = ans.value + bubbles[i].alpha;
                bubbles.splice(i, 1);
            }
            console.log(randomWord.length);
            if (ans.value.length == randomWord.length)
            {
                modal.style.display = "block";
                if (ans.value == randomWord) {
                    document.getElementById('feedback').innerHTML="Congrats!! Right Answer"
                }
                else {
                    document.getElementById('feedback').innerHTML = "Sorry! Try Again"
                }
            }
           
        }
    });

    function Bubble(x, y, r, dx, dy, color, alpha) {

        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.alpha = alpha;
        this.left = x - r;
        this.top = y - r;
        this.right = x + r;
        this.bottom = y + r;
    }

    function draw()
    {
        context = myCanvas.getContext('2d');
        //context.fillStyle = "Black";
        //context.fillRect(container.x, container.y, container.height, container.width);
        context.clearRect(0, 0, container.height, container.width);

        for (var i = 0; i < bubbles.length; i++) {
            context.fillStyle = bubbles[i].color;
            context.beginPath();
            context.arc(bubbles[i].x, bubbles[i].y, bubbles[i].r, 0, Math.PI * 2, true);
            context.fill();
            context.lineWidth = "5";
            context.strokeStyle ="white";
            context.stroke();
            if (bubbles[i].x - bubbles[i].r + bubbles[i].dx < container.x || bubbles[i].x + bubbles[i].r + bubbles[i].dx > container.x + container.width) {
                bubbles[i].dx = -bubbles[i].dx;
            }

            if (bubbles[i].y + bubbles[i].r + bubbles[i].dy > container.y + container.height || bubbles[i].y - bubbles[i].r + bubbles[i].dy < container.y) {
                bubbles[i].dy = -bubbles[i].dy;
            }

            bubbles[i].x += bubbles[i].dx
            bubbles[i].y += bubbles[i].dy
            bubbles[i].left = bubbles[i].x - bubbles[i].r;
            bubbles[i].top = bubbles[i].y - bubbles[i].r;
            bubbles[i].right = bubbles[i].x + bubbles[i].r;
            bubbles[i].bottom = bubbles[i].y + bubbles[i].r;

            context.font = '20pt Calibri';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(bubbles[i].alpha, bubbles[i].x, bubbles[i].y);
        }
       
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
})()