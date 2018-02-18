/* eslint-env node */

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const express = require('express');
const bodyParser = require('body-parser');
const fse = require('fs-extra');
const config = require('../config');
const proxy = require('./proxy');



const template = (relPath) => {
  relPath = path.resolve(__dirname, relPath);

  delete require.cache[relPath]; // eslint-disable-line fp/no-delete

  const template = require(relPath); // eslint-disable-line global-require, import/no-dynamic-require

  return (data) => template(data);
};

const app = express();



const { middleware, actions } = proxy({
  api: {
    local: '/api/',
    remote: config.MOCK_PROXY_TARGET_BASIC_URL
  }
});

const resourcesDIR = path.resolve(config.CWD, config.DIR_SRC, 'api/resources');
const getResponsesFiles = () =>
  glob.sync(path.join(resourcesDIR, '**/__responses__/**/*.{json,js}'))
    .map((file) => ({
      file,
      rel: path.relative(resourcesDIR, file)
    }));


fse.ensureFileSync(config.MOCK_PROXY_SETTINGS_FILE);

const getSettings = () => {
  const content = fs.readFileSync(config.MOCK_PROXY_SETTINGS_FILE, 'utf8');

  if (content) {
    return JSON.parse(content);
  }

  return {
    activeMocks: {}
  };
};
const setSettings = (data) => fs.writeFileSync(config.MOCK_PROXY_SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/-status-', (req, res) => {
  const settings = getSettings();

  const enabledList = Object.keys(settings.activeMocks).filter((name) => settings.activeMocks[name]);

  res.send({ enabledMocks: enabledList });
});

actions.setMocks(getSettings().activeMocks);

app.get('/', (req, res) => {
  const tpl = template('./templates/index.html.js');

  res.status(200).send(tpl({
    responses: getResponsesFiles(),
    settings: getSettings()
  }));
});

app.post('/', (req, res) => {
  const tpl = template('./templates/index.html.js');

  let settings = getSettings();

  settings.activeMocks[`${req.body.resource}:${req.body.method}`] = req.body.variant;

  const activeList = Object.keys(settings.activeMocks).filter((name) => settings.activeMocks[name]);

  settings.activeMocks = activeList.reduce((activeMocks, name) => {
    activeMocks[name] = settings.activeMocks[name];

    return activeMocks;
  }, {});

  setSettings(settings);

  settings = getSettings();

  actions.setMocks(settings.activeMocks);

  res.status(200).send(tpl({
    responses: getResponsesFiles(),
    settings
  }));
});

app.use(middleware);


module.exports = app;
