import colors from 'colors';
import webLogger from './logger';

exports.error = (str) => {
  webLogger.info(str);
  console.log(colors.red(str));
};

exports.success = (str) => {
  webLogger.info(str);
  console.log(colors.green(str));
};

exports.warning = (str) => {
  webLogger.info(str);
  console.log(colors.yellow(str));
};