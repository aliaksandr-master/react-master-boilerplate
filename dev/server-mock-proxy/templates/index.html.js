/*eslint-env node*/

const groupBy = require('lodash/groupBy');
const values = require('lodash/values');
const html = require('./html');



module.exports = ({ responses, settings }) => {
  const { activeMocks = {} } = settings;
  const DEFAULT_VALUE = '';

  const enabledList = Object.keys(settings.activeMocks).filter((name) => settings.activeMocks[name]);

  responses = responses
    .sort()
    .map((response) => {
      const RESPONSE_FILE_EXP = /(.+?)\/__responses__\/([^/]+)\/(.+?)\.(?:json|js)$/;
      const resource = response.rel.replace(RESPONSE_FILE_EXP, '$1');
      const method = response.rel.replace(RESPONSE_FILE_EXP, '$2');
      const variant = response.rel.replace(RESPONSE_FILE_EXP, '$3');

      const value = activeMocks[`${resource}:${method}`] || DEFAULT_VALUE;

      return Object.assign({}, response, { resource, method, value, variant, available: variant.indexOf('/') === -1 });
    });

  const responsesByResource = values(groupBy(responses.filter(({ available }) => available), 'resource')).map((responses) => values(groupBy(responses, 'method')));

  return html({
    head: '<title>Mocking Proxy</title>',
    body: `
    <script>
      window.setChanges = function (resource, method, variant) {
          document.querySelector('#form [name="resource"]').value = resource;
          document.querySelector('#form [name="method"]').value = method;
          document.querySelector('#form [name="variant"]').value = variant;
      };
    </script>
    <style>
      .b-resources { display: block; }
      .b-resources__resource { display: block; margin: 0 0 30px; }
      .b-resources__resource-h { display: block; font-weight: bold; font-size: 24px; }
      .b-resources__methods { display: block; }
      .b-resources__method { display: block; padding: 5px 0; }
      .b-resources__method--active { color: green; }
      .b-resources__method-h { display: inline-block; }
      .b-resources__method-select { display: inline-block; }
    </style>
    <h1>MOCKING: ${enabledList.length ? 'ENABLED' : 'DISABLED'}</h1>
    <form id="form" class="b-resources" action="" method="POST">
      <input type="hidden" name="resource" value="">
      <input type="hidden" name="method" value="">
      <input type="hidden" name="variant" value="">
      ${responsesByResource.map((responses) => `
        <div class="b-resources__resource">
          <div class="b-resources__resource-h">${responses[0][0].resource}</div>
          <div class="b-resources__methods">
            ${responses.map((methods) => `
              <div class="b-resources__method ${methods[0].value === DEFAULT_VALUE ? '' : 'b-resources__method--active'}">
              <div class="b-resources__method-h">${methods[0].method}</div>
                <select class="b-resources__method-select" onchange="window.setChanges('${methods[0].resource}', '${methods[0].method}', this.value);document.querySelector('#form').submit()">
                  <option ${methods[0].value === DEFAULT_VALUE ? 'selected' : ''} value="">--DISABLED--</option>
                  ${methods.map(({ variant, value }) => `
                    <option ${value === variant ? 'selected' : ''} value="${variant}">mock: ${variant}</option>
                  `).join('')}
                </select>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </form>
    <script async defer src="/dev-menu.js"></script>
    `
  });
};
