/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)
var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();

//var client = new ThingSpeakClient({useTimeoutMode:false});
// Set the timeout to 20 seconds (Default value is 15 secondes)
var client = new ThingSpeakClient({updateTimeout:20000});

var callBack = function(err) {
    if(!err) {
        console.log('error: ' + err);
    }
} 

// Attached a channel with only a writeKey for update a channel:
//client.attachChannel(50568, {writeKey:'KSX88EAFTV19S2CH'}, callBack); // ok

// Attached a channel with both writeKey and readKey:
client.attachChannel(91196, {writeKey:'I3H13ZCXIPFLF8T0', readKey:'OP9GY3YJXCPWT8V0'}, callBack);


var mraa = require('mraa'); //require mraa

var analogPin1 = new mraa.Aio(1);


var analogPin0 = new mraa.Aio(0);


 var FSR_analogValue;
  var Temperature;
// Read the input and print both the raw value and a rough lux value.
// Upload the light value to field 3 of the channel.
function uploadToThingSpeak() {
         FSR_analogValue = analogPin1.read();
        Temperature = analogPin0.read();
         var mv = ( Temperature/1024.0)*5000; 
          var cel = mv/10;
    client.updateChannel(91196,{ field1: cel ,field2: FSR_analogValue},function(err, response) {
       
        if (err == null && response > 0) {
            console.log('Update successfully. temperature is: ' + cel);
             console.log('Update successfully. fsr value is: ' + FSR_analogValue);
        }
        
    });
}setInterval(uploadToThingSpeak, 20000);
