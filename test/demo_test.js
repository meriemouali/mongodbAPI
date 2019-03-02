

const mocha = require('mocha')
const assert = require("assert")
const book = require ("../models/book")



/// DESCRIBE TESTS
describe("saving record ",function(){

  /// CREATE TESTS
    it('saves record to database',function(done){
       var char = new book ({
           title:"Le rouge et le noir"
       });
       /// SAVE THEN (BECAUSE TEST IS ASYCHRONOUS IT SHOUL IPLEENT THE TEST AND FINISH IT TO PASS TO THEN)
       char.save().then(function(){
           assert(char.isNew === false);
           
           done();
           ///DONE TO SAY THAT THE TEST IS FINISHED AND TO PASS TO AN OTHER TEST
       })
    })
})