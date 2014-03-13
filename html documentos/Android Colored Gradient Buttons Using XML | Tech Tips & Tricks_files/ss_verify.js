var izea_styx_url = 'http://styx.izea.com/v1/response'

var izea_src_regex = /^https:\/\/d5pfnesb3enry\.cloudfront\.net\/js\/ss_verify.js\?/

//Screen sizes to measure ad location against
var screen_height = 768
var screen_width = 1024

function izea_report_above_the_fold(){
  //build a json object we all of our needed info
  var objs = izea_getElements()
  //check our fake cron that does check for this blog once a week
  if(!izea_do_call(objs[0])) return false

  for(var i = 0; i < objs.units.length; i++)
  {
    //build params string
    var params = 'verified='  + objs.units[i].verified
    params += '&property_id='  + objs.units[i].property_id
    params += '&dfp_id=' + objs.units[i].dfp_id
    params += '&app_code=' + objs.units[i].app_code
    //make call
    var scriptTag = document.createElement('SCRIPT');
    scriptTag.src = izea_styx_url + "?" + params;
    document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
  }
  return false
}


function izea_getElements(){
  //get all the scripts on page
  var scripts = document.getElementsByTagName('script')
  var script = null
  //lets go backwards since the script should be one of the last
  for(var i=scripts.length-1;i>-1;i--){
    //substitute in the right environment
    if(izea_src_regex.test(scripts[i].src)){
      //we have our script
      script = scripts[i]
      break
    }
  }
  //parse the script source
  var parsed_srcs = izea_parse_src(script.src)
  //this should not fail but if it does nothing we can do, leave
  if(!parsed_srcs) return false

  for(var i = 0; i < parsed_srcs.units.length; i++)
  {
    var element = document.getElementById(parsed_srcs.units[i].element_id);
    //the element must be on the page
    if(!element)
    {
      parsed_srcs.units[i]['verified'] = false;
    }
    else
    {
      //record if it is above the fold
      parsed_srcs.units[i]['verified'] = izea_above_the_fold(element, parsed_srcs.units[i]);
    }
  }
  return parsed_srcs
}

function izea_above_the_fold(element, parsed_src){
  var rect = element.getBoundingClientRect();
  var top_scroll_amount = window.scrollY;
  var left_scroll_amount = window.scrollX;
  //if the window size is greater than the minimum size then use the window
  //size to check
  if (window.innerWidth > screen_width) screen_width = window.innerWidth
  //if element is off the page at all horizontally this check has failed
  if (rect.left + left_scroll_amount < 0 || rect.right > screen_width) return false
  //calc how mcuh is missing from top and bottom
  var missing = (rect.top + top_scroll_amount < 0 ? Math.abs(rect.top) : 0)
  missing += (rect.bottom + top_scroll_amount > screen_height ? (rect.bottom + top_scroll_amount - screen_height) : 0)
  var result = false
  switch(rect.height){
    case 250: result = missing < 25 //must be less than 10% missing
    break;
    case 600: result = missing < 200 //must be less than 33% missing
    break;
    default: result = missing == 0 //must be nothing missing
  }
  return result
}

function izea_parse_src(src){
  var codes = src.split(",");
  if (codes.length == 0 || !codes[0].match(/div-([a-z]*)-ad-(\d+)-(\d+)/)) return false;
  var ad_units = [];
  for (var i = 0; i < codes.length; i++)
  {
    var code = codes[i]

    var targets = code.match(/div-([a-z]*)-ad-(\d+)-(\d+)/);
    ad_units.push({
      'element_id' : targets[0],
      'app_code' : targets[1],
      'property_id'   : targets[2], 
      'dfp_id'  : targets[3]
    })
  }
  return { 'units' : ad_units };
}

//our pseudo cron
function izea_do_call(obj){
  return obj && Math.round(obj.property_id/10)%7 == (new Date).getDay();
}

(function(){
var addLoadListener
var removeLoadListener
if (window.addEventListener){
addLoadListener = function(func){
window.addEventListener('DOMContentLoaded', func, false)
window.addEventListener('load', func, false)
}
removeLoadListener = function(func){
window.removeEventListener('DOMContentLoaded', func, false)
window.removeEventListener('load', func, false)
}
}else if (document.attachEvent){
addLoadListener = function(func){
document.attachEvent('onreadystatechange', func)
document.attachEvent('load', func)
}
removeLoadListener = function(func){
document.detachEvent('onreadystatechange', func)
document.detachEvent('load', func)
}
}

var callbacks = null
var done = false
function __onReady(){
done = true
removeLoadListener(__onReady)
if (!callbacks) return
for (var i = 0; i < callbacks.length; i++){
callbacks[i]()
}
callbacks = null
}
function OnReady(func){
if (done){
func()
return
}
if (!callbacks){
callbacks = []
addLoadListener(__onReady)
}
callbacks.push(func)
}
window.OnReady = OnReady
})()

OnReady(function(){izea_report_above_the_fold();false})
