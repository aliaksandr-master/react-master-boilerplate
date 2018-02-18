export const disableMainPreloader = () => {
  const loader = window.document.getElementById('sm-loader');

  if (!loader) {
    return;
  }

  loader.classList.remove('-animation');
  loader.style.opacity = 0;

  setTimeout(() => {
    loader.parentNode.removeChild(loader);
  }, 300);
};
