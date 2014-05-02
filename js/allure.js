	
	/******************************************************************************************************************
	
	 Allure - Switcher Styles
	
	******************************************************************************************************************/
	(function($){
	$(document).ready(function() {
		$('.styleswitch').click(function()
		{
			switchStylestyle(this.getAttribute("rel"));
			return false;
		});
		var c = readCookie('style');
		if (c) switchStylestyle(c);
	});
	
	function switchStylestyle(styleName) {
		$('link[rel*=style][title]').each(function(i) 
		{
			this.disabled = true;
			if (this.getAttribute('title') == styleName) this.disabled = false;
		});
		createCookie('style', styleName, 365);
	}
	})(jQuery);
	
	
	// cookie functions http://www.quirksmode.org/js/cookies.html
	function createCookie(name,value,days){
		if (days)	{
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	function eraseCookie(name){
		createCookie(name,"",-1);
	}
	
	/******************************************************************************************************************
	
	 Allure - Switcher
	
	******************************************************************************************************************/
	
	$(document).ready(function(){
		
		//class fade-image (home) onLoad
		$('.fade-image').each(function(){
			$(this).load(function(){
				$(this).animate({
					'opacity':'1'
				}, 1000);
			});
		});
	
		$('.hover').mouseover(function() {
			//Set "selected" the LI clicked
			$('.hover').each(function(){
			$(this).removeClass("isover");
			});
			$(this).addClass("isover");
		});
		
		$(".option_btn").click(function(){
			if($("#option_wrapper").css("left")!="0px"){
				$("#option_wrapper").animate({left:"0px"},{duration:300});
				$(this).animate({left:"180px"},{duration:300});
				$(this).removeClass("settings-close").addClass("settings-open");
			}else{
				$("#option_wrapper").animate({left:"-182px"},{duration:300});
				$(".option_btn").animate({left:"0"},{duration:300});
				$(this).removeClass("settings-open").addClass("settings-close");
			}
			
			
		//Change body background image
		$("#bg_body_image a").click(function(){
			
			$("body").css("background", "url("+$(this).attr('rel')+") fixed");

			$('.fade-image').load(function(){
				$(this).animate({
					'opacity': 1
				}, 1000);
			});
		});
		
		
		});
	

	/******************************************************************************************************************
	
	 Scroll Page Function
	
	******************************************************************************************************************/
		
	jQuery(function () {
  	
  	// Settings
 	var viewportTop    = 80,
    scrollTime    = 600,
    openTime      = 600,
    completeTime  = 1200,
    scrollElement = "html,body";

  	/* WAYPOINTS */
	$("#white_content > section").waypoint({ offset: viewportTop });  
	$("#nav").stickyPanel();
    
    $("body").delegate("#white_content > section", "waypoint.reached", function (event, direction) {
      var $active = $(this);
      if (direction === 'up') {
        $active = $active.prev();
      }
      if (!$active.length) { $active.end(); }
      $(".section-active").removeClass("section-active");
      $active.addClass("section-active");
      $(".selected").removeClass("selected");
      $("a[href=#"+$active.attr("id")+"]").addClass("selected");
    });
  
	
	  /* SMOOTH SCROLLING LINKS */
	  $("a[href^='#']").click(function (event) {
	    event.preventDefault();
	    var $this   = $(this),
	        target  = this.hash,
	        $target = $(target);
	    $(scrollElement).stop().animate({
	      "scrollTop": $target.offset().top
	    }, scrollTime, "swing", function () {
	      window.location.hash = target;
	    });
	  });
	
	  $.history.init(function(hash){
	    if(hash == "") {
	      $(scrollElement).stop().animate({
	        "scrollTop": 0
	      }, scrollTime, "swing", function () {
	        window.location.hash = "home";
	      });
	    } else {
	      var hashTarget = $("#" + hash),
	      $target = $(hashTarget);
	      $(scrollElement).stop().animate({
	        "scrollTop": hashTarget.offset().top
	      }, scrollTime, "swing", function () {
	        window.location.hash = hash;
	      });
	    }
	    },
	    { unescape: ",/" }
	  );
	
	
	
	/******************************************************************************************************************
	
	 Allure - Projects Function
	
	******************************************************************************************************************/
	
	/* PROJECTS - OPEN MORE INFO */
	$("#work .proj").click(function (event) {
	    event.preventDefault();
	    var getProject  = $(this).parent().attr("id");
	    $(".openproject."+getProject+" .slides");
	    
	    if(!($(".openproject").hasClass("active"))) {
	      $(".openproject."+getProject).fadeIn(openTime).animate({height: "800px"}, openTime).addClass("active");
	      loadImages();
	      
	      setTimeout(function () { 
	        $("#wrapper > section").waypoint({ offset: viewportTop });
	      }, completeTime);
	      document.title = siteName+" - "+$(".openproject."+getProject+" h3").text();
	    } else {
	      $(".openproject.active").fadeOut(openTime).removeClass("active").animate({height: "0"}, openTime);
	      $(".openproject."+getProject).fadeIn(openTime).addClass("active").animate({height: "800px"}, openTime);
	      loadImages();
	      
	      document.title = siteName+" - "+$(".openproject."+getProject+" h3").text();
	    }
	  });
	
	/* PROJECTS - CLOSE MORE INFO */
  	$("#work .close").click(function (event) {
    	event.preventDefault();
	    $(".openproject.active").fadeOut(openTime).removeClass("active").animate({height: "0"}, openTime);
	    setTimeout(function () { 
	      $("#wrapper > section").waypoint({ offset: viewportTop });
	    }, completeTime);
	    document.title = siteName;
	  });

	});	
	
	/******************************************************************************************************************
	
	 Allure - Nivo Slider Counter (to use more than one Slider per html page)
	
	******************************************************************************************************************/
	$(window).load(function() {
		$('.slideprojects div.nivoSlider').each(function(){
			  	var oid = $(this).attr('id');
			  	$('#'+oid).nivoSlider();
			  });
        
    });
    
   
});
