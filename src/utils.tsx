export function generatePoints() {
  const points = [];
  for (let i = 0; i < 10000; i++) {
    points.push({
      x: Math.random() * 20 - 10,
      y: Math.random() * 25 - 10,
      z: Math.random() * 15,
    });
  }
  return points;
}
