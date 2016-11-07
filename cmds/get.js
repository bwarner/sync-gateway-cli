const async = require('async');
const util = require('../lib/util');
const SG = require('../lib/service');

module.exports = function (program) {

  program
  .command('get [id]')
  .option('-r, --rev <rev>')
  .description('get a document from database')
  .action(function (id, options) {
    util.gateway(options, (error, gateway) => {
      if (error) {
        console.error("could not create gateway: ", error);
        process.exit(-1);
      }
      SG.get(gateway, options, id, (error, result) => {
          if (error) {
            if (error.message) console.log(error.message);
            process.exit(-1);
          }
          console.log(result);
        });
    });
  });
};
