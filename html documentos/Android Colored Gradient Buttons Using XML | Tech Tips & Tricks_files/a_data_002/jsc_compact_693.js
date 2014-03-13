var js_ver=693;
var f=null;
var tbl=null;
var cbm;
var clid=0;
var clidC="";
var stitle="";
var foc=0;
function c2init(){
f=document.forms.cbox;
rsz(0);
var x=getcookie("key_"+s_id);
if(x!=null&&!s_uo){
f.key.value=x;
}
if(s_uo&&(f.nme.value==""||f.key.value=="")){
f.pst.value=t0;
f.pst.disabled=true;
f.sub.disabled=true;
}else{
if(s_uo==3){
do_getlvlhint();
}
}
try{
cbm=parent["cboxmain"+s_no];
if(cbm){
cbm.cinit();
}
}
catch(e){
}
clidC="clid_"+s_id;
clid=parseInt(getcookie(clidC));
if(clid<1||isNaN(clid)){
clid=0;
}
clid++;
document.cookie=clidC+"="+clid+"; path=/";
if(s_pp){
stitle=parent.document.title;
}
window.onfocus=function(){
foc|=2;
};
window.onblur=function(){
foc^=2;
};
document.onfocusin=function(){
foc|=2;
};
document.onfocusout=function(){
foc^=2;
};
document.body.onkeydown=function(e){
var e=e||window.event;
if(e.ctrlKey&&e.altKey&&(e.which||e.keyCode)==74){
set_status("V: "+js_ok+"; arloop enabled: "+arloop+"; ar_on: "+ar_on+"; long enabled: "+ar_long+"; long active: "+in_ar_long+"; flconn active: "+gotconn+"; relaytries: "+relaytries+"; fldog: "+debug_wdtimer+"; ard: "+ard+"; art: "+art+";");
}
};
}
var iScroll=null;
var ugScroll=true;
var stickScroll=true;
function autoScroll(){
var _3=cbm.document.body;
if(s_sd==0){
var _4=0;
}else{
var _4=_3.scrollHeight-_3.clientHeight;
}
if(_3&&_3.scrollTop!=_4){
ugScroll=false;
cbm.document.body.scrollTop=_4;
}
if(iScroll===null){
iScroll=window.setInterval(autoScroll,200);
}
}
function chkScroll(){
var _5=cbm.document.body;
var _6=!ugScroll;
ugScroll=true;
if(_6){
return;
}
if(stickScroll){
stickScroll=false;
}
if(iScroll!==null){
window.clearInterval(iScroll);
iScroll=null;
}
if(s_sd==0){
var _7=0;
}else{
var _7=_5.scrollHeight-_5.clientHeight;
}
if(Math.abs(_5.scrollTop-_7)<60){
stickScroll=true;
}
}
function rsz(v){
var w=self.innerWidth;
if(isNaN(w)||w<=0){
w=document.body.clientWidth;
}
if(w>0){
eval(s_rz);
}else{
if(v<500){
window.setTimeout("rsz("+(v+1)+")",100);
}
}
}
function cb_checkform(){
if(f.pst.value==t3){
alert(t4);
f.pst.focus();
return false;
}
if(s_uo){
return true;
}
if(f.nme.value==t1){
alert(t2);
f.nme.focus();
return false;
}
if(f.eml){
if(f.eml.value!=""&&f.eml.value!=t5&&(f.eml.value.lastIndexOf(".")<=0&&f.eml.value.lastIndexOf("@")<=0)){
alert(t6);
f.eml.focus();
return false;
}
}
return true;
}
function frmfocus(x,y){
if(x.value==y){
x.value="";
}
}
function frmblur(x,y){
if(x.value==""){
x.value=y;
}
}
function pop(_e,w,h,s){
var nw=window.open("./?"+s_rq+"&sec="+_e,"cb"+s_id+_e.substring(0,3),"width="+w+", height="+h+", toolbar=no, scrollbars="+s+", status=no, resizable=yes");
try{
window.setTimeout(function(){
x=screen.width;
y=screen.height;
nw.moveTo((x/2)-(w/2)-100,(y/2)-(y/4));
nw.focus();
},10);
}
catch(e){
}
}
function aonliners(x){
if(x&&document.getElementById("onliners")){
document.getElementById("onliners").innerHTML=x+"&nbsp;"+((x==1)?t7:t8);
}
}
function crtn(e){
if(window.event){
k=window.event.keyCode;
}else{
if(e){
k=e.which;
}
}
if(k==13){
if(do_post()){
f.submit();
}
return false;
}else{
return true;
}
}
function p_open(){
if(f.nme.value==""||f.nme.value==t1){
f.nme.focus();
alert(t2);
}else{
pop("profile&n="+esc(f.nme.value)+"&k="+f.key.value,480,320,0);
}
}
var cexp=new Date((new Date()).getTime()+86400000*7).toGMTString();
var ptmp="";
var fdck=new Array();
var mylpt=0;
var mylpv="";
var fld=false;
function do_post(){
if(!cb_checkform()){
return false;
}
if(f.sub.disabled){
return false;
}
if(fld){
set_status(t25);
return false;
}
fl=fdck.length;
if(false&&s_fd&&fl>4){
dt1=dt2=dt3=timenow()-mylpt;
for(i=fl-1;i>=0;i--){
if(i>fl-4){
dt1+=fdck[i];
}
if(i>fl-9){
dt2+=fdck[i];
}
if(i>fl-19){
dt3+=fdck[i];
}
}
if(dt1<2*s_fd||(fl>9&&dt2<10*s_fd)||(fl>19&&dt3<25*s_fd)){
fld=true;
window.setTimeout("fld = false",10*1000);
set_status(t25);
return false;
}
}
if(tbl==null){
return true;
}
set_status(t23);
ptmp=f.pst.value;
f.pst.value="";
f.pst.focus();
if(!http("POST","index.php?"+s_rq+"&sec=submit","nme="+esc(f.nme.value)+"&eml="+((f.eml)?esc(f.eml.value):"")+"&key="+f.key.value+((f.ekey)?"&ekey="+f.ekey.value:"")+"&fkey="+((f.fkey)?f.fkey.value:"")+"&pic="+((f.pic)?esc(f.pic.value):"")+"&auth="+((f.auth)?esc(f.auth.value):"")+"&pst="+esc(ptmp)+"&captme="+((f.captme)?esc(f.captme.value):"")+"&capword="+((f.capword)?esc(f.capword.value):"")+"&caphash="+((f.caphash)?esc(f.caphash.value):"")+"&aj=x&lp="+lp,"post_proc",ptmp)){
f.pst.value=ptmp;
return true;
}
if(mylpt!=0){
fdck[fdck.length]=Math.max(0,timenow()-mylpt)*(ptmp.substring(0,10)==mylpv)?0.5:1;
if(fdck.length>50){
fdck.splice(0,20);
}
}
mylpv=ptmp.substring(0,10);
mylpt=timenow();
return false;
}
function esc(x){
if(!encodeURIComponent){
return function(s){
function eC(c){
function eIB(b){
return (eB(b,128));
}
function eB(b,_1a){
b+=_1a;
return ("%"+((b<16)?"0":"")+b.toString(16).toUpperCase());
}
function nB(c){
if(c<=127){
return (1);
}
if(c<=2047){
return (2);
}
return (3);
}
var nb=nB(c);
var so="";
for(var i=1;i<nb;i++){
so=eIB(c&63)+so;
c=c>>>6;
}
var a=new Array(0,192,224);
so=eB(c,a[nb-1])+so;
return (so);
}
var so="";
for(var i=0;i<s.length;i++){
var n=s.charCodeAt(i);
if(n<128){
var c=String.fromCharCode(n);
if("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.!~*'()".indexOf(c)!=-1){
so+=c;
}else{
so+=eC(n);
}
}else{
so+=eC(n);
}
}
return (so);
}(x);
}
return encodeURIComponent(x);
}
var rlk=false;
function timenow(){
ts=0;
if(td=getcookie("td")){
ts=td;
}
return parseInt((new Date()).getTime()/1000)-ts;
}
function do_refresh(){
if(tbl==null){
return true;
}
set_status(t9);
if(!rlk){
rlk=true;
window.setTimeout("rlk = false",10*1000);
ar_check(false);
}else{
window.setTimeout("set_status(t10)",500);
}
return false;
}
var wn=true;
function getlvl(){
if(s_uo){
return f.lvl.value;
}
return f.key.value.substring(f.key.value.length-1,f.key.value.length)*1;
}
function nme_warn(){
if(!wn&&f.nme.value!=""&&getlvl()<2){
wn=true;
alert(t11);
}
}
var tot=0;
function post_proc(x,p){
var _26=false;
dat=x.split("\n");
hdr=dat[0].split("\t");
set_status("");
if((hdr[0]||!x)&&(f.pst.value==t3||f.pst.value=="")){
f.pst.value=p;
_26=true;
}else{
tot++;
}
f.pst.focus();
if(hdr[3]){
f.key.value=hdr[3];
}
if(s_ap&&tot==1&&document.cookie==""){
alert(t13);
}
aj_proc(x,true);
if(_26){
set_status(t12+" "+hdr[0]+" "+xhrerr);
}
}
var lp=0,op=0,ard=59,mylp=0;
function aj_proc(x,s,_29){
if(arloop){
ar_reset();
}
if(!x){
if(!s){
set_status((xhrerr)?xhrerr:t10);
}
return false;
}
dat=x.split("\n");
hdr=dat[0].split("\t");
for(var i=dat.length-1;i>0;i--){
t=dat[i].split("\t");
if(t[0]>lp){
lp=t[0];
}
add_post(t);
}
if(hdr[1]){
aonliners(hdr[1]);
}
if(hdr[4]*1>0){
ard=hdr[4]*1;
}else{
ard*=1.6;
}
ard=Math.min(120,Math.max(ard,5));
upd_tms(hdr[2]);
if(hdr[5]){
mylp=hdr[5];
}
if(dat.length-1>0){
if(s_sn){
playsnd();
}
delban();
titleflash();
}else{
if(!s){
set_status((xhrerr)?xhrerr:t10);
}
}
}
var art=null;
var artc=null;
var art_long=null;
var arloop=false;
var in_ar_long=false;
var ar_long=false;
function ar_reset(){
var _2b=parseInt(getcookie(clidC));
if(clid<=_2b-2&&!isNaN(_2b)&&foc==0){
return;
}
if(!gotconn&&ar_long&&!in_ar_long&&art_long===null){
art_long=window.setTimeout("ar_check_long(true, true);",5000+Math.round(Math.random()*4000));
}
if(gotconn||in_ar_long){
ard=120;
}
if(!arloop||ard==0){
return;
}
if((s_on||!ar_long)&&art===null){
art=window.setTimeout("ar_check(true, true)",ard*1000);
}
}
function ar_check(s,_2d){
var s=s||false;
if(art!==null){
window.clearTimeout(art);
}
art=null;
if(!http("GET","./?"+s_rq+"&sec=ar&p="+lp+"&c="+timenow()+"&ard="+ard+"&clid="+clid,null,"aj_proc",s,_2d)){
var i=new Image();
i.src="archeck_o.php?"+s_rq+"&rnd="+Math.random();
ar_poll();
}
return true;
}
var ar_long_tStart=0;
function ar_check_long(s,_30){
if(art_long){
window.clearTimeout(art_long);
art_long=null;
}
var s=s||false;
ar_long_tStart=(new Date()).getTime();
if(in_ar_long){
return false;
}
if(!http("GET","../sub2?id="+s_id+"_"+s_tid+"&ev="+lp,null,"ar_proc",s,true)){
in_ar_long=false;
ar_reset();
}
in_ar_long=true;
return true;
}
function ar_proc(x,s,_33){
in_ar_long=false;
if(arloop){
ar_reset();
}
if(!x&&xhrerr){
var _34=(new Date()).getTime()-ar_long_tStart;
if(_34<10){
ar_long=false;
window.setTimeout(function(){
ar_long=true;
},30-_34);
}
}else{
var s=x||"";
var _35=[];
var ss=s.split("\n"),t;
for(var i=0;i<ss.length;i++){
if(ss[i].substring(0,1)=="<"){
if(ss[i].substring(0,5)=="<del="){
var del=ss[i].substring(5);
proc_rpc_del(del);
}
}else{
t=ss[i].split("\t");
if(t.length>1){
if(t[0]>0){
lp=t[0]*1;
}
add_post(t);
_35[_35.length]=t[0]*1;
}
}
}
for(var i=0;i<_35.length;i++){
if(!cbm.document.getElementById(_35[i])||cbm.document.getElementById(_35[i])["_deleted"]){
continue;
}
upd_tms();
delban();
if(s_sn){
playsnd();
}
titleflash();
}
}
}
function ar_poll(){
if(artc){
window.clearTimeout(artc);
}
var lpc=getcookie("a"+s_id);
if(lpc>lp){
cbm.document.location="index.php?"+s_rq+"&sec=main";
return true;
}
artc=window.setTimeout("ar_poll()",1000);
}
function getcookie(x){
var dc=document.cookie;
var i=dc.indexOf(x+"=",0);
if(i>-1){
var n=dc.indexOf(";",i);
n=(n==-1)?dc.length:n;
return dc.substring(i+x.length+1,n);
}
return null;
}
var xhrerr="";
function http(m,u,d,f,c,_44){
var r=null;
var t=0,p=0,q=0;
var f=f;
var c=c;
var _44=_44||false;
xhrerr="";
if(window.XMLHttpRequest){
r=new XMLHttpRequest();
}else{
if(window.ActiveXObject){
try{
r=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
r=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(e){
}
}
}
}
if(!r){
return false;
}
r.onreadystatechange=function(){
if(r.readyState==4){
window.clearTimeout(w);
if(r.status==200){
t=r.responseText;
q=t.substring(0,1);
p=t.substring(1);
if(q!="1"&&q!="0"){
xhrerr=t14+"L-chksum";
p="";
}else{
if(q=="0"){
xhrerr=p;
p="";
}
}
}else{
if(r.status==0){
xhrerr=t14+"L-network";
}else{
xhrerr=t14+"H-"+r.status;
}
p="";
}
eval(f+"(p, c)");
}
};
this.hfail=function(){
r.onreadystatechange=function(){
};
r.abort();
xhrerr=t14+"L-timeout";
eval(f+"('', c)");
};
if(!_44){
var w=window.setTimeout(this.hfail,20000);
}
r.open(m,u,true);
if(!_44){
r.setRequestHeader("Connection","close");
}
r.setRequestHeader("Accept","*/*");
if(d){
r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
r.send(d);
return true;
}
function set_status(s){
var p=new Array();
p[0]=0;
p[1]=0;
p[2]="";
p[3]="";
p[4]=0;
p[5]="";
p[6]=s;
add_post(p);
}
var op;
function add_post(t){
if(!t[6]){
return false;
}
if(t[0]>0&&cbm.document.getElementById(t[0])){
return true;
}
if("1"==getcookie("pms_"+s_id+"_"+t[3])&&t[8]&32){
return true;
}
var cnt=tbl.rows.length;
var cn=0;
var fs=false,ls=false;
var box=cbm.document.body;
var _52=box.scrollHeight;
if(cnt>0){
if(tbl.rows[0].id==0){
tbl.deleteRow(0);
cnt--;
}
if(cnt>1&&tbl.rows[cnt-1].id==0){
tbl.deleteRow(cnt-1);
cnt--;
}
if(cnt>1&&tbl.rows[1].id==0){
tbl.deleteRow(1);
cnt--;
}
if(cnt>1&&tbl.rows[cnt-2].id==0){
tbl.deleteRow(cnt-2);
cnt--;
}
}
if(cnt>0){
if(((cnt==1&&!s_sd)||cnt>1)&&tbl.rows[0].id==-1){
fs=true;
}
if(((cnt==1&&s_sd)||cnt>1)&&tbl.rows[cnt-1].id==-1){
ls=true;
}
var lc=tbl.rows[cnt-1].cells[0];
var fc=tbl.rows[0].cells[0];
var lm=(cnt-(ls?1:0)-(fs?1:0)>0)?tbl.rows[cnt-1-(ls?1:0)].cells[0]:null;
var fm=(cnt-(ls?1:0)-(fs?1:0)>0)?tbl.rows[fs?1:0].cells[0]:null;
if(!s_sd){
y=tbl.insertRow(fs?1:0);
cnt++;
if(cnt-(ls?1:0)-(fs?1:0)>s_mp&&t[0]!=0&&t[0]!=-1){
if(ls){
lc.className=(lc.className=="stxt")?"stxt2":"stxt";
}
tbl.deleteRow(cnt-1-(ls?1:0));
cnt--;
}
var nc=(fm!=null)?((fm.className=="stxt")?"2":""):"2";
op=tbl.rows[cnt-1-(ls?1:0)].id;
}else{
y=tbl.insertRow(cnt-(ls?1:0));
cnt++;
if(cnt-(ls?1:0)-(fs?1:0)>s_mp&&t[0]!=0&&t[0]!=-1){
if(fs){
fc.className=(fc.className=="stxt")?"stxt2":"stxt";
}
tbl.deleteRow(0+(fs?1:0));
cnt--;
}
var nc=(lm!=null)?((lm.className=="stxt")?"2":""):"2";
op=tbl.rows[fs?1:0].id;
}
}else{
y=tbl.insertRow(0);
var nc="2";
}
y.id=(t[8]&32)?0:t[0];
z=y.insertCell(-1);
if(t[8]&32){
z.onclick=function(e){
popout(t[3]);
set_status("");
};
z.style.cursor="pointer";
}
z.className="stxt"+nc+((t[8]&32)?" oobpm":"");
x="";
if(t[0]==0||t[0]==-1){
x+="<div align=\"center\">"+t[6]+"</div>";
}else{
s=t[5].substring(t[5].length-4);
if(s_av&&t[7]){
x+="<img src=\"http://"+t[7]+"\" class=\"pic\">";
}else{
if(s_av&&(s==".gif"||s==".jpg"||s==".png")){
x+="<img src=\""+t[5]+"\" class=\"pic\">";
t[5]="";
}
}
if(s_dt>1){
x+="<div class=\"dtxt"+nc+"\" id=\"t"+t[1]+"\" "+((s_rt)?"dir=\"ltr\"":"")+">"+t[2]+"</div>";
}
if(t[8]&32){
x+="<div class=\"dtxt"+nc+"\">("+t15+")</div>";
}
if(s_al==0){
if(t[5]){
x+="<a href=\""+t[5]+"\" target=\"_blank\">";
}
}else{
if(t[5]){
x+="<a href=\""+t[5]+"\" target=\"_blank\"><img src=\"extlink.gif\" width=\"9\" height=\"9\" border=\"0\" title=\""+t[5]+"\" style=\"vertical-align:middle; margin-right: 2px;\"></a>";
}
}
x+="<b";
if(s_dt==1){
x+=" title=\""+t[2]+"\"";
}
var ncl="nme ";
switch(t[4]){
case "1":
ncl+="pn_std";
break;
case "2":
ncl+="pn_reg";
break;
case "3":
ncl+="pn_mod";
break;
case "4":
ncl+="pn_adm";
break;
}
x+=" class=\""+ncl+"\"";
if(s_rt){
x+=" dir=\"ltr\"";
}
x+=">";
x+=t[3];
x+="</b>";
if(s_al==0){
if(t[5]){
x+="</a>";
}
}
x+=": "+t[6];
}
z.innerHTML=x;
if(stickScroll){
autoScroll();
}else{
if(s_sd==0){
box.scrollTop+=box.scrollHeight-_52;
}
}
if(cbm.document.getElementById("addiv")){
xy=cbm.document;
ads=xy.createElement("script");
ads.type="text/javascript";
xx=xy.getElementById("addiv");
ads.src=xx.innerHTML;
xx.innerHTML="";
xx.style.display="";
xy.getElementsByTagName("head")[0].appendChild(ads);
}
if(cbm.document.getElementById("jsdiv")){
var xy=cbm.document;
var xx=xy.getElementById("jsdiv");
var cde=xx.innerHTML;
cde=cde.replace(/&amp;/g,"&");
eval(cde);
xx.parentNode.removeChild(xx);
xx=null;
}
}
var updTmsInt=null;
function upd_tms(c){
if(s_dt!=3){
return true;
}
if(!c){
c=timenow();
}
tarr=t16;
a=cbm.document.getElementsByTagName("div");
ar=new Array(2592000,604800,86400,3600,60,1);
for(i=0;i<a.length;i++){
if(a[i].id.substring(0,1)=="t"){
d=c-a[i].id.substring(1);
if(d<0){
continue;
}
for(j=0;j<6;j++){
e=0;
if(d/ar[j]>1){
d=d/ar[j];
e=10-j*2;
break;
}
}
if(!a[i].title){
a[i].title=a[i].innerHTML;
}
d=Math.round(d);
a[i].innerHTML=(t24.replace("%d",d)).replace("%s",tarr[(d==1)?e:e+1]);
}
}
if(updTmsInt===null){
updTmsInt=window.setInterval(upd_tms,10*1000);
}
}
var lnkd=new Array();
function delban(){
var lvl=getlvl();
if(lvl>2){
mod=true;
}else{
mod=false;
}
cn=tbl.rows.length;
for(var i=0;i<cn;i++){
a=tbl.rows[i];
if(a.id<1){
continue;
}
b=a.cells[0];
if(lnkd[a.id]){
lnkd[a.id]=false;
b.innerHTML=b.innerHTML.replace(/(div>|pic\">|^)<span><a.*?del.*?a>&nbsp;<\/span></i,"$1<");
}
if((mod||(s_ld&&a.id==mylp&&mylp==lp&&lvl>1))){
if(!lnkd[a.id]){
lnkd[a.id]=true;
b.innerHTML=b.innerHTML.replace(/(div>|pic\">|^)<(a|b)/i,"$1<span><a href=\"JavaScript:parent['cboxform"+s_no+"'].del("+a.id+")\" title=\""+t17+"\">[&times;]</a>&nbsp;"+((mod)?"<a href=\"JavaScript:parent['cboxform"+s_no+"'].ban("+a.id+")\" title=\""+t18+"\" onMouseOver=\"JavaScript:parent['cboxform"+s_no+"'].getip("+a.id+", this)\">[o]</a>&nbsp;":"")+"</span><$2");
}
}
}
if(s_al!=0&&document.getElementsByTagName){
var _60=cbm.document.getElementsByTagName("b");
for(var i=0;i<_60.length;i++){
if(_60[i].className.indexOf("nme")==-1){
continue;
}
_60[i].onmousedown=function(e){
if(!e){
var e=cbm.event;
}
e.cancelBubble=true;
e.returnValue=false;
if(e.stopPropagation){
e.stopPropagation();
}
if(e.preventDefault){
e.preventDefault();
}
return false;
};
_60[i].onclick=function(e){
if(!e){
var e=cbm.event;
}
if(e.shiftKey&&s_pm>0){
popout(this.innerHTML);
}else{
quote_text("@"+this.innerHTML,"","","");
}
};
_60[i].style.cursor="pointer";
}
}
}
function quote_text(ins,_64,_65,_66){
var f=document.forms.cbox.pst;
f.focus();
var end,_69,_6a;
end=_69=0;
_6a="";
if(document.selection){
var sel=document.selection.createRange();
var c="\x01";
if(sel.text!=null){
sel.text=c;
}
end=_69=f.value.indexOf(c);
if(end==-1){
end=_69=f.value.length;
}
sel.moveStart("character",-1);
sel.text="";
}else{
if(f.selectionStart!="null"){
_69=f.selectionStart;
end=f.selectionEnd;
}
}
_6a=f.value.substring(_69,end);
if(ins!=""){
_6a="";
}
var _6d=(f.value.charAt(end)==" ")?true:false;
var _6e=((_69==0||f.value.charAt(_69-1)==" ")?"":" ");
var _6f=(_69==0)?_64:"";
var _70=((_6d)?"":" ");
f.value=f.value.substring(0,_69)+_6e+_65+ins+_6a+_6f+_66+_70+f.value.substring(end);
var _71=_69+_6e.length+_65.length+ins.length+_6a.length+_6f.length;
if(_66==""){
_71+=1;
}
if(_6a!=""&&_66!=""){
_71+=_66.length+_70.length+1;
}
if(document.selection){
sel.moveEnd("character",-f.value.length);
sel.moveEnd("character",_71);
sel.moveStart("character",_71);
sel.select();
}else{
if(f.selectionStart!="null"){
f.selectionStart=_71;
f.selectionEnd=_71;
}
}
}
function do_getlvlhint(){
http("GET","./?"+s_rq+"&sec=getlvl&n="+esc(f.nme.value)+"&k="+f.key.value,null,"getlvlhint_proc");
}
function getlvlhint_proc(x){
if(!x){
return false;
}
f.lvl.value=x;
delban();
}
function del(i){
if(confirm(t19)){
if(!http("GET","./?"+s_rq+"&sec=delban&n="+esc(f.nme.value)+"&k="+f.key.value+"&del="+i,null,"del_proc")){
alert(t20);
}
}
}
function ban(i){
var t=prompt(t21,"7 days");
if(t!=null){
if(!http("GET","./?"+s_rq+"&sec=delban&n="+esc(f.nme.value)+"&k="+f.key.value+"&ban="+i+"&dur="+esc(t),null,"ban_proc")){
alert(t20);
}
}
}
var gips=new Array();
function getip(i,k){
if(!gips[i]){
http("GET","./?"+s_rq+"&sec=getip&n="+esc(f.nme.value)+"&k="+f.key.value+"&i="+i+"&r="+((new Date()).getTime()),null,"getip_proc",k);
gips[i]=true;
}
}
function getip_proc(x,i){
if(!x){
return false;
}
if(i){
i.title=t18+" (IP: "+x+")";
}
}
function del_proc(x){
if(xhrerr){
set_status(xhrerr);
}
if(!x){
return false;
}
for(var i=0;i<tbl.rows.length;i++){
if(tbl.rows[i].id==x*1){
tbl.rows[i].cells[0].innerHTML="<div align=\"center\"><i>"+t22+"</i></div>";
}
tbl.rows[i]["_deleted"]=true;
}
}
function ban_proc(x){
if(xhrerr){
set_status(xhrerr);
}
if(!x){
return false;
}
x=x.split("\t");
alert(x[1]);
}
function selchk(e){
if(!e){
var e=window.event;
}
var f=e.srcElement.tagName.toLowerCase();
if(f!="textarea"&&f!="input"){
return false;
}else{
return true;
}
}
var sn_vol=(s_sn!=0)?100:0;
var xst="sndvol";
function sndready(){
var dc=document.cookie+";";
var xof=0;
if((xof=dc.indexOf(xst+"=",0))!=-1){
sn_vol=1*dc.substring(xof+xst.length+1,dc.indexOf(";",xof+xst.length+1));
}
togglesnd(true);
}
function playsnd(){
if(sn_vol==0){
return;
}
try{
window.document.relay.doDing();
}
catch(e){
}
}
function togglesnd(_81){
var _81=_81||false;
var t=document.getElementById("sndctrl");
var v=0;
if(!_81){
switch(sn_vol){
case 0:
sn_vol=100;
break;
case 20:
sn_vol=0;
break;
default:
sn_vol=20;
break;
}
}
switch(sn_vol){
case 20:
v=16;
break;
case 100:
v=32;
break;
}
t.style.left=-1*v+"px";
window.document.relay.setVol(sn_vol);
if(_81){
return;
}
window.document.relay.doDing();
var _84=new Date();
_84.setTime(_84.getTime()+(30*24*3600*1000));
document.cookie=xst+"="+sn_vol+"; expires="+_84.toGMTString()+"; path=/";
}
var ar_on;
function togglear(_85){
var _85=_85||false;
var t=document.getElementById("arctrl");
var v=0;
if(!_85){
switch(ar_on){
case false:
ar_on=true;
break;
default:
ar_on=false;
break;
}
}
switch(ar_on){
case false:
v=16;
break;
}
t.style.display="";
t.style.left=-1*v+"px";
if(ar_on){
if(!relayestsent){
tryrelay();
}else{
flare_mkcon();
}
if(!_85){
set_status("Streaming conversation...");
}
}else{
endrelay();
if(!_85){
set_status("Stream paused.");
}
}
if(_85){
var rfb=document.getElementById("rf");
rfb.style.display="none";
}
if(_85){
return;
}
}
var rfb;
var gotconn=false;
var relayid="";
var relayhash="";
var relayestsent=false;
var relaytries=0;
var fltmr=null;
function doleave(){
ar_on=false;
endrelay();
rfb.innerHTML="join";
rfb.onclick=dojoin;
return false;
}
function dojoin(){
rfb.innerHTML="";
if(!relayestsent){
tryrelay();
}else{
flare_mkcon();
}
set_status("You have joined this chat.");
return false;
}
function fl_ready(){
ar_on=(s_ar!=0)?true:false;
if(ar_on){
tryrelay();
}else{
if(joinexp){
togglear(true);
}
}
if(s_sn){
sndready();
}
}
function tryrelay(){
if(gotconn){
return;
}
relaytries++;
fltmr=window.setTimeout("flare_failed()",10000);
try{
window.document.relay.doConn();
}
catch(e){
}
}
function endrelay(){
try{
window.document.relay.endConn();
}
catch(e){
}
}
function flare_mkcon(){
var a=new Image();
if(s_pm==0){
a.src="relayest.php?"+s_rq+"&cid="+relayid+"&chash="+relayhash+"&t="+((new Date()).getTime());
}else{
a.src="index.php?"+s_rq+"&sec=relaycomplete&cid="+relayid+"&chash="+relayhash+"&n="+esc(f.nme.value)+"&k="+f.key.value+"&t="+((new Date()).getTime());
}
relayestsent=true;
}
function flare_failed(){
if(fltmr!=null){
window.clearTimeout(fltmr);
}
fltmr=null;
gotconn=false;
relayid=0;
relayhash=0;
relayestsent=false;
if(ar_on){
if(relaytries<2){
fltmr=window.setTimeout("tryrelay()",5000+(Math.random()*10000));
}else{
if(art==null){
arloop=true;
ard=5;
ar_reset();
}
fltmr=window.setTimeout("tryrelay()",2*60000);
}
}
}
var wdTmr=null;
var debug_wdtimer="off";
function startFlWd(){
wdTmr=window.setTimeout(function(){
window.document.relay.endConn();
flare_failed();
debug_wdtimer="fired";
},3*60*1000);
debug_wdtimer="armed";
}
function fl_gotconn(){
}
function fl_pclosed(){
flare_failed();
}
function proc_rpc_del(_8a){
var _8b=_8a.split(","),del,_8d,_8e,_8f;
for(var i=0;i<_8b.length;i++){
if(_8b[i].indexOf("_")<0){
del=parseInt(_8b[i]);
if(!isNaN(del)){
del_proc(del);
}
}else{
_8d=_8b[i].split("_");
_8e=parseInt(_8d[0]);
_8f=parseInt(_8d[1]);
if(!isNaN(_8e)&&!isNaN(_8f)){
for(var j=_8e;j<=_8f;j++){
del_proc(j);
}
}
}
}
}
function fl_gotmsg(msg){
if(wdTmr){
window.clearTimeout(wdTmr);
wdTmr=null;
}
startFlWd();
if(msg.substring(0,1)=="<"){
if(msg.substring(0,4)=="<id="){
relayid=parseInt(msg.substring(4));
}
if(msg.substring(0,6)=="<hash="){
relayhash=parseInt(msg.substring(6,25));
}
if(relayid&&relayhash&&!relayestsent){
flare_mkcon();
}
if(msg.substring(0,6)=="<pool="){
pool=msg.substring(6);
window.clearTimeout(fltmr);
gotconn=true;
relaytries=0;
}
if(msg.substring(0,5)=="<del="){
var _93=msg.substring(5);
proc_rpc_del(_93);
}
if(msg.substring(0,11)=="<updusrcnt="){
var _94=msg.substring(11);
aonliners(_94);
}
}else{
if(msg){
t=msg.split("\t");
if(t[0]>0){
lp=t[0];
}
add_post(t);
upd_tms();
delban();
if(s_sn){
playsnd();
}
titleflash();
}
}
}
var titleT=null;
function titleflash(){
if(s_pp==0){
return;
}
if(foc!=0){
return;
}
var _95="New message! "+stitle;
var on=false;
var cnt=0;
parent.document.title=_95;
if(titleT){
window.clearInterval(titleT);
}
titleT=window.setInterval(function(){
parent.document.title=(on&&foc==0)?_95:stitle;
on=(on)?false:true;
if(cnt++>13||foc!=0){
window.clearInterval(titleT);
}
},2000);
}
function popout(nme){
var _99=nme?true:false;
var _9a=(_99)?(nme+""):"Cbox";
var _9b=_99?"&amp;pnme="+esc(nme)+"&amp;n="+esc(f.nme.value)+"&amp;k="+f.key.value:"";
var _9c=window.open("about:blank",_9a,"width=260,height=480,toolbar=no,scrollbars=no,status=no,resizable=yes");
_9c.document.open();
var cbd=_9c.document;
try{
cbd.title="Cbox";
x=screen.width;
y=screen.height;
_9c.moveTo(Math.max((x/2)-300+((s_pp)?30:0),0),Math.max((y/3)-190+((s_pp)?20:0)));
}
catch(e){
}
cbd.write("<html><head><title>"+_9a+"</title></head><frameset rows=\"*,"+s_fh+"\" frameborder=\"0\" framespacing=\"0\">");
cbd.write("<frame marginwidth=\"2\" marginheight=\"2\" src=\"index.php?"+s_rq+"&amp;sec="+((_99)?"privmsg":"main")+_9b+"\" noresize=\"true\" scrolling=\"auto\" name=\"cboxmain\" style=\"border:0px solid;\"/>");
cbd.write("<frame marginwidth=\"2\" marginheight=\"2\" src=\"index.php?"+s_rq+"&amp;sec=form&amp;pop=1\" noresize=\"true\" scrolling=\"no\" name=\"cboxform\" style=\"border:0px solid;\"/></frameset>");
cbd.write("<noframes>Cbox needs frames!</noframes></html>");
cbd.close();
if(_99){
if(_9c.cboxform.document){
_9c.cboxform.document.write("");
}
if(getcookie("pms_"+s_id+"_"+nme)!="1"){
document.cookie="pms_"+s_id+"_"+nme+"=1; expires=; path=/";
}
_9c.onunload=function(){
document.cookie="pms_"+s_id+"_"+nme+"=; expires=; path=/";
};
}
if(!_99){
cbm.document.write("");
document.write("");
_9c.onunload=function(){
cbm.location.replace("index.php?"+s_rq+"&sec=main");
location.replace("index.php?"+s_rq+"&sec=form");
};
}
}
var js_ok=js_ver;

