(function(){var g=!0,h=null,i=!1,aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,e);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},k=function(a,b,c){k=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return k.apply(h,arguments)};var l=(new Date).getTime();var ca=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},da=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,ea=function(a,b){if(!a)return b;var c=a.match(da);return c?c[0]:b};var fa=ca("0.0"),ga=ca("0.001"),ha=ca("0.001");var ia=/^true$/.test("false")?g:i;var ja=function(){return ea("","pagead2.googlesyndication.com")};var ka=/&/g,la=/</g,na=/>/g,oa=/\"/g,pa={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},m={"'":"\\'"};var s=window,w,qa=h,x=document.getElementsByTagName("script");x&&x.length&&(qa=x[x.length-1].parentNode);w=qa;ja();var y=function(a){return!!a&&"function"==typeof a&&!!a.call},ra=function(a,b){if(!(2>arguments.length))for(var c=1,e=arguments.length;c<e;++c)a.push(arguments[c])},sa=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b)return a[Math.floor(c/b*a.length)]}return h},ta=function(a){try{return!!a.location.href||""===a.location.href}catch(b){return i}};var ua=h,va=function(){if(!ua){for(var a=window,b=a,c=0;a!=a.parent;)if(a=a.parent,c++,ta(a))b=a;else break;ua=b}return ua};var z,A=function(a){this.c=[];this.b=a||window;this.a=0;this.d=h},wa=function(a,b){this.l=a;this.i=b};A.prototype.o=function(a,b){0==this.a&&0==this.c.length&&(!b||b==window)?(this.a=2,this.f(new wa(a,window))):this.g(a,b)};A.prototype.g=function(a,b){this.c.push(new wa(a,b||this.b));xa(this)};A.prototype.p=function(a){this.a=1;a&&(this.d=this.b.setTimeout(k(this.e,this),a))};A.prototype.e=function(){1==this.a&&(this.d!=h&&(this.b.clearTimeout(this.d),this.d=h),this.a=0);xa(this)};A.prototype.q=function(){return g};
A.prototype.nq=A.prototype.o;A.prototype.nqa=A.prototype.g;A.prototype.al=A.prototype.p;A.prototype.rl=A.prototype.e;A.prototype.sz=A.prototype.q;var xa=function(a){a.b.setTimeout(k(a.m,a),0)};A.prototype.m=function(){if(0==this.a&&this.c.length){var a=this.c.shift();this.a=2;a.i.setTimeout(k(this.f,this,a),0);xa(this)}};A.prototype.f=function(a){this.a=0;a.l()};
var ya=function(a){try{return a.sz()}catch(b){return i}},za=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&ya(a)&&y(a.nq)&&y(a.nqa)&&y(a.al)&&y(a.rl)},Aa=function(){if(z&&ya(z))return z;var a=va(),b=a.google_jobrunner;return za(b)?z=b:a.google_jobrunner=z=new A(a)},Ba=function(a,b){Aa().nq(a,b)},Ca=function(a,b){Aa().nqa(a,b)};var Da=/MSIE [2-7]|PlayStation|Gecko\/20090226/i,Ea=/Android|Opera/,Fa=function(){var a=B,b=C.google_ad_width,c=C.google_ad_height,e=["<iframe"],d;for(d in a)a.hasOwnProperty(d)&&ra(e,d+"="+a[d]);e.push('style="left:0;position:absolute;top:0;"');e.push("></iframe>");b="border:none;height:"+c+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+b+"px";return['<ins style="display:inline-table;',b,'"><ins id="',a.id+"_anchor",'" style="display:block;',b,'">',e.join(" "),"</ins></ins>"].join("")};var Ga=function(a,b,c){c||(c=ia?"https":"http");return[c,"://",a,b].join("")};var Ha=function(){},Ja=function(a,b,c){switch(typeof b){case "string":Ia(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==h){c.push("null");break}if(b instanceof Array){var e=b.length;c.push("[");for(var d="",f=0;f<e;f++)c.push(d),Ja(a,b[f],c),d=",";c.push("]");break}c.push("{");e="";for(d in b)b.hasOwnProperty(d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Ia(d,c),c.push(":"),Ja(a,f,c),e=
","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Ka={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},La=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Ia=function(a,b){b.push('"');b.push(a.replace(La,function(a){if(a in Ka)return Ka[a];var b=a.charCodeAt(0),d="\\u";16>b?d+="000":256>b?d+="00":4096>b&&(d+="0");return Ka[a]=d+b.toString(16)}));b.push('"')};var D="google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_output google_ad_override google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_analytics_domain_name google_analytics_uacct google_bid google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_contents google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_ed google_eids google_enable_ose google_encoding google_font_face google_font_size google_frame_id google_gl google_hints google_image_size google_kw google_kw_type google_lact google_language google_loeid google_max_num_ads google_max_radlink_len google_mtl google_num_radlinks google_num_radlinks_per_unit google_num_slots_to_rotate google_only_ads_with_video google_only_pyv_ads google_only_userchoice_ads google_override_format google_page_url google_previous_watch google_previous_searches google_referrer_url google_region google_reuse_colors google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_sc_id google_scs google_sui google_skip google_tag_info google_targeting google_tdsma google_tfs google_tl google_ui_features google_ui_version google_video_doc_id google_video_product_type google_with_pyv_ads google_yt_pt google_yt_up".split(" ");var Ma=function(){var a=E,b=/\.((google(|groups|mail|images|print))|gmail)\./.test(a.location.host);return!(!a.postMessage||!a.localStorage||!a.JSON||b)};var Na=function(a){this.b=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{}});this.j=a.google_iframe_oncopy},Oa;var F="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){w.location.replace(h)}}";
/[&<>\"]/.test(F)&&(-1!=F.indexOf("&")&&(F=F.replace(ka,"&amp;")),-1!=F.indexOf("<")&&(F=F.replace(la,"&lt;")),-1!=F.indexOf(">")&&(F=F.replace(na,"&gt;")),-1!=F.indexOf('"')&&(F=F.replace(oa,"&quot;")));Oa=F;Na.prototype.set=function(a,b){this.j.handlers[a]=b;this.b.addEventListener&&this.b.addEventListener("load",k(this.k,this,a),i)};Na.prototype.k=function(a){a=this.b.document.getElementById(a);var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()};function Pa(){var a=E,b=E.document,c=a.google_ad_width,e=a.google_ad_height,d;a:{try{d=a.top.document==b;break a}catch(f){}d=i}if(d)return i;d=b.documentElement;if(c&&e){var j=1,n=1;a.innerHeight?(j=a.innerWidth,n=a.innerHeight):d&&d.clientHeight?(j=d.clientWidth,n=d.clientHeight):b.body&&(j=b.body.clientWidth,n=b.body.clientHeight);if(n>2*e||j>2*c)return i}return g};var Qa=function(){var a="script";return["<",a,' src="',Ga(ja(),"/pagead/js/r20130116/r20121214/show_ads_impl.js",""),'"></',a,">"].join("")},Ra=function(){var a="script";return["<",a,' src="',Ga(ja(),"/pagead/expansion_embed.js"),'"></',a,">"].join("")},Sa=function(a){var b;if(!(b="expt"!=a.google_expand_experiment))a:{var c=a.document;try{var e;if(!(e=
a.google_allow_expandable_ads===i)){var d;if(!(d=!c.body)){var f;if(!(f=a.google_ad_output&&"html"!=a.google_ad_output)){var j;if(!(j=isNaN(a.google_ad_height))){var n;if(!(n=isNaN(a.google_ad_width))){var u;if(!(u=c.domain!=a.location.hostname)){var t;b:{a=navigator;var p=a.userAgent,G=a.platform;if(/Win|Mac|Linux/.test(G)&&!/^Opera/.test(p)){var U=(/WebKit\/(\d+)/.exec(p)||[0,0])[1],ma=(/rv\:(\d+\.\d+)/.exec(p)||[0,0])[1];if(/Win/.test(G)&&/MSIE.*Trident/.test(p)&&7<c.documentMode||!U&&"Gecko"==
a.product&&1.7<ma&&!/rv\:1\.8([^.]|\.0)/.test(p)||524<U){t=g;break b}}t=i}u=!t}n=u}j=n}f=j}d=f}e=d}if(e){b=g;break a}}catch(V){b=g;break a}b=i}return b?i:g},Ta=function(a,b,c,e){return function(){var d=i;e&&Aa().al(3E4);try{if(ta(a.document.getElementById(b).contentWindow)){var f=a.document.getElementById(b).contentWindow,j=f.document;if(!j.body||!j.body.firstChild)j.open(),f.google_async_iframe_close=g,j.write(c)}else{var n=a.document.getElementById(b).contentWindow,u;f=c;f=String(f);if(f.quote)u=
f.quote();else{for(var j=['"'],t=0;t<f.length;t++){var p=f.charAt(t),G=p.charCodeAt(0),U=j,ma=t+1,V;if(!(V=pa[p])){var H;if(31<G&&127>G)H=p;else{var r=p;if(r in m)H=m[r];else if(r in pa)H=m[r]=pa[r];else{var q=r,v=r.charCodeAt(0);if(31<v&&127>v)q=r;else{if(256>v){if(q="\\x",16>v||256<v)q+="0"}else q="\\u",4096>v&&(q+="0");q+=v.toString(16).toUpperCase()}H=m[r]=q}}V=H}U[ma]=V}j.push('"');u=j.join("")}n.location.replace("javascript:"+u)}d=g}catch(Lb){n=va().google_jobrunner,za(n)&&n.rl()}d&&(new Na(a)).set(b,
Ta(a,b,c,i))}},Ua=Math.floor(1E6*Math.random()),Va=function(a){a=a.data.split("\n");for(var b={},c=0;c<a.length;c++){var e=a[c].indexOf("=");-1!=e&&(b[a[c].substr(0,e)]=a[c].substr(e+1))}b[1]==Ua&&(window.google_top_url=b[3])};window.google_loader_used=g;var I=window;if(!("google_onload_fired"in I)){I.google_onload_fired=i;var Wa=function(){I.google_onload_fired=g};I.addEventListener?I.addEventListener("load",Wa,i):I.attachEvent&&I.attachEvent("onload",Wa)}var Xa=window,Ya=2;try{Xa.top.document==Xa.document?Ya=0:ta(Xa.top)&&(Ya=1)}catch(Za){}
if(2===Ya&&top.postMessage&&!window.google_top_experiment&&(window.google_top_experiment=sa(["jp_e","jp_c"],ga),"jp_e"===window.google_top_experiment)){var J=window;J.addEventListener?J.addEventListener("message",Va,i):J.attachEvent&&J.attachEvent("onmessage",Va);var $a={"0":"google_loc_request",1:Ua},ab=[],bb;for(bb in $a)ab.push(bb+"="+$a[bb]);top.postMessage(ab.join("\n"),"*")}window.google_expand_experiment||(window.google_expand_experiment=sa(["expt","control"],fa)||"none");var cb;
if(window.google_enable_async===i)cb=0;else{var db=navigator.userAgent;cb=(Da.test(db)||Ea.test(db)?i:g)&&!window.google_container_id&&(!window.google_ad_output||"html"==window.google_ad_output)}
if(cb){var eb=window;eb.google_unique_id?++eb.google_unique_id:eb.google_unique_id=1;for(var E=window,_script$$inline_87="script",K,C=E,B={allowtransparency:'"true"',frameborder:'"0"',height:'"'+E.google_ad_height+'"',hspace:'"0"',marginwidth:'"0"',marginheight:'"0"',onload:'"'+Oa+'"',scrolling:'"no"',vspace:'"0"',width:'"'+E.google_ad_width+'"'},fb=C.document,L=B.id,gb=0;!L||C.document.getElementById(L);)L="aswift_"+gb++;B.id=L;B.name=L;fb.write(Fa());K=L;var hb,M=E;M.google_page_url&&(M.google_page_url=
String(M.google_page_url));for(var ib=[],jb=0,kb=D.length;jb<kb;jb++){var lb=D[jb];if(M[lb]!=h){var mb;try{var nb=[];Ja(new Ha,M[lb],nb);mb=nb.join("")}catch(ob){}mb&&ra(ib,lb,"=",mb,";")}}hb=ib.join("");var N=window,pb=N.google_ad_output,O=N.google_ad_format;if(!O&&("html"==pb||pb==h))O=N.google_ad_width+"x"+N.google_ad_height;O=O&&(!N.google_ad_slot||N.google_override_format)?O.toLowerCase():"";N.google_ad_format=O;var P,qb=[s.google_ad_slot,s.google_ad_format,s.google_ad_type,s.google_ad_width,
s.google_ad_height];if(w){var Q;if(w){for(var rb=[],sb=0,R=w;R&&25>sb;R=R.parentNode,++sb)rb.push(9!=R.nodeType&&R.id||"");Q=rb.join()}else Q="";Q&&qb.push(Q)}var tb=0;if(qb){var ub=qb.join(":"),vb=ub.length;if(0==vb)tb=0;else{for(var S=305419896,wb=0;wb<vb;wb++)S^=(S<<5)+(S>>2)+ub.charCodeAt(wb)&4294967295;tb=0<S?S:4294967296+S}}P=tb.toString();a:{var T=window,W=T.google_async_slots;W||(W=T.google_async_slots={});var xb=T.google_unique_id,X=String("number"==typeof xb?xb:0);if(X in W&&(X+="b",X in
W))break a;W[X]={sent:i,w:T.google_ad_width||"",h:T.google_ad_height||"",adk:P,type:T.google_ad_type||"",slot:T.google_ad_slot||"",fmt:T.google_ad_format||"",cli:T.google_ad_client||"",saw:[]}}var Y=E.google_ad_handling_experiment||(Ma()?sa("X XN S SC PL PS".split(" "),ha):""),yb="";if(Ma()&&"S"!=Y&&"XN"!=Y){var zb;zb="zrt_ads_frame"+E.google_unique_id;var Ab=E.google_page_url||Pa()?E.document.referrer:E.document.URL,Bb=h;if("PL"==Y||"PS"==Y)Bb="K="+(Ab+"_"+P+"_"+E.google_unique_id);var Cb=Bb,Z={style:"display:none"};
Z.id=zb;Z.name=zb;Z.src=Ga(ea("","googleads.g.doubleclick.net"),["/pagead/html/r20130116/r20121214/zrt_lookup.html",Cb?"#"+Cb:""].join(""));var Db=["<iframe"],Eb=function(a,b){Db.push(" "+b+'="'+(a==h?"":a)+'"')},$;for($ in Z)Object.prototype.hasOwnProperty.call(Z,$)&&Eb.call(h,Z[$],$);Db.push("></iframe>");yb=Db.join("")}for(var Fb=E,Gb=0,Hb=D.length;Gb<Hb;Gb++)Fb[D[Gb]]=h;var Ib=(new Date).getTime(),
Jb=E.google_top_experiment,Kb=E.google_expand_experiment,Mb="";Sa(E)&&(Mb=Ra());var Nb=["<!doctype html><html><body>",yb,"<",_script$$inline_87,">",hb,"google_show_ads_impl=true;google_unique_id=",E.google_unique_id,';google_async_iframe_id="',K,'";google_ad_unit_key="',P,'";google_start_time=',l,";",Jb?'google_top_experiment="'+Jb+'";':"",Kb?'google_expand_experiment="'+Kb+'";':"",Y?'google_ad_handling_experiment="'+Y+'";':"","google_bpp=",Ib>l?Ib-l:1,";</",_script$$inline_87,">",Mb,Qa(),"</body></html>"].join("");
(E.document.getElementById(K)?Ba:Ca)(Ta(E,K,Nb,g))}else window.google_start_time=l,!("object"==typeof window.n&&"function"==typeof window.n.createIframe)&&Sa(window)&&document.write(Ra()),document.write(Qa());})();