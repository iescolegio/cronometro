(function($){$.fn.countDown=function(options){config={};$.extend(config,options);diffSecs=this.setCountDown(config);before=new Date();$.data($(this)[0],'before',before);$.data($(this)[0],'status','play');style=config.style;$.data($(this)[0],'style',config.style);if(config.launchtarget){$.data($(this)[0],'launchtarget',config.launchtarget)}if(config.onComplete){$.data($(this)[0],'callback',config.onComplete)}if(config.hangtime){$.data($(this)[0],'hangtime',config.hangtime)}if(config.omitWeeks){$.data($(this)[0],'omitWeeks',config.omitWeeks)}$('#'+$(this).attr('id')+' .'+style+'-digit').html('<div class="top"></div><div class="bottom"></div>');$(this).doCountDown($(this).attr('id'),diffSecs,500);return this};$.fn.stopCountDown=function(){$.data(this[0],'status','stop')};$.fn.startCountDown=function(){$.data(this[0],'status','play');this.doCountDown($(this).attr('id'),$.data(this[0],'diffSecs'),500)};$.fn.setCountDown=function(options){var targetTime=new Date();if(options.targetDate){targetTime=new Date(options.targetDate.month+'/'+options.targetDate.day+'/'+options.targetDate.year+' '+options.targetDate.hour+':'+options.targetDate.min+':'+options.targetDate.sec+(options.targetDate.utc?' UTC':''))}else if(options.targetOffset){targetTime.setFullYear(options.targetOffset.year+targetTime.getFullYear());targetTime.setMonth(options.targetOffset.month+targetTime.getMonth());targetTime.setDate(options.targetOffset.day+targetTime.getDate());targetTime.setHours(options.targetOffset.hour+targetTime.getHours());targetTime.setMinutes(options.targetOffset.min+targetTime.getMinutes());targetTime.setSeconds(options.targetOffset.sec+targetTime.getSeconds())}var nowTime=new Date(options.targetDate.localtime);diffSecs=Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);$.data(this[0],'diffSecs',diffSecs);return diffSecs};$.fn.doCountDown=function(id,diffSecs,duration){$this=$('#'+id);if(diffSecs<=0){if($.data($this[0],'launchtarget')!='countup'){diffSecs=0;$.data($this[0],'status','stop')}}secs=Math.abs(diffSecs%60);mins=Math.floor(Math.abs(diffSecs/60)%60);hours=Math.floor(Math.abs(diffSecs/60/60)%24);if($.data($this[0],'omitWeeks')==true){days=Math.floor(Math.abs(diffSecs/60/60/24));weeks=Math.floor(Math.abs(diffSecs/60/60/24/7))}else{days=Math.floor(Math.abs(diffSecs/60/60/24)%7);weeks=Math.floor(Math.abs(diffSecs/60/60/24/7))}style=$.data($this[0],'style');$this.dashChangeTo(id,style+'-seconds_dash',secs,duration?duration:500);$this.dashChangeTo(id,style+'-minutes_dash',mins,duration?duration:1000);$this.dashChangeTo(id,style+'-hours_dash',hours,duration?duration:1000);$this.dashChangeTo(id,style+'-days_dash',days,duration?duration:1000);$this.dashChangeTo(id,style+'-days_trip_dash',days,duration?duration:1000);$this.dashChangeTo(id,style+'-weeks_dash',weeks,duration?duration:1000);$this.dashChangeTo(id,style+'-weeks_trip_dash',weeks,duration?duration:1000);$.data($this[0],'diffSecs',diffSecs);if(diffSecs>0||$.data($this[0],'launchtarget')=='countup'){if($.data($this[0],'status')=='play'){var delta=0;delay=1000;now=new Date();before=$.data($this[0],'before');elapsedTime=(now.getTime()-before.getTime());if(elapsedTime>=delay+1000){delta+=Math.floor(1*(elapsedTime/delay))}else{delta=1}before=new Date();$.data($this[0],'before',before);e=$this;t=setTimeout(function(){e.doCountDown(id,diffSecs-delta)},1000)}}else if($.data($this[0],'callback')){if($.data($this[0],'hangtime')){}$.data($this[0],'callback')()}};$.fn.dashChangeTo=function(id,dash,n,duration){$this=$('#'+id);style=$.data($this[0],'style');for(var i=($this.find('.'+dash+' .'+style+'-digit').length-1);i>=0;i--){var d=n%10;n=(n-d)/10;$this.digitChangeTo('#'+$this.attr('id')+' .'+dash+' .'+style+'-digit:eq('+i+')',d,duration)}};$.fn.digitChangeTo=function(digit,n,duration){if(!duration){duration=500}if($(digit+' div.top').html()!=n+''){$(digit+' div.top').css({'display':'none'});$(digit+' div.top').html((n?n:'0')).stop(true,true).slideDown(duration);$(digit+' div.bottom').stop(true,true).animate({'height':''},duration,function(){$(digit+' div.bottom').html($(digit+' div.top').html());$(digit+' div.bottom').css({'display':'block','height':''});$(digit+' div.top').hide().slideUp(10)})}}})(jQuery);