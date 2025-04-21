const fs = require("fs");
const s = Number(fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString())

const visit = Array(1001).fill(null).map(() => Array(1001).fill(false))
const queue = [[1, 0, 0]]

while (queue.length > 0) {
    const [emoji, copy, time] = queue.shift()

    if (emoji === s) {
        console.log(time)
        break
    }

    if (!visit[emoji][emoji]) {
        visit[emoji][emoji] = true
        queue.push([emoji, emoji, time + 1])
    }

    if (copy > 0 && emoji + copy <= 1000 && !visit[emoji + copy][copy]) {
        visit[emoji + copy][copy] = true
        queue.push([emoji + copy, copy, time + 1])
    }

    if (emoji > 1 && !visit[emoji - 1][copy]) {
        visit[emoji - 1][copy] = true
        queue.push([emoji - 1, copy, time + 1])
    }
}
