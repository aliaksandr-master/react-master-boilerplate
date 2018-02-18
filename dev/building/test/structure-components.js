/*eslint-env node*/

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const once = require('lodash/once');
const check = require('gulp-checker');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



const { CheckError, CheckWarning } = check;

const COMPONENT_EXP = /^.+?\/components\/([^/]+)\/([^/]+)\/.+$/;
const COMPONENT_PATH_EXP = /^.+?\/components\/[^/]+\/(.+)$/;


const parseImports = (dir, getContent) => once(() => {
  const imports = [];

  String(getContent() || '').replace(/^import\s+(.+?)?(?:\s+from\s+)?'([^']+)';$/gm, ($0, importItems, importPath) => {
    let defaultName = null;
    let notDefaultNames = [];

    if (importItems) {
      importItems.trim().replace(/^([^{]*)(?:\{\s*([^}]+)})?$/, ($0, $1, $2) => {
        defaultName = $1.trim().replace(/\s*,\s*/, '') || null;
        notDefaultNames = String($2 || '').split(',').map((part) => part.trim()).filter(Boolean);
      });
    }

    imports.push({ importPath, notDefaultNames, defaultName });
  });

  return imports.map(({ importPath, defaultName, notDefaultNames }) => {
    const isRel = /^\./.test(importPath);

    const resolvedPath = isRel ? path.resolve(dir, importPath) : path.resolve(options.CWD, 'node_modules', importPath);
    const isComponent = isRel && /\/app\/components\//.test(resolvedPath);

    return {
      src: importPath,
      resolvedPath,
      isRel,
      isLib: !isRel,
      isComponent,
      fileBase: path.basename(importPath),
      defaultName,
      notDefaultNames,
      hasDashInPathFileName: /-/.test(importPath),
      hasIndexSuf: /\/index$/.test(importPath),
      hasJsSuf: /\.js$/.test(importPath),
      hasJsxSuf: /\.jsx$/.test(importPath),
      componentNestedLevel: isComponent ? resolvedPath.replace(COMPONENT_PATH_EXP, '$1').split(/\//).length : null,
      componentCategory: isComponent ? resolvedPath.replace(COMPONENT_EXP, '$1') : null,
      componentRoot: isComponent ? resolvedPath.replace(COMPONENT_EXP, '$2') : null
    };
  });
});


const getContentOfFile = (fileName) => once(() => fileName ? fs.readFileSync(fileName, 'utf8') : '');


module.exports = () =>
  gulp
    .src(fmap(options.DIR_SRC, [
      'components/**/index.js',
      '!components/test/**',
      '!components/__*__/**',
      '!components/page/PageApp/**'
    ]))
    .pipe(check({
      name: 'Check components',
      map: (file) => {
        const dir = path.dirname(file.path);
        const name = path.basename(dir);

        const checkFile = (fname) => {
          return fs.existsSync(fname) ? fname : null;
        };

        const storeFileName = checkFile(path.join(dir, `${name}.store.js`));
        const viewFileName = checkFile(path.join(dir, `${name}.view.js`));
        const containerFileName = checkFile(path.join(dir, `${name}.js`));

        const obj = {
          name,
          level: dir.replace(/\\/, '/').replace(/^.+?\/components\/[^/]+\//, '').split('/').length,
          dir,

          index: file.path,
          indexContent: getContentOfFile(file.path),
          indexImports: parseImports(dir, () => obj.indexContent()),

          variations: checkFile(path.join(dir, `${name}.variations.js`)) || checkFile(path.join(dir, `${name}.variations.jsx`)) || checkFile(path.join(dir, `${name}.variation.jsx`)) || checkFile(path.join(dir, `${name}.variation.js`)),

          componentName: name,
          componentCategory: file.path.replace(COMPONENT_EXP, '$1'),
          componentRoot: file.path.replace(COMPONENT_EXP, '$2'),

          container: checkFile(path.join(dir, `${name}.js`)),
          containerImports: parseImports(dir, () => obj.containerContent()),
          containerContent: getContentOfFile(containerFileName),

          const: checkFile(path.join(dir, `${name}.const.js`)),

          view: viewFileName,
          viewContent: getContentOfFile(viewFileName),
          viewImports: parseImports(dir, () => obj.viewContent()),

          style: checkFile(path.join(dir, `${name}.view.less`)),

          sandbox: checkFile(path.join(dir, `${name}.sandbox.js`)),
          sandboxTest: checkFile(path.join(dir, '__tests__', `${name}.sandbox.test.js`)),

          test: checkFile(path.join(dir, '__tests__', `${name}.test.js`)),

          store: storeFileName,
          storeContent: getContentOfFile(storeFileName),
          storeImports: parseImports(dir, () => obj.storeContent()),
          storeTest: checkFile(path.join(dir, '__tests__', `${name}.store.test.js`))
        };

        return obj;
      },
      checkers: [
        ({ viewImports, containerImports, storeImports, indexImports, componentRoot }) => {
          const errors = [
            { name: 'view', imports: viewImports() },
            { name: 'container', imports: containerImports() },
            { name: 'index', imports: indexImports() },
            { name: 'store', imports: storeImports() }
          ]
            .map(({ name, imports }) => imports
              .filter((importObj) => {
                if (importObj.hasIndexSuf) {
                  return true;
                }

                if (importObj.hasJsSuf) {
                  return true;
                }

                if (importObj.hasJsxSuf) {
                  if (![ 'ControlAddKeywords.variations.jsx', 'FieldAddKeywords.variations.jsx' ].includes(importObj.fileBase)) {
                    return true;
                  }
                }

                if (!importObj.isComponent) {
                  return false;
                }

                if (importObj.componentRoot === componentRoot) {
                  return false;
                }

                if (importObj.componentNestedLevel === 1) {
                  return false;
                }

                return true;
              })
              .map((importObj) => {
                if (importObj.hasIndexSuf) {
                  return CheckError(`invalid import "${importObj.src}" in ${name} file. import has redundant suffix "/index"`);
                }

                if (importObj.hasJsSuf) {
                  return CheckError(`invalid import "${importObj.src}" in ${name} file. import has redundant suffix ".js"`);
                }

                if (importObj.hasJsxSuf) {
                  return CheckWarning(`invalid import "${importObj.src}" in ${name} file. import has redundant suffix ".jsx"`);
                }

                return CheckError(`invalid import "${importObj.src}" in ${name} file. you must import only components with exporting in "index" file`);
              })
              .filter(Boolean)
            )
            .reduce((result, errors) => [ ...result, ...errors ], [])
            .filter(Boolean);

          return errors[0] || null;
        },
        ({ viewImports, containerImports, storeImports, indexImports }) => {
          const errors = [
            { name: 'view', imports: viewImports() },
            { name: 'container', imports: containerImports() },
            { name: 'index', imports: indexImports() },
            { name: 'store', imports: storeImports() }
          ]
            .map(({ name, imports }) => ({
              name,
              imports: imports
                .filter(Boolean)
                .filter(({ isComponent }) => isComponent)
                .filter(({ fileBase }) => !/[-.]/.test(fileBase))
                .filter(({ defaultName }) => defaultName)
                .filter(({ defaultName, fileBase }) => defaultName !== fileBase)
            }))
            .filter(({ imports }) => imports.length)
            .reduce((result, error) => [ ...result, error ], []);

          if (errors.length) {
            return errors.map(({ name, imports }) =>
              CheckError(`wrong import names in ${name}. incompatible with import path base name. [${imports.map(({ fileBase }) => fileBase).join(',')}]`)
            );
          }

          return null;
        },
        ({ name, componentCategory }) => {
          if (!/^[A-Z][a-zA-Z0-9]+$/.test(name) && componentCategory !== 'hoc') {
            return CheckError('invalid name format');
          }

          return null;
        },
        ({ variations }) => {
          if (variations) {
            return CheckWarning('variation file is deprecated');
          }

          return null;
        },
        ({ index }) => {
          if (!index) {
            return CheckError('no index file');
          }

          return null;
        },
        ({ container }) => {
          if (!container) {
            return CheckError('no container file');
          }

          return null;
        },
        ({ store, storeContent }) => {
          if (!store) {
            return null;
          }

          if (/Dux\([^)]*\);/.test(storeContent())) {
            return null;
          }

          return CheckWarning('old format of stores. must rewrite to Dux');
        },
        ({ level, view, sandbox, test, componentCategory }) => {
          if (view && !sandbox) {
            if (level > 1) {
              if (test) {
                return null;
              }

              return CheckWarning('no sandbox file');
            }

            if (test) {
              if (level === 1 && componentCategory === 'page') {
                return null;
              }

              return CheckWarning('no sandbox file');
            }

            return CheckError('no sandbox file');
          }

          return null;
        },
        ({ container, sandbox, sandboxTest, test }) => { // test files
          if (!container) {
            return null;
          }

          if (!sandboxTest && !test) {
            return CheckError('no test file');
          }

          if (sandbox && !sandboxTest) {
            return CheckError('no sandbox-test file');
          }

          if (sandbox && test) {
            return CheckError('test file is redundant (sandbox-test is exists)');
          }

          return null;
        },
        ({ view, style }) => {
          if (view && !style) {
            return CheckWarning('no style file');
          }

          return null;
        },
        ({ store, storeTest }) => {
          if (store && !storeTest) {
            //return Warning('no store-test file');
            return CheckError('no store-test file');
          }

          return null;
        },
        ({ const: constFile/*, dir, name*/ }) => {
          if (!constFile) {
            return CheckError('no const file');
            //fs.writeFileSync(path.join(dir, `${name}.const.js`), '\n', 'utf-8');
          }

          return null;
        }
      ]
    }));
