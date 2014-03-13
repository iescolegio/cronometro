  var ppp_root                    = "#{APP_DOMAIN}"
  var ppp_root_tracker    = "http://itk.socialspark.com";
  
  document.write('<script type="text/javascript" language="javascript1.7" src="' + ppp_root + '/javascripts/Objects/Url.js"></script>');
  
  // START: Browser Detection
  
          var ppp_BrowserDetect = {
                  bd_init: function () {
                  this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
                  this.version = this.searchVersion(navigator.userAgent)
                          || this.searchVersion(navigator.appVersion)
                          || "an unknown version";
                  this.OS = this.searchString(this.dataOS) || "an unknown OS";
                  },
                  searchString: function (data) {
                  for (var i=0;i<data.length;i++) {
                          var dataString = data[i].string;
                          var dataProp = data[i].prop;
                          this.versionSearchString = data[i].versionSearch || data[i].identity;
                          if (dataString) {
                                  if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
                          }else if (dataProp)
                                  return data[i].identity;
                  }
          },
          searchVersion: function (dataString) {
                          var index = dataString.indexOf(this.versionSearchString);
                          if (index == -1) return;
                          return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
                  },
                  dataBrowser: [
                          { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"},
                          { string: navigator.vendor, subString: "Apple", identity: "Safari"},
                          { prop: window.opera, identity: "Opera"},
                          { string: navigator.vendor, subString: "iCab", identity: "iCab"},
                          { string: navigator.vendor, subString: "KDE", identity: "Konqueror"},
                          { string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
                          { string: navigator.vendor, subString: "Camino", identity: "Camino"},
                          { string: navigator.userAgent, subString: "Netscape", identity: "Netscape"}, // for newer Netscapes (6+)
                          { string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"},
                          { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"},
                          { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"} // for older Netscapes (4-)
                  ],
                  dataOS : [
                          { string: navigator.platform, subString: "Win", identity: "Windows"},
                          { string: navigator.platform, subString: "Mac", identity: "Mac"},
                          { string: navigator.platform, subString: "Linux", identity: "Linux"}
                  ]
          };
          ppp_BrowserDetect.bd_init();
         
  // START: Initial Set Up
  
          var close_disclosure_ad         = false;
          var ppp_inCall                          = false;
          var ppp_frag_id                         = "";
          var ppp_mouse_pos_x             = 0;
          var ppp_mouse_pos_y             = 0;
          var ppp_img_id                          = 0;
          var ppp_has_been_restyled       = false;
          var ppp_popup                           = "";
          var blog_is_typepad                     = false;
          var ppp_loading                         = "<table width='100%' height='100%'><tr><td valign='middle' align='center'><img style='vertical-align:middle;' src='"+ppp_root+"/images/dialogLoading.gif'><BR>Loading...</td></tr></table>";
          if (window.XMLHttpRequest){
             var ppp_http_request         = new XMLHttpRequest();
          }else
                  var ppp_http_request    = new ActiveXObject("Microsoft.XMLHTTP");
          var ppp_depart_time                     = "";
          var ppp_arrive_time                     = new Date();
          var ppp_destination                     = "";
          var ppp_cur_domain                      = document.location.host
          var ppp_refer_page                      = document.referrer + "";
          var ppp_cur_location            = document.location + "";
                  if(ppp_cur_location.indexOf("#") > 0){
                          ppp_cur_location        = ppp_cur_location.split("#");
                          ppp_cur_location        = ppp_cur_location[0]
                  }
                  if(ppp_cur_location.indexOf("typepad.com") != -1) blog_is_typepad = true;
          var ppp_session_id                      = ppp_readCookie("pppSessionID");
          var ppp_new_visit                       = false;
                  if(!ppp_session_id){
                          ppp_session_id          = ppp_create_id();
                          ppp_createCookie("pppSessionID",ppp_session_id)
                          ppp_new_visit           = true;
                  }
          var ppp_page_view_id            = ppp_create_id();
          var ppp_returning_user          = ppp_readCookie("pppReturningUser");
                  if(!ppp_returning_user)
                          ppp_createCookie("pppReturningUser", 1, 365);
          var ppp_unique_user                     = !ppp_returning_user
          var ppp_lastX                           = 0;
          var ppp_lastY                           = 0;
          var ppp_left_via                        = "";
          var ppp_all_anchors                     = "";
          var ppp_form_action             = "";
          var ppp_onclick_action          = "";
          var ppp_loading_set                     = 0
          var ppp_offset_y                        = 0;
          var ppp_offset_x                        = 0;
          var ppp_browser_width           = 0;
          var ppp_browser_height          = 0;
          var ppp_page_unloaded           = true;
          var ppp_return_element;
          var ppp_safari_save                     = true;
          var ppp_spon_intro                      = false
          var ppp_spon_open                       = false
          var ppp_spon_current_top        = 53
          var ppp_spon_timer
          var ppp_spon_timer_secs         = 11
          var ppp_spon_data_title         = ""
          var ppp_spon_data_image         = ""
          var ppp_spon_data_copy          = ""
          var ppp_spon_data_btn_name      = ""
          var ppp_spon_data_link          = ""
          var ppp_spon_data_blog          = ""
          var ppp_spon_data_expires       = ""
          var ppp_spon_data_footer        = ""
          var ppp_spon_view_type          = "big"
          var ppp_spon_data_id            = 0
          var ppp_has_seen_sponsorship = ppp_readCookie("sponsorship_viewed")
         
          ppp_get_browser_dimensions();
  
          if(document.addEventListener){
                  document.addEventListener('mousemove', ppp_showMousePos, true);
                  document.addEventListener('mousedown', ppp_click, true);
          }else {
                  document.attachEvent('onmousemove', ppp_showMousePos);
                  document.attachEvent('onclick', ppp_click);
          }
                 
  // START: Depending on browser, appended init script to whatever else the body does at onload:
    if (window.addEventListener) {
                  ppp_loading_set=1;
                  window.addEventListener('load', function() { setTimeout(ppp_arrive, 0); }, false);
          } else {
                  ppp_loading_set=1;
                  window.attachEvent('onload', function() { setTimeout(ppp_arrive, 0); } );
          }
          if(/Safari/i.test(navigator.userAgent)){ //Test for Safari
            var _timer=setInterval(function(){
            if(/loaded|complete/.test(document.readyState)){
              clearInterval(_timer)
              ppp_loading_set=1
              ppp_arrive()
            }}, 10)
          }
         
  // START: Sponsorships
         
          ppp_watch_scroll = setInterval(ppp_spon_position, 0)
          ppp_watch_resize = setInterval(ppp_resize_browser, 0)
         
          function ppp_no_sponsorship(){
                  ppp_createCookie("sponsorship_viewed","true", -1)
          }
          function ppp_check_for_sponsorship(){
                  if(ppp_readCookie("sponsorship_information")){
                          ppp = ppp_readCookie("sponsorship_information").split("*!*")
                          ppp_spon_sponsored_by           = ppp_clean_escapes(ppp[0])
                          ppp_spon_data_media_type        = ppp_clean_escapes(ppp[1]) //image, third_party_tags, video_embed_tag
                          ppp_spon_data_media             = ppp_clean_escapes(ppp[2])
                          ppp_spon_data_copy                      = ppp_clean_escapes(ppp[3])
                          ppp_spon_data_btn_name          = ppp_clean_escapes(ppp[4])
                          ppp_spon_data_link                      = ppp_clean_escapes(ppp[5])
                          ppp_spon_data_blog                      = ppp_clean_escapes(ppp[6])
                          ppp_spon_data_expires           = ppp_clean_escapes(ppp[7])
                          ppp_spon_data_id                        = ppp_clean_escapes(ppp[8])
                          ppp_spon_view_type                      = "small"
                          ppp_set_up_sponsorship();
                  }else{
                          var ppp_url = "http://"+ppp_cur_domain
                                  ppp_url = escape(ppp_url).replace(/\//g, "%2F")
                                  ppp_url = ppp_root+"/blogs/"+ppp_url+"/active_booking"
                          //var ppp_url = "http://localhost/example_image.txt"
                          //var ppp_url = "http://localhost/example_video.txt"
                          //var ppp_url = "http://localhost/example_ad_tags.txt"
                          element = document.createElement("script");     
                          element.setAttribute("src", ppp_url);
                          element.setAttribute("type", "text/javascript");
                          document.body.appendChild(element);
                  }
          }
          function ppp_set_up_sponsorship(){
                  ppp_draw_spon_divs();
                  ppp_create_sponsorship_cookie()
                  document.getElementById("ppp_spon_title").innerHTML = ppp_spon_data_blog + " is sponsored by <a href='" + ppp_spon_data_link + "' target='blank'>" + ppp_spon_sponsored_by + "</a>"
                  if(ppp_spon_data_media_type == "image"){
                          document.getElementById("ppp_spon_image").innerHTML = "<a href='" + ppp_spon_data_link + "' target='blank'><img src='" + ppp_spon_data_media + "' width='336' height='280' border='0'></a>"
                  }else if(ppp_spon_data_media_type == "video_embed_tag"){
                          video = ppp_spon_data_media
                          //alert(video)
                          autoplay = video.match(/http:\/\/www\.youtube\.com\/v\/([\-]?\w+)/)[1]
                          myregexp = new RegExp(autoplay, "g")
                          video = video.replace(myregexp, autoplay+"&autoplay=1")
                          video = video.replace(/ wmode="transparent"/g, "")
                          video = video.replace(/width="425"/g, 'width="100%"')
                          video = video.replace(/height="355"/g, 'height="100%"')
                          document.getElementById("ppp_spon_image").innerHTML = video
                  }else{
                          document.getElementById("ppp_spon_image").innerHTML = ppp_spon_data_media
                  }
                  ppp_spon_data_copy = ppp_spon_data_copy.replace(/\r\n/g, "<BR>")
                  document.getElementById("ppp_spon_content_text").innerHTML = ppp_spon_data_copy
                  document.getElementById("ppp_spon_btn_text").innerHTML = "<a href='" + ppp_spon_data_link + "'>" + ppp_spon_data_btn_name + "</a>"
                  document.getElementById("ppp_spon_bar_more_info").innerHTML = "<a href='http://socialspark.com'>Click here and join SocialSpark for an opportunity to have " + ppp_spon_sponsored_by + " sponsor your Blog!</a>"
                  ppp_spon_intro = true
                  if(ppp_has_seen_sponsorship){
                          ppp_spon_close();
                  }else{
                          document.body.style.overflow = "hidden"
                          document.getElementById("ppp_spon_overlay").style.display = "block"
                          ppp_elm = document.getElementById("ppp_spon_window")
                          ppp_elm.style.top = ((ppp_browser_height/2) - (370/2)) + "px"
                          ppp_elm.style.display = "block"
                          document.getElementById("ppp_spon_ad").style.top = (parseInt(ppp_elm.style.top) + 1) + "px"
                          document.getElementById("ppp_spon_ad").style.display = "block"
                          if(ppp_spon_data_media_type != "video_embed_tag"){
                                  document.getElementById("ppp_spon_countdown").style.display = "block"
                                  document.getElementById("ppp_spon_countdown_bg").style.display = "block"
                                  document.getElementById("ppp_spon_countdown").innerHTML = ppp_spon_timer_secs
                                  ppp_spon_timer = setInterval("ppp_spon_timer_count()", 1000);   
                          }
                          ppp_createCookie("sponsorship_viewed","true", ppp_spon_data_expires) // was 7 days, but need it to expire when this sponsorship does so that any new spons will display if taken before the 7 days
                  }
          }
          function ppp_spon_timer_count(){
                  if(ppp_spon_timer_secs == 1){
                          clearInterval(ppp_spon_timer)
                          ppp_spon_close()
                  }
                  ppp_spon_timer_secs = ppp_spon_timer_secs - 1
                  document.getElementById("ppp_spon_countdown").innerHTML = ppp_spon_timer_secs
          }
          function ppp_spon_close(){
                  document.getElementById("ppp_spon_ad").style.display = "none"
                  document.getElementById("ppp_spon_overlay").style.display = "none"
                  document.getElementById("ppp_spon_window").style.display = "none"
                  document.getElementById("ppp_sponsorship_bar").style.top = (ppp_browser_height - ppp_spon_current_top) + parseInt(window.pageYOffset) + "px"
                  document.getElementById("ppp_spon_ad").style.top = (parseInt(document.getElementById("ppp_sponsorship_bar").style.top) - 0) + "px"
                  document.body.style.overflow = "auto"
                  document.getElementById("ppp_sponsorship_bar").style.display = "block"
                  document.getElementById("ppp_spon_ad").style.height = "53px"
                  document.getElementById("ppp_spon_ad").style.display = "block"
                  document.getElementById("ppp_spon_toggle").style.display = "block"
                  ppp_spon_intro = false;
          }
          function ppp_toggle_sponsorship_display(){
                  if(ppp_spon_open){
                          ppp_spon_current_top = 53
                          document.getElementById("ppp_spon_ad").style.height = ppp_spon_current_top + "px"
                          document.getElementById("ppp_sponsorship_bar").style.height = ppp_spon_current_top + "px"
                          document.getElementById("ppp_sponsorship_bar").style.top = (ppp_browser_height - ppp_spon_current_top) + parseInt(window.pageYOffset) + "px"
                          document.getElementById("ppp_spon_toggle_btn").src = ppp_root+'/images/sponsorship/btn_click_to_open.png'
                  }else{
                          ppp_spon_current_top = 394
                          document.getElementById("ppp_spon_ad").style.height = ppp_spon_current_top + "px"
                          document.getElementById("ppp_sponsorship_bar").style.height = ppp_spon_current_top + "px"
                          document.getElementById("ppp_sponsorship_bar").style.top = (ppp_browser_height - ppp_spon_current_top) + parseInt(window.pageYOffset) + "px"
                          document.getElementById("ppp_spon_toggle_btn").src = ppp_root+'/images/sponsorship/btn_click_to_close.png'
                          ppp_form = document.getElementsByName("ppp_sponsorship_form")
                          ppp_set_form_value(ppp_form, "sponsorship_views[pvid]", ppp_page_view_id);
                          ppp_set_form_value(ppp_form, "sponsorship_views[sponsorship_id]", ppp_spon_data_id);
                          ppp_set_form_value(ppp_form, "sponsorship_views[view_type]", "big");
                          if(ppp_BrowserDetect.browser != "Explorer"){
                                  document.forms["ppp_sponsorship_form"].submit();
                          }else {
                                  document.getElementById("ppp_sponsorship_form").submit();
                          }
                  }
                  ppp_spon_open = !ppp_spon_open
          }
          function ppp_spon_position(){
                  if(!ppp_spon_intro){
                          if(document.getElementById("ppp_sponsorship_bar")){
                                  document.getElementById("ppp_sponsorship_bar").style.top = ((parseInt(ppp_browser_height) - parseInt(ppp_spon_current_top)) + parseInt(window.pageYOffset)) + "px"
                          }
                          if(document.getElementById("ppp_spon_ad")){
                                  document.getElementById("ppp_spon_ad").style.top = (parseInt(document.getElementById("ppp_sponsorship_bar").style.top) - 0) + "px"
                          }
                  }
          }
          function ppp_resize_browser(){
                  ppp_get_browser_dimensions()
                  ppp_spon_position();
          }
          function ppp_create_sponsorship_cookie(){
                  ppp_cookie_data = ""
                  ppp_cookie_data += ppp_spon_sponsored_by + "*!*"
                  ppp_cookie_data += ppp_spon_data_media_type + "*!*"
                  ppp_cookie_data += ppp_spon_data_media + "*!*"
                  ppp_cookie_data += ppp_spon_data_copy + "*!*"
                  ppp_cookie_data += ppp_spon_data_btn_name + "*!*"
                  ppp_cookie_data += ppp_spon_data_link + "*!*"
                  ppp_cookie_data += ppp_spon_data_blog + "*!*"
                  ppp_cookie_data += ppp_spon_data_expires + "*!*"
                  ppp_cookie_data += ppp_spon_data_id
                  ppp_createCookie("sponsorship_information", ppp_cookie_data, 0, ppp_spon_data_expires)
          }
          function ppp_draw_spon_divs(){
                  var pppDiv = document.createElement("div");
                  if(ppp_BrowserDetect.browser == "Explorer"){
                          pppDiv.id = "ppp_spon_overlay"
                  }else{
                          pppDiv.setAttribute('id','ppp_spon_overlay');
                  }
                  pppDiv.style.position = "absolute"
                  pppDiv.style.width = "100%"
                  pppDiv.style.height = "100%"
                  pppDiv.style.top = "0px"
                  pppDiv.style.left = "0px"
                  pppDiv.style.backgroundColor = "#000000"
                  pppDiv.style.opacity = ".8"
                  pppDiv.style.display = "none"
                  document.body.appendChild(pppDiv);
                  ppp_html = ""
                  ppp_html += '   <div id="ppp_spon_window_container" style="margin:0 auto;position:relative;text-align:left;width:681px;height:370px;">';
                  ppp_html += '           <div id="ppp_spon_bg_ur" style="position:absolute;top:0px;left:678px;width:15px;height:53px;"><img src="'+ppp_root+'/images/sponsorship/ur.png" width="15" height="53"></div>';
                  ppp_html += '           <div id="ppp_spon_bg_top" style="position:absolute;top:0px;left:15px;width:663px;height:53px;"><img src="'+ppp_root+'/images/sponsorship/top.png" width="663" height="53"></div>';
                  ppp_html += '           <div id="ppp_spon_bg_ul" style="position:absolute;top:0px;left:0px;width:15px;height:53px;"><img src="'+ppp_root+'/images/sponsorship/ul.png" width="15" height="53"></div>';
                  ppp_html += '           <div id="ppp_spon_bg_left" style="position:absolute;top:53px;left:0px;width:15px;height:314px;"><img src="'+ppp_root+'/images/sponsorship/left.png" width="15" height="314"></div>';
                  ppp_html += '           <div id="ppp_spon_bg_middle" style="background:url('+ppp_root+'/images/sponsorship/bg.jpg) repeat-x;position:absolute;top:53px;left:15px;width:663px;height:314px;"></div>';
                  ppp_html += '           <div id="ppp_spon_bg_right" style="position:absolute;top:53px;left:678px;width:15px;height:305px;"><img src="'+ppp_root+'/images/sponsorship/right.png" width="15" height="314"></div>';
                  ppp_html += '           <div id="ppp_spon_bg_bottom" style="position:absolute;top:358px;left:15px;width:663px;height:9px;"><img src="'+ppp_root+'/images/sponsorship/bottom.png" width="663" height="9"></div>';
                  ppp_html += '           <div id="ppp_spon_countdown_bg" style="position:absolute;top:14px;left:19px;width:33px;height:35px;display:none;"><img src="'+ppp_root+'/images/sponsorship/count_down_bg.png" width="33" height="35"></div>';
                  ppp_html += '           <div id="ppp_spon_countdown" style="position:absolute;top:18px;left:23px;width:25px;height:17px;font-family:verdana;font-size:12px;font-weight:bold;color:#ffffff;text-align:center;"></div>';
                  ppp_html += '           <div id="ppp_spon_close" style="position:absolute;top:18px;left:615px;width:54px;height:23px;cursor:pointer;z-index:1000;" onclick="ppp_spon_close()"><img src="'+ppp_root+'/images/sponsorship/close_button_off.png" width="54" height="23"></div>';
                  ppp_html += '   </div>';
                  var pppDiv = document.createElement("div");
                  if(ppp_BrowserDetect.browser == "Explorer"){
                          pppDiv.id = "ppp_spon_window"
                  }else{
                          pppDiv.setAttribute('id','ppp_spon_window');
                  }
                  pppDiv.style.position = "absolute"
                  pppDiv.style.width = "100%"
                  pppDiv.style.height = "370px"
                  pppDiv.style.top = "0px"
                  pppDiv.style.left = "0px"
                  pppDiv.style.textAlign = "center"
                  pppDiv.style.display = "none"
                  document.body.appendChild(pppDiv);
                  document.getElementById("ppp_spon_window").innerHTML = ppp_html;
                  ppp_html = ''
                  ppp_html += '   <style>';
                  ppp_html += '           #ppp_spon_bar_more_info a:link {color: #ffffff;text-decoration: none;}';
                  ppp_html += '           #ppp_spon_bar_more_info a:visited {color: #ffffff;text-decoration: none;}';
                  ppp_html += '           #ppp_spon_bar_more_info a:hover {color: #ffffff;text-decoration: none;}';
                  ppp_html += '           #ppp_spon_bar_more_info a:focus {color: #ffffff;text-decoration: none;}';
                  ppp_html += '           #ppp_spon_bar_more_info a:active {color: #ffffff;text-decoration: none;}';
                  ppp_html += '   </style>';
                  ppp_html += '   <div id="ppp_spon_bar_shading" style="position:absolute;top:0px;left:0px;height:5px;width:100%;overflow:hidden;"><img src="'+ppp_root+'/images/sponsorship/shading_for_bottom.png" width="3000" height="5"></div>';
                  ppp_html += '   <div id="ppp_spon_bar_bg" style="position:absolute;top:5px;left:0px;height:48px;width:100%;background:url('+ppp_root+'/images/sponsorship/top_bg.jpg) repeat-x;text-align:right;"></div>';
                  ppp_html += '   <div id="ppp_spon_bar_transparent_bg" style="position:absolute;top:53px;left:0px;height:305px;width:100%;background:url('+ppp_root+'/images/sponsorship/transparent_bg.jpg) repeat-x;opacity:.8;"></div>';
                  ppp_html += '   <div id="ppp_spon_bar_transparent_bottom_bg" style="position: absolute;top: 358px;left: 0px;height: 36px;width: 100%;opacity: .9;background-color: #000000;"></div>';
                  ppp_html += '   <div id="ppp_spon_bar_more_info" style="position:absolute;top:369px;left:0px;width:100%;height:30px;font-family:verdana;font-size:12px;color:#ffffff;text-align:center;"></div>';
                  var pppDiv = document.createElement("div");
                  if(ppp_BrowserDetect.browser == "Explorer"){
                          pppDiv.id = "ppp_sponsorship_bar"
                  }else{
                          pppDiv.setAttribute('id','ppp_sponsorship_bar');
                  }
                  pppDiv.style.display = "none";
                  pppDiv.style.position = "absolute";
                  pppDiv.style.overflow = "hidden";
                  pppDiv.style.top = "0px";
                  pppDiv.style.left = "0px";
                  pppDiv.style.height = "53px";
                  pppDiv.style.width = "100%";
                  document.body.appendChild(pppDiv);
                  document.getElementById("ppp_sponsorship_bar").innerHTML = ppp_html;
                  ppp_html = ''
                  ppp_html += '   <div id="ppp_spon_ad_container" style="margin:0 auto;position:relative;text-align:left;width:681px;height:370px;">';
                  ppp_html += '           <style>'
                  ppp_html += '                   #ppp_spon_ad_container a:link {color: #ffffff;text-decoration: none;}';
                  ppp_html += '                   #ppp_spon_ad_container a:visited {color: #ffffff;text-decoration: none;}';
                  ppp_html += '                   #ppp_spon_ad_container a:hover {color: #ffffff;text-decoration: none;}';
                  ppp_html += '                   #ppp_spon_ad_container a:focus {color: #ffffff;text-decoration: none;}';
                  ppp_html += '                   #ppp_spon_ad_container a:active {color: #ffffff;text-decoration: none;}';
                  ppp_html += '           </style>'
                  ppp_html += '           <div id="ppp_spon_title" style="position:absolute;top:18px;left:60px;width:573px;height:30px;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:18px;font-weight:bold;color:#ffffff;text-align:center;"></div>';
                  ppp_html += '           <div id="ppp_spon_image_bg" style="position:absolute;top:63px;left:22px;width:336px;height:281px;background-color:#ffffff"><iframe src="about:blank" width="336" height="281" frameborder="0"></iframe></div>';
                  ppp_html += '           <div id="ppp_spon_image" style="position:absolute;top:63px;left:22px;width:336px;height:281px;"></div>';
                  ppp_html += '           <div id="ppp_spon_content" style="position:absolute;top:63px;left:371px;width:296px;height:256px;overflow:auto;font-family:Arial,sans-serif;font-size:13px;color:#666666;text-align:left;">';
                  ppp_html += '                   <span id="ppp_spon_content_text"></span>';
                  ppp_html += '                   <br /><br />';
                  ppp_html += '                   <table cellpadding="0" cellspacing="0" width="1" height="23" border="0">';
                  ppp_html += '                           <tr>';
                  ppp_html += '                                   <td><img src="'+ppp_root+'/images/sponsorship/btn_left.jpg" width="5" height="23"></td>';
                  ppp_html += '                                   <td background="'+ppp_root+'/images/sponsorship/btn_bg.jpg" id="ppp_spon_btn_text" style="font-family:verdana;font-weight:bold;font-size:10px;color:#ffffff;text-align:center;padding: 0px 6px;"nowrap></td>';
                  ppp_html += '                                   <td><img src="'+ppp_root+'/images/sponsorship/btn_right.jpg" width="5" height="23"></td>';
                  ppp_html += '                           </tr>';
                  ppp_html += '                   </table>';
                  ppp_html += '           </div>';
                  ppp_html += '           <div id="ppp_spon_logo" style="position:absolute;top:323px;left:583px;width:84px;height:24px;"><img src="'+ppp_root+'/images/sponsorship/socialspark_logo.png" width="84" height="24"></div>';
                  ppp_html += '   </div>';
                  ppp_html += '   <div id="ppp_spon_toggle" style="position:absolute;top:18px;left:0px;height:48px;width:98%;padding-right:18px;text-align:right;z-index:1001;display:none"><img id="ppp_spon_toggle_btn" style="cursor:pointer;" onclick="ppp_toggle_sponsorship_display()" src="'+ppp_root+'/images/sponsorship/btn_click_to_open.png" width="101" height="23"></div>';
                  var pppDiv = document.createElement("div");
                  if(ppp_BrowserDetect.browser == "Explorer"){
                          pppDiv.id = "ppp_spon_ad"
                  }else{
                          pppDiv.setAttribute('id','ppp_spon_ad');
                  }
                  pppDiv.style.display = "none"
                  pppDiv.style.position = "absolute"
                  pppDiv.style.width = "100%"
                  pppDiv.style.height = "370px"
                  pppDiv.style.top = "0px"
                  pppDiv.style.left = "0px"
                  pppDiv.style.textAlign = "center"
                  pppDiv.style.overflow = "hidden"
                  pppDiv.style.zIndex = "999"
                  document.body.appendChild(pppDiv);
                  document.getElementById("ppp_spon_ad").innerHTML = ppp_html;
                  ppp_form = ppp_create_form_element("ppp_sponsorship_form", "ppp_data_holder_iframe", ppp_root_tracker + "/sponsorship_views/create");
                  ppp_create_input_element(ppp_form, "sponsorship_views[pvid]", ppp_page_view_id);
                  ppp_create_input_element(ppp_form, "sponsorship_views[sponsorship_id]", ppp_spon_data_id);
                  ppp_create_input_element(ppp_form, "sponsorship_views[view_type]", ppp_spon_view_type);
                  document.body.appendChild(ppp_form);
                  if(ppp_BrowserDetect.browser != "Explorer"){
                          document.forms["ppp_sponsorship_form"].submit();
                  }else {
                          document.getElementById("ppp_sponsorship_form").submit();
                  }
          }
         
  // START: Disclosure Badge
  
          function show_disclosure_ad(id){
                  if(document.getElementById('pppDiv') != null){
                  }else{
                          ppp_generatePopup(id);
                          ppp_showMousePos;
                          var pppDiv = document.createElement("div");
                          if(ppp_BrowserDetect.browser == "Explorer"){
                                  pppDiv.id = "pppDiv"
                                  pppDiv.onmouseover = function() { close_disclosure_ad=false; }
                                  pppDiv.onmouseout = function() { close_disclosure_ad=true;hide_disclosure_ad(); }
                          }else{
                                  pppDiv.setAttribute('id','pppDiv');
                                  pppDiv.setAttribute('onmouseover', 'close_disclosure_ad=false;');
                                  pppDiv.setAttribute('onmouseout', 'close_disclosure_ad=true;hide_disclosure_ad();');
                          }
                          pppDiv.style.visibility = "visible";
                          pppDiv.style.width = "447px"; //447
                          pppDiv.style.height = "308px"; //308
                          pppDiv.style.position = "absolute";
                          pppDiv.style.top = (ppp_mouse_pos_y - 320) + "px";
                          pppDiv.style.left = (ppp_mouse_pos_x - 30) + "px";
                          document.body.appendChild(pppDiv);
                          document.getElementById("pppDiv").innerHTML = ppp_popup;
                          if(ppp_BrowserDetect.browser == "Explorer")
                                  ppp_reStyleImages();           
                  }
          }
          function hide_disclosure_ad(){
                  setTimeout("ppp_do_hide()", 500);
          }
          function ppp_do_hide(){
                  if(close_disclosure_ad){
                          var ppp_div_to_close = document.getElementById('pppDiv');
                          if(ppp_div_to_close){
                                  document.body.removeChild(ppp_div_to_close);
                                  ppp_img_id = 0;
                          }
                  }
          }
          function ppp_generatePopup(this_id){
                  ppp_bbid = "/images/buglet_border/"
                  ul_w = 13; ul_h = 12; bt_w = 454; bt_h = 12; ur_w = 13; ur_h = 12; bl_w = 13; bl_h = 264; ll_w = 13; ll_h = 14; bb_w = 378; bb_h = 14; lr_w = 13; lr_h = 14; obj_w = 454; obj_h = 264;
                  if(ppp_BrowserDetect.browser == "Explorer"){ // This is IE
                          objectStyle = " style='margin:0px;padding:0px;border:0px;overflow:hidden;'";
                  }else objectStyle = "";
                  ppp_popup = "";
                  ppp_popup += "<table cellpadding='0' cellspacing='0' border='0'>";
                  ppp_popup += "  <tr>";
                  ppp_popup += "          <td>" + ppp_createPNG(ppp_root+ppp_bbid+'border_ul.png', ul_w, ul_h, 'ul') + "</td>";
                  ppp_popup += "          <td colspan='2' align='left'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_top.png', bt_w, bt_h, 'bt') + "</td>";
                  ppp_popup += "          <td>" + ppp_createPNG(ppp_root+ppp_bbid+'border_ur.png', ur_w, ur_h, 'ur') + "</td>";
                  ppp_popup += "  </tr>";
                  ppp_popup += "  <tr>";
                  ppp_popup += "          <td valign='top'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_left.png', bl_w, bl_h, 'bl') + "</td>";
                  ppp_popup += "          <td colspan='2' bgcolor='#ffffff' valign='top'>";
                  ppp_popup += "                  <iframe width='" + obj_w + "' height='" + obj_h + "' frameborder='0' id='pppObject' src='" + ppp_root + "/buglet/ad/" + this_id + "'>Your browser doesn't support iFrames.</iframe>";
                  ppp_popup += "          </td>";
                  ppp_popup += "          <td valign='top'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_right.png', bl_w, bl_h, 'bh') + "</td>";
                  ppp_popup += "  </tr>";
                  ppp_popup += "  <tr>";
                  ppp_popup += "          <td valign='top'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_ll.png', ll_w, ll_h, 'll') + "</td>";
                  ppp_popup += "          <td valign='top' align='left'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_pointer.png', 76, 50, 'pointer') + "</td>";
                  ppp_popup += "          <td valign='top' align='left'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_bottom.png', bb_w, bb_h, 'bb') + "</td>";
                  ppp_popup += "          <td valign='top'>" + ppp_createPNG(ppp_root+ppp_bbid+'border_lr.png', lr_w, lr_h, 'lr') + "</td>";
                  ppp_popup += "  </tr>";
                  ppp_popup += "</table>";
          }
  
  // START: PPP Direct
         
          function show_direct_form(id,url,badge){
                  if(document.getElementById('pppDirect') != null){
                  }else{
                          ppp_generateDirectPopup(id,url,badge);
                          ppp_showMousePos;
                          var pppDirect = document.createElement("div");
                          if(ppp_BrowserDetect.browser == "Explorer"){
                                  pppDirect.id = "pppDirect"
                          }else pppDirect.setAttribute('id','pppDirect');
                          pppDirect.style.visibility = "visible";
                          pppDirect.style.zIndex = ppp_get_highest_zindex() + 1;
                          pppDirect.style.width = "588px";
                          pppDirect.style.height = "488px";
                          pppDirect.style.position = "absolute";
                          ppp_get_scrolling()
                          ppp_get_browser_dimensions();
                          pppDirect.style.top = ((ppp_browser_height-488)/2) + ppp_offset_y + "px";
                          pppDirect.style.left = ((ppp_browser_width-588)/2) + ppp_offset_x + "px";
                          document.body.appendChild(pppDirect);
                          document.getElementById("pppDirect").innerHTML = ppp_popup;
                          if(ppp_BrowserDetect.browser == "Explorer")
                                  ppp_reStyleImages();
                  }
          }
          function ppp_direct_form_hide(){
                  var ppp_div_to_close = document.getElementById('pppDirect');
                  if(ppp_div_to_close){
                          document.body.removeChild(ppp_div_to_close);
                          ppp_img_id = 0;
                  }
          }
          function ppp_generateDirectPopup(id,url,badge){
                  ppp_pbm = "padding:0px;border:0px;margin:0px;";
                  ppp_dbid = "/images/ppp_direct/border/"
                  if(ppp_BrowserDetect.browser == "Explorer"){ // This is IE
                          objectStyle = " style='" + ppp_pbm + "overflow:hidden;'";
                  }else objectStyle = "";
                  ppp_popup = "";
                  ppp_popup += "<table cellpadding='0' cellspacing='0' border='0'>";
                  ppp_popup += "  <tr>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:80px;'><div style='" + ppp_pbm + "height:80px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'ul.png', 30, 80, 'ul') + "</div></td>";
                  ppp_popup += "          <td valign='top' style='height:80px;width:529px;" + ppp_pbm + "'>";
                  ppp_popup += "                  <div style='position:relative;height:80px;width:529px;" + ppp_pbm + "'>";
                  top_image = "top.png"
                  url_width = 338
                  url_left = 135
                  if(blog_is_typepad){
                          top_image = "top_for_typepad.png";
                          url_width = 208
                          url_left = 265
                  }
                  ppp_popup += "                          <div style='position:absolute;top:0px;left:0px;height:80px;width:529px;" + ppp_pbm + "'>" + ppp_createPNG(ppp_root+ppp_dbid+top_image, 529, 80, 'bt') + "</div>";
                  ppp_popup += "                          <div style='position:absolute;top:36px;left:"+url_left+"px;height:20px;width:"+url_width+"px;" + ppp_pbm + "overflow:hidden;text-align:right;font-weight:bold;font-size:12px;color:white;font-family:verdana;'>"+url+"</div>";
                  ppp_popup += "                          <div style='position:absolute;top:36px;left:483px;height:16px;width:47px;" + ppp_pbm + "cursor:pointer;' onclick='ppp_direct_form_hide()'>" + ppp_createPNG(ppp_root+'/images/ppp_direct/close.png', 47, 16, 'close') + "</div>";
                  ppp_popup += "                  </div>";
                  ppp_popup += "          </td>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:80px;'><div style='" + ppp_pbm + "height:80px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'ur.png', 29, 80, 'ur') + "</div></td>";
                  ppp_popup += "  </tr>";
                  ppp_popup += "  <tr>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:395px;' valign='top'><div style='" + ppp_pbm + "height:395px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'left.png', 30, 395, 'bl') + "</div></td>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:395px;' bgcolor='#ffffff' valign='top' width='529' height='395'>";
                  urlValidator = new Url();
                  this_loc = window.location + "";
                  if(urlValidator.CompareUrls(url, this_loc) == true || (this_loc == ppp_root + "/ppp_direct/blogger_directory.html")){
                          url_src = ppp_root+"/direct/offer_information/"+id+"?badge="+badge
                  }else{
                          url_src = ppp_root+"/direct/wrong_location/"
                  }
                  ppp_popup += "                  <div style='" + ppp_pbm + "height:395px;'><iframe width='529' height='395' frameborder='0' id='pppObject' src='"+url_src+"'>Your browser doesn't support iFrames.</iframe></div>";
                  ppp_popup += "          </td>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:395px;' valign='top'><div style='" + ppp_pbm + "height:395px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'right.png', 29, 395, 'bh') + "</div></td>";
                  ppp_popup += "  </tr>";
                  ppp_popup += "  <tr>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:30px;' valign='top'><div style='" + ppp_pbm + "height:30px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'ll.png', 30, 30, 'll') + "</div></td>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:30px;' valign='top' align='left'><div style='" + ppp_pbm + "height:30px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'bottom.png', 529, 30, 'bb') + "</div></td>";
                  ppp_popup += "          <td style='" + ppp_pbm + "height:30px;' valign='top'><div style='" + ppp_pbm + "height:30px;'>" + ppp_createPNG(ppp_root+ppp_dbid+'lr.png', 29, 30, 'lr') + "</div></td>";
                  ppp_popup += "  </tr>";
                  ppp_popup += "</table>";
          }
         
  // START: Analytics
  
          function ppp_create_data_holder(){
                  element = document.createElement("div");
                  element.setAttribute("id", "ppp_data_holder");
                  element.setAttribute("name", "ppp_data_holder");
                  element.style.position                  = "absolute";
                  element.style.top                               = "-1000px";
                  element.style.left                              = "-1000px";
                  element.style.width                     = "1px";
                  element.style.height                    = "1px";
                  element.style.visibility                = "hidden";
                  document.body.appendChild(element);
                  document.getElementById("ppp_data_holder").innerHTML = "<iframe width='600' height='600' name='ppp_data_holder_iframe' id='ppp_data_holder_iframe' src='about:blank'></iframe>"
          }
          function ppp_arrive(){
                  ppp_create_data_holder();
                  ppp_get_browser_dimensions();
                  //ppp_get_links();
                  ppp_get_doc_dimensions();
                  ppp_tracker_root = ppp_root_tracker + "/page_views/create";
                  if(ppp_new_visit) ppp_tracker_root = ppp_root_tracker + "/visits/create";
                  ppp_form = ppp_create_form_element("ppp_data_form", "ppp_data_holder_iframe", ppp_tracker_root);
                  ppp_create_input_element(ppp_form, "visit[session_key]", ppp_session_id);
                  ppp_create_input_element(ppp_form, "page_views[referer]", ppp_refer_page);
                  ppp_create_input_element(ppp_form, "page_views[document_dimensions]", ppp_doc_width + "x" + ppp_doc_height);
                  ppp_create_input_element(ppp_form, "page_views[url]", ppp_cur_location);
                  ppp_create_input_element(ppp_form, "page_views[pvid]", ppp_page_view_id);
                  ppp_create_input_element(ppp_form, "page_views[sid]", ppp_session_id);
                  if(ppp_new_visit){
                          ppp_create_input_element(ppp_form, "visit[url]", ppp_cur_location);
                          ppp_create_input_element(ppp_form, "visit[browser]", ppp_BrowserDetect.browser);
                          ppp_create_input_element(ppp_form, "visit[version]", ppp_BrowserDetect.version);
                          ppp_create_input_element(ppp_form, "visit[dimensions]", ppp_browser_width + "x" + ppp_browser_height);
                          ppp_create_input_element(ppp_form, "visit[unique_visitor]", ppp_unique_user);
                          ppp_create_input_element(ppp_form, "visit[os]", ppp_BrowserDetect.OS);
                          ppp_create_input_element(ppp_form, "visit[screen_resolution]", screen.width + "x" + screen.height);
                          ppp_create_input_element(ppp_form, "visit[screen_available]", screen.availWidth + "x" + screen.availHeight);
                          ppp_create_input_element(ppp_form, "visit[color_depth]", screen.colorDepth);
                          ppp_create_input_element(ppp_form, "visit[language]", ppp_get_browser_language());
                  }
                  //ppp_create_input_element(ppp_form, "page_views[links]", ppp_all_anchors);
                  ppp_create_input_element(ppp_form, "page_views[browser_dimensions]", ppp_browser_width + "x" + ppp_browser_height);
                  document.body.appendChild(ppp_form);
                  if(ppp_BrowserDetect.browser != "Explorer"){
                          document.forms["ppp_data_form"].submit();
                  }else {
                          document.getElementById("ppp_data_form").submit();
                  }
                  ppp_create_click_form();
          }
          function ppp_get_links(){
                  ppp_all_anchors = "";
                  for(i=0;i<document.links.length;i++){ ppp_all_anchors += document.links[i].href + ","; };
          };
          function ppp_create_click_form(){
                  ppp_form = ppp_create_form_element("ppp_click_form", "ppp_data_holder_iframe", ppp_root_tracker + "/events/create");
                  ppp_create_input_element(ppp_form, "session_key", ppp_session_id);
                  ppp_create_input_element(ppp_form, "visit[id]", ppp_page_view_id);
                  ppp_create_input_element(ppp_form, "page_views[view_time]", "0");
                  ppp_create_input_element(ppp_form, "event[pvid]", ppp_page_view_id);
                  ppp_create_input_element(ppp_form, "event[element]", "");
                  //ppp_create_input_element(ppp_form, "event[browser_location]", "");
                  //ppp_create_input_element(ppp_form, "event[element_location]", "");
                  //ppp_create_input_element(ppp_form, "event[element_attributes]", "");
                  ppp_create_input_element(ppp_form, "event[innerHTML]", "");
                  ppp_create_input_element(ppp_form, "event[left_via]", "");
                  ppp_create_input_element(ppp_form, "event[departed_at]", "");
                  ppp_create_input_element(ppp_form, "event[destination]", "");
                  ppp_create_input_element(ppp_form, "event[scrolltop]", "");
                  ppp_create_input_element(ppp_form, "event[scrollleft]", "");           
                  //ppp_create_input_element(ppp_form, "event[path]", "");               
                  //ppp_create_input_element(ppp_form, "event[parent_innerhtml]", "");
                  ppp_create_input_element(ppp_form, "event[url]", ppp_cur_location);
                  ppp_create_input_element(ppp_form, "browser[which]", ppp_BrowserDetect.browser);
                  document.body.appendChild(ppp_form);
                  //ppp_check_for_sponsorship();
          }
          function ppp_click(e){
                  ppp_destination = "";
                  ppp_left_via = "";
                  ppp_get_browser_dimensions();
                  if (!e) var e = window.event;
                  ppp_get_scrolling();
                  var targ = ppp_get_this_element(e);
                  ppp_click_information = "";
                  for(i=0;i<targ.attributes.length;i++){
                          name = targ.attributes[i].name + "";
                          val = targ.attributes[i].value + "";
                          tag = targ.tagName + "";
                          ppp_click_information += name + "=" + val + ",";
                          ppp_determine_if_left_via_anchor(tag.toLowerCase(), name.toLowerCase());
                          ppp_determine_if_left_via_js(name.toLowerCase(), val.toLowerCase());
                          ppp_determine_if_left_via_form(name.toLowerCase(), val.toLowerCase(), targ);
                  }
                  ppp_determine_exit_and_destination(targ);
                 
                          if(ppp_destination && ppp_destination.indexOf(ppp_cur_domain) == -1){ ppp_eraseCookie("pppSessionID"); }
                          ppp_depart_time = new Date()
                          ppp_view_time = parseInt(ppp_depart_time.getTime()/1000) - parseInt(ppp_arrive_time.getTime()/1000)
                          ppp_cf = "ppp_click_form"
                          ppp_set_form_value(ppp_cf, "event[innerHTML]", "") //cleaning
                          //ppp_set_form_value(ppp_cf, "event[parent_innerhtml]", "") //cleaning
                          ppp_set_form_value(ppp_cf, "event[element]", targ.tagName)
                          //ppp_set_form_value(ppp_cf, "event[browser_location]", "")
                          //ppp_set_form_value(ppp_cf, "event[element_location]", "")
                          //ppp_set_form_value(ppp_cf, "event[element_attributes]", ppp_click_information)
                          ppp_set_form_value(ppp_cf, "event[innerHTML]", targ.innerHTML)
                          ppp_set_form_value(ppp_cf, "event[left_via]", ppp_left_via)
                          ppp_set_form_value(ppp_cf, "event[departed_at]", ppp_depart_time)
                          ppp_set_form_value(ppp_cf, "event[destination]", ppp_destination)
                          ppp_set_form_value(ppp_cf, "event[scrolltop]", ppp_offset_y)
                          ppp_set_form_value(ppp_cf, "event[scrollleft]", ppp_offset_x)
                          //ppp_set_form_value(ppp_cf, "event[parent_innerhtml]", "")
                          ppp_set_form_value(ppp_cf, "page_views[view_time]", ppp_view_time)
                          if(ppp_destination){
                                  if(ppp_BrowserDetect.browser != "Explorer"){
                                          if(ppp_BrowserDetect.browser == "Safari"){
                                                  // DO NOTHING
                                                  // if(ppp_event_which(e) == "LEFT"){
                                                  //        document.forms[ppp_cf].submit();
                                                  //  }
                                          }else{
                                                  document.forms[ppp_cf].submit();
                                          }
                                  }else{
                                          document.getElementById(ppp_cf).submit();
                                  }
                          }
          }
          function ppp_set_form_value(which_form, which_field, val){
                  if (ppp_BrowserDetect.browser != "Explorer"){
                          if(document.getElementsByName(which_field)){
                                  document.getElementsByName(which_field)[0].value = val;
                          }
                  }else{
                          var theForm = document.getElementById(which_form)
                          if(theForm){
                                  theForm[which_field].value = val;
                          }
                  }
          }
          function ppp_determine_exit_and_destination(obj){
                  if(ppp_form_action != ""){
                          ppp_destination = ppp_form_action
                          ppp_left_via = "Form Submit"
                  }else if(ppp_onclick_action != ""){
                          ppp_destination = ppp_onclick_action
                          ppp_left_via = "Javascript Onclick"
                  }else ppp_destination = obj.href;
          }
          function ppp_determine_if_left_via_form(name,value,elm){
                  if(name == "type" && value == "submit"){
                          obj = elm
                          while(obj.tagName != "FORM") {
                                  obj = obj.parentNode;
                          }
                          ppp_form_action = obj.action + ""
                  }
          }
          function ppp_determine_if_left_via_js(name, value){
                  if(name == "onclick" && value.indexOf("location.href") > -1){
                          onclick_action = value
                          onclick_action = onclick_action.replace(/ /, '');
                          onclick_action = onclick_action.replace(/'/, '');
                          onclick_action = onclick_action.replace(/"/, '');
                          onclick_action = onclick_action.split("location.href=")
                          ppp_onclick_action = onclick_action[1];
                  }
          }
          function ppp_determine_if_left_via_anchor(tag, name){
                  if(tag == "a" && name == "href") ppp_left_via = "Anchor Tag"
          }
  
  // START: Creating Form Functions
  
          function ppp_create_input_element(form, name, value){
                  a = document.createElement("input");
                  if(ppp_BrowserDetect.browser != "Explorer"){
                          a.setAttribute("type", "hidden");
                          a.setAttribute("name", name);
                          a.setAttribute("value", value);
                  }else{
                          a.type = "hidden";
                          a.name = name;
                          a.id = name;
                          a.value = value;
                  }
                  form.appendChild(a);
          }
          function ppp_create_form_element(name, target, action){
                  a = document.createElement("form");
                  if(ppp_BrowserDetect.browser != "Explorer"){
                          a.setAttribute("name", name);
                          a.setAttribute("method", "post");
                          a.setAttribute("target", target);
                          a.setAttribute("action", action);
                  }else{
                          a.name = name;
                          a.id = name;
                          a.method = "post";
                          a.target = target;
                          a.action = action;
                  }
                  return a;
          }
  
  // START: Browser and Object Information
                 
          function ppp_get_this_element(e){
                  var return_element;
                  if (e.target) return_element = e.target;
                  else if (e.srcElement) return_element = e.srcElement;
                  if (return_element.nodeType == 3) return_element = return_element.parentNode; // defeat Safari bug
                  ppp_return_element = return_element;
                  return return_element;
          };
          function ppp_get_scrolling(){
                  if(ppp_BrowserDetect.browser == "Explorer"){
                          ppp_offset_y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
                          ppp_offset_x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
                  }else{
                          ppp_offset_y = window.pageYOffset;
                          ppp_offset_x = window.pageXOffset;
                  }
          };
          function ppp_getPixelsFromTop(obj){
                  objFromTop = obj.offsetTop;
                  while(obj.offsetParent!=null) {
                          objParent = obj.offsetParent;
                          objFromTop += objParent.offsetTop;
                          obj = objParent;
                  }
                  return objFromTop;
          };
          function ppp_getPixelsFromLeft(obj){
                  objFromLeft = obj.offsetLeft;
                  while(obj.offsetParent!=null) {
                          objParent = obj.offsetParent;
                          objFromLeft += objParent.offsetLeft;
                          obj = objParent;
                  }
                  return objFromLeft;
          };
          function ppp_get_browser_dimensions(){
                  if( typeof( window.innerWidth ) == 'number' ) {
                  //Non-IE
                  ppp_browser_width = window.innerWidth;
                  ppp_browser_height = window.innerHeight;
                  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                  //IE 6+ in 'standards compliant mode'
                  ppp_browser_width = document.documentElement.clientWidth;
                  ppp_browser_height = document.documentElement.clientHeight;
                  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                  //IE 4 compatible
                  ppp_browser_width = document.body.clientWidth;
                          ppp_browser_height = document.body.clientHeight;
                  }
                  ppp_get_doc_dimensions()
                  if(ppp_doc_height > ppp_browser_height){
                          ppp_browser_width = ppp_browser_width - 15
                  }
          }
          function ppp_get_doc_dimensions(){
                  ppp_doc_width = document.width ? document.width : document.documentElement.offsetWidth
                  ppp_doc_height = document.height ? document.height : document.documentElement.offsetHeight
          }
          function ppp_get_browser_language(){
                  if (navigator.appName == 'Netscape')
                      var language = navigator.language;
                  else
                      var language = navigator.browserLanguage;
                  var code = language.substring(0,2);
                  return code
          }
  
  // START: User ID
  
          function ppp_S4(){return (((1+Math.random())*0x10000)|0).toString(16).substring(1)}
          function ppp_create_id(){
                  ppp_this_id = (ppp_S4()+ppp_S4()+"-"+ppp_S4()+"-"+ppp_S4()+"-"+ppp_S4()+"-"+ppp_S4()+ppp_S4()+ppp_S4())
                  //alert(ppp_this_id)
                  return ppp_this_id
          }
  
  // START: Mouse Tracking
  
          function ppp_mouse_trail(){
                  if(ppp_lastX != ppp_mouse_pos_x && ppp_lastY != ppp_mouse_pos_y){
                          ppp_mousepath += "*" + ppp_mouse_pos_x + "," + ppp_mouse_pos_y;
                          ppp_lastX = ppp_mouse_pos_x;
                          ppp_lastY = ppp_mouse_pos_y;
                  }
          }
          function ppp_showMousePos(e) {
                  if(ppp_BrowserDetect.browser == "Explorer"){
                          ppp_mouse_pos_x = event.clientX + document.body.scrollLeft;
                          ppp_mouse_pos_y = event.clientY + document.body.scrollTop;
                  }else{
                          ppp_mouse_pos_x = e.pageX;
                          ppp_mouse_pos_y = e.pageY;
                  }
                  if (ppp_mouse_pos_x < 0) ppp_mouse_pos_x = 0;
                  if (ppp_mouse_pos_y < 0) ppp_mouse_pos_y = 0;
          }
          function ppp_event_which(event){
                  button = (event.which < 2) ? "LEFT" :
                                   ((event.which == 2) ? "MIDDLE" : "RIGHT");
          }
         
  // START: Cookies
  
          function ppp_createCookie(name,value,days){
                  if (days){
                          var date = new Date();
                          date.setTime(date.getTime()+(days*24*60*60*1000));
                          var expires = "; expires="+date.toGMTString();
                  }
                  else var expires = "";
                  document.cookie = name+"="+value+expires+"; path=/";
          }
          function ppp_readCookie(name){
                  var nameEQ = name + "=";
                  var ca = document.cookie.split(';');
                  for(var i=0;i < ca.length;i++){
                          var c = ca[i];
                          while (c.charAt(0)==' ') c = c.substring(1,c.length);
                          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                  }
                  return null;
          };
          function ppp_eraseCookie(name) {
                  ppp_createCookie(name,"",-1);
          };
         
  // START: Styling Functions
  
          function ppp_createPNG(img,width,height,name){
                  ppp_img_id++;
                  return '<img name="'+name+'" id="ppp_border_image_'+ppp_img_id+'" SRC="'+img+'" ALT="PPP Image" height='+height+' width='+width+' style="padding:0px;border:0px;margin:0px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+img+', sizingMethod=scale);" >';
          }
          function ppp_fixPadding(){
                  pppObject.body.style.margin = '0';
                  pppObject.body.style.padding = '0';
          };
          function ppp_reStyleImages(){
                  for(i=1;i<ppp_img_id+1;i++){
                          if(document.getElementById("ppp_border_image_"+i).src && document.getElementById("ppp_border_image_"+i).src != ppp_root + "/images/spacer.gif")
                                  eval("ppp_border_image_"+i+".src = '"+ppp_root+"/images/spacer.gif'");
                  }
                  ppp_has_been_restyled = true;
          };
          function ppp_get_highest_zindex(){
                  var allElems = document.getElementsByTagName? document.getElementsByTagName("*") : document.all; // or test for that too
                  var maxZIndex = 0;
                  for(var i=0;i<allElems.length;i++) {
                          var elem = allElems[i];
                          var cStyle = null;
                          if (elem.currentStyle) {
                                  cStyle = elem.currentStyle;
                          }else if (document.defaultView && document.defaultView.getComputedStyle) {
                                  cStyle = document.defaultView.getComputedStyle(elem,"");
                          }
                          var sNum;
                          if (cStyle) {
                                  sNum = Number(cStyle.zIndex);
                          }else sNum = Number(elem.style.zIndex);
                          if (!isNaN(sNum))
                                  maxZIndex = Math.max(maxZIndex,sNum);
                  }
                  return maxZIndex;
          }
          function ppp_clean_escapes(val){
                  val = unescape(val)
                  return val
          }