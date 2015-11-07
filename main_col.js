(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
//  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for hiding battery
var $digitalValue;
$("input[name=hideBattery]").change(function () {
 $hideBattery = parseInt(this.value);
});

// Radio control for animation on shake
var $digitalValue;
$("input[name=noAnimOnShake]").change(function () {
 $noAnimOnShake = parseInt(this.value);
});


function loadOptions() {
 if (localStorage.hideBattery) {
  $hideBattery = localStorage.hideBattery;
//  console.log('localStorage.hideBattery: ' + $hideBattery);
  // setting radio' value
 } else {
  $hideBattery = 0;
//  console.log('localStorage.hideBattery was undefined, now set to: ' + $hideBattery);
 }
 $("input[name=hideBattery][value='" + $hideBattery + "']").attr('checked', 'checked');

 if (localStorage.noAnimOnShake) {
  $noAnimOnShake = localStorage.noAnimOnShake;
//  console.log('localStorage.noAnimOnShake: ' + $noAnimOnShake);
  // setting radio' value
 } else {
  $noAnimOnShake = 0;
//  console.log('localStorage.noAnimOnShake was undefined, now set to: ' + $noAnimOnShake);
 }
 $("input[name=noAnimOnShake][value='" + $noAnimOnShake + "']").attr('checked', 'checked');


 var $bgColorPicker = $('#bgColorPicker');
 if (localStorage.bgColor) {
  $bgColorPicker[0].value = localStorage.bgColor;
 }
 
 var $timeColorPicker = $('#timeColorPicker');
 if (localStorage.timeColor) {
  $minColorPicker[0].value = localStorage.timeColor;
 }
 
} 

function getAndStoreConfigData() {
 var $bgColorPicker = $('#bgColorPicker');
 var $timeColorPicker = $('#timeColorPicker');

 var options = {
  hideBattery:   $hideBattery,
  noAnimOnShake: $noAnimOnShake,
  bgColor:       $bgColorPicker.val(),
  timeColor:     $timeColorPicker.val()
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.hideBattery   = $hideBattery;
 localStorage.noAnimOnShake = $noAnimOnShake;
 localStorage.bgColor       = options.bgColor;
 localStorage.timeColor     = options.timeColor;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
