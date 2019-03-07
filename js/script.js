let canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d"),
  H = (canvas.height = 600);
W = canvas.width = 600;
document.body.appendChild(canvas);

let current = 0;

function loop() {
  let small_side = Math.min(W, H);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, W, H);
  let rings = [];
  for (let i = 0; i < 20; i++) {
    let size = (Util.map(i,0,20,0,small_side) + current*2)%small_side;
    let depth = Util.map(size, 0, small_side, 1, 0);
    let c_x = W / 2,
      c_y = H / 2;
    let x = c_x + Math.sin((depth * 100 + current) * 0.04) * 100 * depth,
      y = c_y + Math.sin((depth * 200 + current) * 0.02) * 80 * depth;
    rings.push({ x: x, y: y, size: size, depth: depth });
  }
  rings
    .sort(function(p1, p2) {
      if (p1.depth > p2.depth) return -1;
      if (p1.depth < p2.depth) return 1;
    })
    .forEach((r, i) => {
      hole(
        r.x,
        r.y,
        r.size,
        r.size,
        "hsl(0,0%," + (r.depth * 100) + "%)"
      );
    });
  current = requestAnimationFrame(loop);
}

loop();

function hole(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, x - w / 2, H);
  ctx.fillRect(W, 0, -W + x + w / 2, H);
  ctx.fillRect(0, 0, W, y - h / 2);
  ctx.fillRect(0, H, W, -H + y + h / 2);
}
