#!/usr/bin/env node



process.argv.forEach(function(arg, index){

  if(index === 0) return; //node
  if(index === 1) return; //__dirname

  if(arg === 'new'){
    require('./lib/generateNewFiles')(process.argv.splice(3, 1)[0]);
  }

});