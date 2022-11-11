import { boot } from 'quasar/wrappers';

export default boot(() => {
  console.group('CosoCloud App Info');
  console.info(`%c${process.env.config.projectName}`, 'color:green; font-size: 14px; font-weight: bold');
  console.info('%cProject: ', 'font-weight: bold', process.env.config.project),
    console.info('%cEnvironment: ', 'font-weight: bold', process.env.config.environment);
  console.info('%cVersion: ', 'font-weight: bold', process.env.config.version);
  console.info('%cPath: ', 'font-weight: bold', process.env.config.path);
  console.info('%cPrimeAccountId: ', 'font-weight: bold', process.env.config.primeAccountId);
  console.groupEnd();
});
