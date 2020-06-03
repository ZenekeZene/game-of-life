export default function IntervalTimer(callback, intervalInitial) {
  let timerId = 0;
  let startTime = 0;
  let remaining = 0;
  let state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed
  this.interval = intervalInitial;

  this.pause = () => {
    if (state !== 1) return;

    remaining = this.interval - (new Date() - startTime);
    window.clearInterval(timerId);
    state = 2;
  };

  this.resume = () => {
    if (state !== 2) return;

    state = 3;
    window.setTimeout(this.timeoutCallback, remaining);
  };

  this.timeoutCallback = () => {
    if (state !== 3) return;

    callback();

    startTime = new Date();
    timerId = window.setInterval(callback, this.interval);
    state = 1;
  };

  startTime = new Date();
  timerId = window.setInterval(callback, this.interval);
  state = 1;
}
