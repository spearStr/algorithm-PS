const fs = require('fs')
const [N, K] = fs.readFileSync('dev/stdin').toString().trim().split(' ').map(Number)

const bfs = () => {
    const queue = [[N, 0]];
    const visit = Array(100001).fill(false);
    visit[N] = true;
  
    while (queue.length > 0) {
      const [standard, time] = queue.shift();
  
      if (standard === K) {
        console.log(time);
        return;
      }
  
      for (let next of [standard * 2, standard - 1, standard + 1]) {
        if (next < 0 || next > 100000 || visit[next]) continue;
  
        if (next === standard * 2) {
          queue.unshift([next, time]);
        } else {
          queue.push([next, time + 1]);
        }
        visit[next] = true;
      }
    }
  };
  
  bfs();