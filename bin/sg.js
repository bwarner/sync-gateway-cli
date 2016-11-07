const program = require('commander');
require('pkginfo')(module, 'version');
const commands = require('../cmds')

commands.forEach(command => command(program));

var user, password, url = 'http://localhost:4985/';

program.version(module.version)
.usage('[options]')
.option('-v, --verbose', 'show response verbose info')
.option('-h, --host <host>', 'host --host, -h', 'localhost')
.option('-p, --port <port>', 'port --port, -p', 4985)
.option('-d, --database <database>', 'database, --database, -d', 'default')
.option('-u, --user <user>', 'user name, --user')
.option('-p, --password <password>', 'password, synonym for node --password')
.option('-e, --encoding <encoding>', 'encoding, character encoding', 'utf8')
.option('-a, --admin', 'Sync Gateway port --port, -p');

program.parse(process.argv);

console.log(`database: ${program.database}`);
//program.on('user', function(argUser){
//  console.log('user ', arguments);
//  user = argUser;
//});
//
//program.on('password', function(argPassword){
//  console.log('password ', argPassword);
//  password = argPassword;
//});
//
//program.on('database', function(db){
//  database = db;
//});
