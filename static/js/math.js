const clamp = (min, max, a) => Math.min(max, Math.max(min, a));
const lerp = (x, y, a) => x * (1 - a) + y * a;
const easeInSine = (x) => 1 - Math.cos((x * Math.PI) / 2);
