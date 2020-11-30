# Reproducing webpack bug

There's a bug in webpack that allows unhandled promise rejections to cause the build to fail silently. The webpack config file here forces webpack to fail with a custom plugin that rejects a 


## Instructions to run/replicate:

1. Fork this repo & pull it down
2. Run `npm install`
3. Run `npm run build`
    * Webpack build looks successful (doesn't throw any errors that kill the process) but also doesn't build properly
    * See `UnhandledPromiseRejectionWarning` in logs
    * This replicates problems that could be caused by any number of out-dated or broken plugins.
    * When this happens as part of an automated build process, it can lead to deployments/builds without the expected compiled js or css files.
4. In `webpack.config.js` comment out line 31 - `new FailingPlugin()`
    * run `npm run build` again
    * This time, without the breaking plugin, the build completes properly
5. Bug/request:
    * When webpack runs into an `UnhandledPromiseRejectionWarning`, it should exit the node process with a non-zero code
    * This will allow automated ci/cd scripts to stop once the webpack process fails.