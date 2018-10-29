import format from 'date-fns/format';

const colorSet = {
  Reset: '\x1b[0m',
  Red: '\x1b[31m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Blue: '\x1b[34m',
  Magenta: '\x1b[35m',
};

const getFormattedText = text => `${format(new Date(), 'YYYY-MM-DD HH:mm')} => ${text}`;


export default {
  warn: (text) => {
    console.log(colorSet.Yellow, getFormattedText(text));
    console.log(colorSet.Reset);
  },
  success: (text) => {
    console.log(colorSet.Green, getFormattedText(text));
    console.log(colorSet.Reset);
  },
  error: (text) => {
    console.log(colorSet.Red, getFormattedText(text));
    console.log(colorSet.Reset);
  },
  info: (text) => {
    console.log(colorSet.Reset, getFormattedText(text));
    console.log(colorSet.Reset);
  },

};
