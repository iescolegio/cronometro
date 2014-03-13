$(document).ready(function() {    
    //********************  topnav ******************************    	
    $("ul#toplogo li#logo").hover(function() { //Hover over event on list item
	    $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/logoIG_over.jpg) no-repeat'});
	    $(this).find("ul").show(); //Show the subnav
    } , function() { //on hover out...
	    $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/logoIG.jpg) no-repeat'});
	    $(this).find("ul").hide(); //Hide the subnav
    });	    
    if($("div#fixitem").attr("title")!="empresa")
    {
        $("ul#topnav li#empresa").hover(function() { //Hover over event on list item
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/empresa_over.es-ES.png) no-repeat'});
	        $(this).find("ul").show(); //Show the subnav
        } , function() { //on hover out...
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/empresa.es-ES.png) no-repeat'});
	        $(this).find("ul").hide(); //Hide the subnav
        });
    }
    else
    {
        $("ul#topnav li#empresa").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/empresa_over.es-ES.png) no-repeat'});
        $("ul#topnav li#empresa").find("ul").show(); //show the subnav
    }    
    if($("div#fixitem").attr("title")!="soluciones")
    {                   
        $("ul#topnav li#soluciones").hover(function() { //Hover over event on list item
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/soluciones_over.es-ES.png) no-repeat'});
	        $(this).find("ul").show(); //Show the subnav
        } , function() { //on hover out...
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/soluciones.es-ES.png) no-repeat'});
	        $(this).find("ul").hide(); //Hide the subnav
        });
    }
    else
    {
        $("ul#topnav li#soluciones").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/soluciones_over.es-ES.png) no-repeat'});
        $("ul#topnav li#soluciones").find("ul").show(); //show the subnav    
            
        //********************  subnav soluciones ******************************        
        if($("div#fixitemsub").attr("title")!="voiceoverip")
        {
            $("ul#topnav li#soluciones ul#subnav_soluciones li#voiceoverip").hover(function() { //Hover over event on list item
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/voiceoverip_over.png) no-repeat'});
	        } , function() { //on hover out...
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu/voiceoverip.png) no-repeat'});
	        });
	    }
	    else
	    {	        
	        $("ul#topnav li#soluciones ul#subnav_soluciones li#voiceoverip").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/voiceoverip_over.png) no-repeat'});
	    }    	
    	if($("div#fixitemsub").attr("title")!="virtualization")
        {
            $("ul#topnav li#soluciones ul#subnav_soluciones li#virtualization").hover(function() { //Hover over event on list item
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/virtualization_over.png) no-repeat'});
	        } , function() { //on hover out...
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu/virtualization.png) no-repeat'});
	        });
	    }
	    else
	    {	        
	        $("ul#topnav li#soluciones ul#subnav_soluciones li#virtualization").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/virtualization_over.png) no-repeat'});
	    }    	
    	if($("div#fixitemsub").attr("title")!="diagnostico")
        {
            $("ul#topnav li#soluciones ul#subnav_soluciones li#diagnostico").hover(function() { //Hover over event on list item
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/diagnostico_over.es-ES.png) no-repeat'});
	        } , function() { //on hover out...
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu/diagnostico.es-ES.png) no-repeat'});
	        });
	    }
	    else
	    {	        
	        $("ul#topnav li#soluciones ul#subnav_soluciones li#diagnostico").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/diagnostico_over.es-ES.png) no-repeat'});
	    }    	
    	if($("div#fixitemsub").attr("title")!="proassist")
        {
            $("ul#topnav li#soluciones ul#subnav_soluciones li#proassist").hover(function() { //Hover over event on list item
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/proassist_over.png) no-repeat'});
	        } , function() { //on hover out...
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu/proassist.png) no-repeat'});
	        });
	    }
	    else
	    {	        
	        $("ul#topnav li#soluciones ul#subnav_soluciones li#proassist").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/proassist_over.png) no-repeat'});
	    }    	
    	if($("div#fixitemsub").attr("title")!="securitynetworks")
        {
            $("ul#topnav li#soluciones ul#subnav_soluciones li#securitynetworks").hover(function() { //Hover over event on list item
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/securitynetworks_over.png) no-repeat'});
	        } , function() { //on hover out...
	            $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu/securitynetworks.png) no-repeat'});
	        });
	    }
	    else
	    {	        
	        $("ul#topnav li#soluciones ul#subnav_soluciones li#securitynetworks").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/submenu_over/securitynetworks_over.png) no-repeat'});
	    }
    }    
    if($("div#fixitem").attr("title")!="partners")
    {
        $("ul#topnav li#partners").hover(function() { //Hover over event on list item
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/partners_over.png) no-repeat'});
	        $(this).find("ul").show(); //Show the subnav
        } , function() { //on hover out...
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/partners.png) no-repeat'});
	        $(this).find("ul").hide(); //Hide the subnav
        });
    }
    else
    {
        $("ul#topnav li#partners").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/partners_over.png) no-repeat'});
        $("ul#topnav li#partners").find("ul").show(); //show the subnav
    }    
    if($("div#fixitem").attr("title")!="blog")
    {
        $("ul#topnav li#blog").hover(function() { //Hover over event on list item
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/blog_over.png) no-repeat'});
	        $(this).find("ul").show(); //Show the subnav
        } , function() { //on hover out...
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/blog.png) no-repeat'});
	        $(this).find("ul").hide(); //Hide the subnav
        });
    }
    else
    {
        $("ul#topnav li#blog").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/blog_over.png) no-repeat'});
        $("ul#topnav li#blog").find("ul").show(); //show the subnav
    }    
    if($("div#fixitem").attr("title")!="contacta")
    {
        $("ul#topnav li#contacta").hover(function() { //Hover over event on list item
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/contacta_over.es-ES.png) no-repeat'});
	        $(this).find("ul").show(); //Show the subnav
        } , function() { //on hover out...
	        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/contacta.es-ES.png) no-repeat'});
	        $(this).find("ul").hide(); //Hide the subnav
        });
    }
    else
    {
        $("ul#topnav li#contacta").css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/contacta_over.es-ES.png) no-repeat'});
        $("ul#topnav li#contacta").find("ul").show(); //show the subnav
    }
    
    /****  EXTRANET  ****/
    $("div#extranet div#headerextranet").hover(function() { //Hover over event on div item
        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/extranet_over.es-ES.png) no-repeat;'});
        $(this).find("div#bodyextranet").show();
        $(this).find("div#footerextranet").show();
    } , function() { //on hover out...
        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/extranet.es-ES.png) no-repeat;'});
        $(this).find("div#bodyextranet").hide();
        $(this).find("div#footerextranet").hide();
    });
    
    /****  SERVICIOS INGENS  ****/
    $("div#extranet div#headerserviciosingens").hover(function() { //Hover over event on div item
        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu_over/serviciosingens_over.es-ES.png) no-repeat;'});
        $(this).find("div#bodyserviciosingens").show();
        $(this).find("div#footerserviciosingens").show();
    } , function() { //on hover out...
        $(this).css({ 'background' : 'url(http://www.ingens-networks.com/images/mainmenu/menu/serviciosingens.es-ES.png) no-repeat;'});
        $(this).find("div#bodyserviciosingens").hide();
        $(this).find("div#footerserviciosingens").hide();
    });
    
    /*** PRELOAD IMAGES ***/
    
    var cache = [];
    preLoadImages = function() {
        var args_len = arguments.length;
        for (var i = args_len; i--;)
        {
          var cacheImage = document.createElement('img');
          cacheImage.src = arguments[i];
          cache.push(cacheImage);
        }
    };
    preLoadImages("http://www.ingens-networks.com/images/mainmenu/menu_over/logoIG_over.jpg","http://www.ingens-networks.com/images/mainmenu/menu_over/blog_over.png","http://www.ingens-networks.com/images/mainmenu/menu_over/contacta_over.es-ES.png","http://www.ingens-networks.com/images/mainmenu/menu_over/empresa_over.es-ES.png","http://www.ingens-networks.com/images/mainmenu/menu_over/extranet_over.es-ES.png","http://www.ingens-networks.com/images/mainmenu/menu_over/footerextranet.png","http://www.ingens-networks.com/images/mainmenu/menu_over/menuicodsc.png","http://www.ingens-networks.com/images/mainmenu/menu_over/menuicoextranet.png","http://www.ingens-networks.com/images/mainmenu/menu_over/menuicosslvpn.png","http://www.ingens-networks.com/images/mainmenu/menu_over/menuicowebex.png","http://www.ingens-networks.com/images/mainmenu/menu_over/partners_over.png","http://www.ingens-networks.com/images/mainmenu/menu_over/soluciones_over.es-ES.png","http://www.ingens-networks.com/images/mainmenu/menu_over/serviciosingens_over.es-ES.png","http://www.ingens-networks.com/images/mainmenu/menu_over/menuicowebmail.png","http://www.ingens-networks.com/images/mainmenu/menu_over/menuicovirtualassist.png");
});