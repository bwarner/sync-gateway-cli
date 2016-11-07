/**
 * Created by bwarner on 11/6/16.
 */
const childProcess = require("child_process")
describe("Putting file", function(){
  it ("Can put a file from the file system", function() {
    childProcess.execFile('../bin/sg')
  })

});
