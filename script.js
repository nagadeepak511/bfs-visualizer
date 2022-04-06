var board = document.querySelector('#board');

var n=10;

for(var i=0; i<n*n; i++) {
    var cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = ' ';
    cell.setAttribute('index', i);
    cell.addEventListener('click', (e)=>{
        var msg = prompt('Enter s for start or d for destination: ');
        if(msg == 's') {
            document.querySelector('.beg')?.classList.remove('beg');
            e.target.classList.add('beg');
        } else if(msg == 'd') {
            document.querySelector('.end')?.classList.remove('end');
            e.target.classList.add('end');
        }
    })
    board.appendChild(cell);
}

class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    length() {
      return this.tail - this.head;
    }
    isEmpty() {
      return this.length === 0;
    }
}

var bfs = () => {
    var cells = [...document.querySelectorAll('.cell')];
    var start = document.querySelector('.beg')?.getAttribute('index');
    var end = document.querySelector('.end')?.getAttribute('index');

    if(!start || !end) {
        alert('Please select proper start and end nodes')
        return;
    }

    var visited = [];
    for(var i=0; i<n*n; i++) visited.push(false);

    var q = new Queue();
    q.enqueue(start);

    var fps = 150;
    var now;
    var then = Date.now();
    var interval = 1000/fps;
    var delta;

    var count = 0;
    var rafcallback = (callback) => {
        count++;
        console.log(q.elements);
        if(!visited[end]) requestAnimationFrame(rafcallback);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
             
            var top = q.dequeue();
            visited[top] = true;
            if(top == end) {
                alert('Found the end node');
                return;
            }
            cells[top].classList.add('visited');
            console.log(callback);
            cells[top].style.backgroundColor = `rgba(135, 206, 235, ${(100-count)/100 > 0.5 ? (100-count)/100 : 0.5}`;

            if(top/n > 0 && visited[top - n] == false) q.enqueue(top - n);
            if(top%n < 24 && visited[top + 1] == false) q.enqueue(top + 1);
            if(top/n < 24 && visited[top + n] == false) q.enqueue(top + n);
            if(top%n > 0 && visited[top - 1] == false) q.enqueue(top - 1);
        }
    };

    if(!visited[end]) requestAnimationFrame(rafcallback);
}