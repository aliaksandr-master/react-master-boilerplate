/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
setTimeout(() => {
  window.document.body.insertAdjacentHTML('beforeend', `
    <div id="dev-menu">
      <div id="dev-menu__in">
        <div id="dev-menu__h">Dev Menu</div>
        <a href="/">Home</a>
        <a href="/-index-main-/app">Main</a>
        <a href="/-index-main-/sandbox">Sandbox</a>
        <a id="dev-menu-mocking-proxy" href="/-mock-proxy-/">Mocking Proxy</a>
        <a href="/-coverage-/">Coverage</a>
        <a href="/-images-/">Images</a>
      </div>
      <style>
        #dev-menu {
          display: block;
          position: fixed;
          font-family: monospace;
          top: 0;
          background: white;
          box-shadow: 0 1px 6px rgba(0,0,0,0.3);
          z-index: 999999;
          border-radius: 0 0 0 4px;
          overflow: hidden;
          max-width: 6px;
          box-sizing: border-box;
          transition: max-width 0.3s ease-in-out, right 0.3s ease-in-out;
          width: 150px;
          right: -140px;
        }
  
        #dev-menu:hover {
          max-width: 1000px;
          right: 0;
        }

        #dev-menu__in {
          padding: 10px;
        }
  
        #dev-menu__h {
          display: block;
          white-space: nowrap;
          margin-bottom: 12px;
          padding: 10px 5px;
          font-size: 20px;
          line-height: 1.2;
          white-space: nowrap;
        }
  
        #dev-menu__in > a {
          display: block;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1;
          color: #07D;
          white-space: nowrap;
          padding: 10px 5px;
        }
  
        #dev-menu__in > a:hover {
          background: #efefef;
        }
        
        #dev-menu__in > a + a {
          border-top: 1px solid #eee;
        }
      </style>
    </div>
  `);

  if (window.fetch) {
    var update = function () {
      window.fetch('/-mock-proxy-/-status-/').then((response) => response.json()).then(({ enabledMocks }) => {
        const proxyLink = window.document.querySelector('#dev-menu-mocking-proxy');

        if (enabledMocks.length) {
          proxyLink.innerText = proxyLink.innerText + ' (' + enabledMocks.length + ')'; // eslint-disable-line

          proxyLink.style.background = 'green';
          proxyLink.style.color = 'white';
          proxyLink.title = enabledMocks.join(', \n');
        } else {
          proxyLink.style.background = '';
          proxyLink.style.color = '#07D';
          proxyLink.title = '';
          proxyLink.innerText = String(proxyLink.innerText).replace(/\(.+/, '');
        }

        setTimeout(update, 60 * 1000);
      });
    };

    update();
  }
}, 400);
