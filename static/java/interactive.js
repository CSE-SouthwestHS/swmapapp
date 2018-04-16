//------------------------Menu Button below------
$(document).ready(function(){
  $('.icon').click(function(){
    $('.icon').toggleClass('active');
    $('.floor').removeClass('active');
  });
});
//---------------------Search Button below------
$(document).ready(function(){
  $('.floor').click(function(){
    $('.floor').toggleClass('active');
    $('.icon').removeClass('active');
  });
});
//---------------deactivate buttons above------------
//---------------more deactivation---------->
function reset_searchbar(){
  $('.searchBar input').css("color", "#000");
  $('.startbar input').css("color", "#000");
  $('.searchBar').removeClass('active');
  $('.startbar').removeClass('active');
  document.getElementById("search").value = "";
  document.getElementById("searchpos").value = "";
}
//---------------------------------------->
//--------------Sanitation--------------->
function sanitateSearch(){
  var safeInput = document.getElementById("search").value;
  document.getElementById("search").value = safeInput.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
function sanitatePos(){
  var safeInput = document.getElementById("searchpos").value;
  document.getElementById("searchpos").value = safeInput.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
//--------------------------------------->

var input = document.getElementById("search");  // Allow the Enter key to trigger search function.
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("srchBtn").click();
  }
});
var input = document.getElementById("searchpos");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("strtBtn").click();
  }
});
//-----------------FLUI Clors and Fx---------->
function colorChange() {
  var Color = document.getElementById("Cinput").value;
  if ( $('.DarkMode').hasClass('DayMode') ){
    $("#windowcolor").css("background-color", "hsl(" + Color + ", 50%, 85%)");
    $("#windowcolor").css("filter", "invert(80%)");
  } else {
    $("#windowcolor").css("background-color", "hsl(" + Color + ", 50%, 85%)");
  }
}
function isNumberKey(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}
$(document).ready(function(){
  $('.colorActivator').click(function(){
    $('.Scontainer').toggleClass('active');
    $("#windowcolor").css("animation", "CCActivate 4s forwards");
    $("#BGColor input[type=text]").css("animation", "CCBarActivate 3s forwards");
    setTimeout(function() {
      reset_animation_window();
      reset_animation_textbox(); }, 4000);
  });
});
function reset_animation_window() {
  var el = document.getElementById('windowcolor');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null;
}
function reset_animation_textbox() {
  var el = document.getElementById('BGColor');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null;
}
//----------------windowcolor Changer below----------
function noColor(){
  if ( $('.DarkMode').hasClass('DayMode')) {
  $("#windowcolor").css("background-color", "#3b3b2b");
  } else {
  $("#windowcolor").css("background-color", "#eeeccc");
  }
}
$(document).ready(function(){
  $('#displayMode').click(function(){
    $(".DarkMode").toggleClass('DayMode');
    DNMode();
  });
});
function DNMode(){
  if ( $('.DarkMode').hasClass('DayMode')) {
    $("#windowcolor").css("background", "#3b3b2b");
    $(".searchBar").css("filter", "invert(80%)");
    $(".startbar").css("filter", "invert(80%)");
    $('.searchBar input').css("filter", "invert(100%)");
    $('.startbar input').css("filter", "invert(100%)");
    $(".floor a").css("background", "#656565");
    $(".icon a").css("background", "#656565");
    $(".floor a").css("color", "#d1d1d1");
    $(".icon a").css("color", "#d1d1d1");
    $(".FLUI").css("filter", "invert(80%)");
    $(".ETA").css("filter", "invert(20%)");
    document.getElementById('displayMode').innerHTML = "Day &#x2600;";
  } else {
    $("#windowcolor").css("background", "#eeeccc");
    $(".searchBar").css("filter", "invert(0%)");
    $(".startbar").css("filter", "invert(0%)");
    $('.searchBar input').css("filter", "invert(0%)");
    $('.startbar input').css("filter", "invert(0%)");
    $(".floor a").css("background", "#eee");
    $(".icon a").css("background", "#eee");
    $(".floor a").css("color", "#222");
    $(".icon a").css("color", "#222");
    $(".FLUI").css("filter", "invert(0%)");
    $(".ETA").css("filter", "invert(0%)");
    document.getElementById('displayMode').innerHTML = "Night &#x263E;";
  }
}
$("#search").click(function(){
  if ( $('.DarkMode').hasClass('DayMode') ){
    $('.searchBar input').css("color", "white");
  } else{
    $('.searchBar input').css("color", "black");
  }
});
$("#searchpos").click(function(){
  if ( $('.DarkMode').hasClass('DayMode') ){
    $('.startbar input').css("color", "white");
  } else{
    $('.startbar input').css("color", "black");
  }
});
//-----------------------Room-sources------------------------->
// organized by floor--below
var f1 = ["110","Art","Athletic Dir.","Boys Locker Room","Cafeteria","Community Ed","Courtyard Upper","E101","E102","E103","E104","E105","E106","E107","E110","E112",
    "E115","E117","E119","E120","E122","E124","Girls Locker Room","Kitchen","Main Office","N101","N102","N103","N104","N113","N130","N131","N132",
    "N133","N135","N136","N137","N140","N142","N144","N145","N148","N149","N150","N151","N152","N153","N154","Pool Seating","The Cove","The Garages","W101","W102",
    "W105","W106","W108","W109","W111","W114","W115","W116","W117","W118","W119","W120","W121","W124","W125","W126","Weight Room","West Gym","Bathrooms","Elevator",
    "Door 1","Door 2","Door 5","Door 6","Athletic Entrance","Door 7","Door 12","Door 13","Door 15","Door 16","Door 17"];

var f2 = ["201","203","206","207","208","209","211","212","Auditorium","Band","BlackBox","Choir","Dance","Media Center","W201","W202","W203","W204","W208","W221","W223",
    "W225","W226","W228","W229","W230","W232 A-M","Guitar Room"]; //28rooms

var f3 = ["303","306","307","308","309","310","311","313","314","315","317","321","W301","W302","W303","W304","W313","W314","W316","W318","W319","W320","W321",
    "W322"]; //24rooms

var bs = ["Pool","Pool Locker Rooms","E05","E08","E09","E10","E12","E13","E19","E20","E21","E23","Courtyard Lower","East Gym"]; /*14rooms*/
// Function allows for touch-pan.
// Don't use window.onLoad like this in production, because it can only listen to one function.
window.onload = function() {
  var beforePan

  beforePan = function(oldPan, newPan){
    var stopHorizontal = false
      , stopVertical = false
      , gutterWidth = 500
      , gutterHeight = 500
        // Computed variables
      , sizes = this.getSizes()
      , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
      , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
      , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
      , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

    customPan = {}
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

    return customPan
  }
  var eventsHandler;

  eventsHandler = {
    haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
  , init: function(options) {
      var instance = options.instance
        , initialScale = 1
        , pannedX = 0
        , pannedY = 0

      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
      })

      // Enable pinch
      this.hammer.get('pinch').set({enable: true})

      // Handle double tap
      this.hammer.on('doubletap', function(ev){
        instance.zoomIn()
      })

      // Handle pan
      this.hammer.on('panstart panmove', function(ev){
        // On pan start reset panned variables
        if (ev.type === 'panstart') {
          pannedX = 0
          pannedY = 0
        }

        // Pan only the difference
        instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
        pannedX = ev.deltaX
        pannedY = ev.deltaY
      })

      // Handle pinch
      this.hammer.on('pinchstart pinchmove', function(ev){
        // On pinch start remember initial zoom
        if (ev.type === 'pinchstart') {
          initialScale = instance.getZoom()
          instance.zoom(initialScale * ev.scale)
        }

        instance.zoom(initialScale * ev.scale)

      })

      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
    }

  , destroy: function(){
      this.hammer.destroy()
    }
  }
  // Expose to window namespace for testing purposes
  window.panZoom = svgPanZoom('#FLUI-svg', {
    zoomEnabled: true
  , controlIconsEnabled: true
  , fit: 1
  , center: 1
  , beforePan: beforePan
  , customEventsHandler: eventsHandler
  });
  // panZoom.setBeforePan(beforePan)
};
//-----------MAIN FUNCTIONS--------------->
// the function below resets the floor button behavior to reflect a path
function set_floor_buttons(data){
  $('.Floor1').click(function(){
    window.panZoom.reset();
    document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.one);
    document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  });
  $('.Floor2').click(function(){
    window.panZoom.reset();
    document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.two);
    document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  });
  $('.Floor3').click(function(){
    window.panZoom.reset();
    document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.three);
    document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  });
  $('.Floor0').click(function(){
    window.panZoom.reset();
    document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.zero);
    document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  });
  $('.Floor4').click(function(){
    window.panZoom.reset();
    document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.one);
    document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.two);
    document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.three);
    document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.zero);
  });
  $('.Floor00').click(function(){
    window.panZoom.reset();
    document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
    document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  });
}
function Entry(){
  var init_html = window.location.href,
      html = init_html.substring(0, init_html.indexOf("/map/")),
      x = document.getElementById("search").value,
      s = ["Seay", "Mark", "seay", "mark"];
  if (s.indexOf(x) >= 0){
    location.assign(html + "/egg/");
  } else {
    if (results.indexOf(x) < 0){
      $('.startbar').removeClass('active');
      $('.searchBar input').css("color", "#e03e3e");
      $('.show').css("animation", "slideback 2s forwards");
      $('#search').blur();
      document.getElementById('searchpos').value = '';
    } else {
      // stop link reloading the page
      event.preventDefault();
      $('.startbar').addClass('active');
      $('.searchBar').addClass('valid');
      setTimeout(function(){
        $('.searchBar').removeClass('valid');
      }, 2000);
    }
  }
}
function Trace(){
  var x = document.getElementById("search").value,
      y = document.getElementById("searchpos").value;
  if ( $('.startbar').hasClass('active') ){
    if (y == x){
      $('.startbar input').css("color", "#e03e3e");
      $('#searchpos').blur();
      document.getElementById('searchpos').value = y + ' ';
    } else {
      if (results.indexOf(y) >= 0 && results.indexOf(x) < 0){
        $('.searchBar input').css("color", "#e03e3e");
        $('#search').blur();
      } else {
        if (results.indexOf(y) >= 0){
            $('#loading_icon').css('display', 'block');
            $('.searchBar input').css("color", "#3ee062");
            $('.startbar input').css("color", "#3ee062");
            $('.show').css("animation", "slideback 2s forwards");
            $.getJSON('/load_path/', {
              start: y,
              end: x,
            }, function(data){
              $('#loading_icon').css('display', 'none');
              window.panZoom.reset();
              document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.zero);
              document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.one);
              document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.two);
              document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'data:image/png;base64,'+data.three);
              set_floor_buttons(data);
              $("#time_estimate").text("Travel Time: " + data.time + " sec.");
              $('.show').css("animation", "slide 2s forwards");
              $('.ETA').addClass('show');
              reset_searchbar();
            });
        } else {
          $('.startbar input').css("color", "#e03e3e");
          $('#searchpos').blur();
        }
      }
    }
  }
}
var z = "Room not found.";
var results = ["110","Art","Athletic Dir.","Boys Locker Room","Cafeteria","Community Ed","Courtyard Upper","E101","E102","E103",
"E104","E105","E106","E107","E110","E112","E115","E117","E119","E120","E122","E124","Girls Locker Room","Kitchen","Main Office",
"N101","N102","N103","N104","N113","N130","N131","N132","N133","N135","N136","N137","N140","N142","N144","N145","N148","N149",
"N150","N151","N152","N153","N154","Pool Seating","The Cove","Code Club","The Garages","W101","W102","W105","W106","W108","W109","W111",
"W114","W115","W116","W117","W118","W119","W120","W121","W124","W125","W126","Weight Room","West Gym","Gender Neutral Bathroom",
"Mens Bathroom","Womens Bathroom","Elevator","Door 1","Door 2","Door 5","Door 6","Athletic Entrance","Door 7","Door 12",
"Door 13","Door 15","Door 16","Door 17","Door 19","201","203","206","207","208","209","211","212","Auditorium","Band","BlackBox","Choir",
"Dance","Media Center","W201","W202","W203","W204","W208","W221","W223","W225","W226","W228","W229","W230","W232 A-M","Guitar Room",
"303","306","307","308","309","310","311","313","314","315","317","321","W301","W302","W303","W304","W313","W314","W316","W318",
"W319","W320","W321","W322","Pool","Pool Locker Rooms","E05","E08","E09","E10","E12","E13","E19","E20","E21","E23","Courtyard Lower","East Gym"];
//------------Changing Floors---------------->
$(document).ready(function(){
  $.getJSON('/load_path/', {
    start: "BLANK",
    end: "BLANK",
  }, function(data){
    set_floor_buttons(data);
  });
});
