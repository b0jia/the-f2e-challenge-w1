// Converts from degrees to radians.
const toRadians = degrees => (degrees * Math.PI) / 180;

// Converts from radians to degrees.
const toDegrees = radians => (radians * 180) / Math.PI;

const inRange = (number, min = 0, max = 1) => Math.min(Math.max(parseFloat(number), min), max);

export { inRange, toRadians, toDegrees };
