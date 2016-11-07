const async = require('async');
const util = require('../lib/util');
const SG = require('../lib/service');

module.exports = function (program) {

  program
  .command('put [file]')
  .option('-k, --key <key>')
  .option('-r, --rev <rev>', 'revision')
  .description('put a document into database')
  .action(function (file, options) {
    util.gateway(options, (error, gateway) => {
      if (error) {
        console.error("could not create gateway: ", error);
        process.exit(-1);
      }
      let stream = file ? util.openStream(file) : process.stdin;
      async.waterfall([
          util.readInput.bind(null, stream, 'utf8'),
          util.jsonify,
          SG.put.bind(null, gateway, options)
        ],
        (error, result) => {
          if (error) {
            if (error.message) console.log(error.message);
            process.exit(-1);
          }
        });
    });
  });
};
