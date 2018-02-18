/*eslint-env node*/

const path = require('path');
const glob = require('glob');
const express = require('express');
const options = require('../config');



const app = express();

const template = ({ files }) =>
  `<html>
    <div class="b-images__color-selectors">
      ${[ 'red', 'black', 'gray', 'violet', 'white' ].map((color) => `<span class="b-images__color-selector" style="background: ${color}" onclick="document.documentElement.style.backgroundColor = '${color}'"></span>`).join('')}
    </div>
    
    <div class="b-images__images">
      ${files.map((file) => `
        <a class="b-images__image" target="_blank" href="/-images-/${file}">
          <div class="b-images__image-icon-wr"><img class="b-images__image-icon" src="/-images-/${file}" /></div>
          <div class="b-images__image-name">${options.DIR_IMAGES}/${file}</div>
        </a>
      `).join(' ')}
    </div>
    <style>
    html {
      background-color: violet;
      background-image: -webkit-linear-gradient(45deg, rgba(255,255,255,0.2) 24%, transparent 25%, transparent 75%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.2)), -webkit-linear-gradient(45deg, rgba(255,255,255,0.2) 24%, transparent 25%, transparent 75%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.2));
      background-image: linear-gradient(45deg, rgba(255,255,255,0.2) 24%, transparent 25%, transparent 75%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.2)), linear-gradient(45deg, rgba(255,255,255,0.2) 24%, transparent 25%, transparent 75%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.2));
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
      border: 10px solid rgba(0, 0, 0, 0.1);
    }
    .b-images__color-selectors {
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    .b-images__color-selector {
      cursor: pointer;
      display: block;
      width: 30px;
      height: 30px;
      float: left;
      outline: 1px solid #eee;
    }
    .b-images__images {
      display: block;
      margin: 50px 5%;
    }
    .b-images__image {
      display: block;
      font-size: 16px;
      color: #444;
      text-decoration: none;
      font-family: monospace;
      margin: 10px;
      float: left;
      width: 400px;
    }
    .b-images__image:hover {
      opacity: 0.8;
    }
    .b-images__image-icon-wr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      float: left;
      margin: 10px;
    }
    .b-images__image-icon {
      display: block;
      max-width: 100%; 
      max-height: 100%;
    }
    .b-images__image-name {
      display: block;
      margin-top: 24px;
      white-space: normal;
      word-break: break-all;
    } 
    </style>
  </html>`;

const imagesDIR = `${options.CWD}/${options.DIR_IMAGES}`;



app.get('/*', express.static(imagesDIR));


app.get('/', (req, res) => {

  const files = glob.sync(`${imagesDIR}/**/*.{ico,png,jpg,jpeg,svg,gif}`).map((file) => path.relative(imagesDIR, file));

  res.send(template({ files }));
});



module.exports = app;
