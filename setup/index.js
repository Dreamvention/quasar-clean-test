/**
 * Config Setup
 * in bamboo `Plan configurations` on tab build in item `npm build` set `Environment variables`
 *
 *    APP_ENV='${bamboo.environment}'
 *
 * then in tab `Variables` add a new var `environment` and set:
 *
 *    branch develop -> dev
 *    branch uat     -> uat
 *    branch master  -> prod
 */

module.exports = function getConfig(project, env) {
  var config = require('./config.json');
  config.project = 'ezn';
  config.environment = 'dev';
  config.path = './setup/config.json';

  if (project && env) {
    config = require(`./config.${project}.${env}.json`);
    config.project = project;
    config.environment = env;
    config.path = `./setup/config.${project}.${env}.json`;
  }

  var package = require('../package.json');
  config.version = package.version;
  config.projectName = package.description;

  return config;
};
