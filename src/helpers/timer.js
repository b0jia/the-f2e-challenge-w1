// export default class Timer {
//   constructor(options) {}
// }

// export default function timer(callback, delay) {
//   let timerId = null;
//   let start = null;
//   let remaining = delay;

//   this.pause = () => {
//     window.clearInterval(timerId);
//     remaining -= Date.now() - start;
//   };

//   this.resume = () => {
//     start = Date.now();
//     window.clearInterval(timerId);
//     timerId = window.setInterval(callback, remaining);
//   };

//   this.resume();
// }

export default {
  interval(callback, delay) {
    let timerId = null;
    let start = null;
    let remaining = delay;

    this.pause = () => {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    const resume = () => {
      start = new Date();
      timerId = window.setTimeout(() => {
        remaining = delay;
        resume();
        callback();
      }, remaining);
    };

    this.resume = resume;

    this.resume();

    this.destroy = () => {
      window.clearTimeout(timerId);
      timerId = null;
      start = null;
    };

    return this;
  },
  timeout() {},
};
