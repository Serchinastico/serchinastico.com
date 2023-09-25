/**
 * Clamp restricts a certain value X between a Min and Max values.
 * If X < Min then Min is returned
 * If X > Max then Max is returned
 * Else X is returned
 */
const clamp = (min, max, x) => Math.min(max, Math.max(min, x));

/**
 * Lerp stands for Linear Interpolation. Given two values X and Y
 * and normalized value T between 0 and 1, it returns a value between
 * X and Y that is proportional to the value T.
 */
const lerp = (x, y, t) => clamp(x, y, x * (1 - t) + y * t);
