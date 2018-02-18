const raf = window.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};



export default raf;
