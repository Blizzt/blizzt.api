// Dependencies
import chalk from 'chalk';
const log = console.log;

export default {
  info: (text) => log(chalk.magenta(`[i] ${text}`)),
  error: (text) => log(chalk.red(`[X] ${text}`)),
  warn: (text) => log(chalk.yellow(`[!] ${text}`)),
  success: (text) => log(chalk.green(`[>] ${text}`)),
}
