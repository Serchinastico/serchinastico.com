const clamp = (min, max, a) => Math.min(max, Math.max(min, a));
const lerp = (x, y, a) => clamp(x, y, x * (1 - a) + y * a);
