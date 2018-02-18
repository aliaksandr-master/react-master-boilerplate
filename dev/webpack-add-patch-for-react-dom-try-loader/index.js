/* eslint-env node */

module.exports = (source) => {
  return `${source}
/*------------ OVERRIDE ! START ----------------*/
function measureLifeCyclePerf(fn, debugID, timerType) {
  if (debugID === 0) {
    // Top-level wrappers (see ReactMount) and empty components (see
    // ReactDOMEmptyComponent) are invisible to hooks and devtools.
    // Both are implementation details that should go away in the future.
    return fn();
  }

  ReactInstrumentation.debugTool.onBeginLifeCycleTimer(debugID, timerType);
  try {
    return fn();
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    ReactInstrumentation.debugTool.onEndLifeCycleTimer(debugID, timerType);
  }
}
/*------------ OVERRIDE ! STOP ----------------*/
`;
};
