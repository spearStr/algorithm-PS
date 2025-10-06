function solution(bridge_length, weight, truck_weights) {
  let time = 1

  const bridge = []

  let currentWeight = 0

  for (const w of truck_weights) {
    while (true) {
      while (bridge.length > 0 && bridge[0].exit <= time) {
        currentWeight -= bridge.shift().w
      }

      if (currentWeight + w <= weight && bridge.length < bridge_length) {
        bridge.push({ w: w, exit: time + bridge_length })
        currentWeight += w
        time += 1
        break
      }

      if (bridge.length > 0) {
        time = bridge[0].exit
      } else {
        time += 1
      }
    }
  }

  return bridge.length > 0 ? bridge[bridge.length - 1].exit : 0
}