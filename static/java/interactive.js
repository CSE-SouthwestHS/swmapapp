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
//---------------deactivate buttons below------------

function Destination() {
  var x = document.getElementById("search").value;
  if (results.indexOf(x) == -1) {
    $('.startbar').removeClass('active');
  }
}
//---------------deactivate buttons above------------

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
    $("#windowcolor").css("background-color", "#3b3b2b");
    $(".searchBar").css("background-color", "#494949");
    $(".startbar").css("background-color", "#494949");
    $("#search").css("background-color", "#494949");
    $("#search").css("color", "white");
    $("#searchpos").css("color", "white");
    $("#searchpos").css("background-color", "#494949");
    $(".floor a").css("background-color", "#656565");
    $(".icon a").css("background-color", "#656565");
    $(".floor a").css("color", "#d1d1d1");
    $(".icon a").css("color", "#d1d1d1");
    $(".FLUI").css("filter", "invert(80%)");
    document.getElementById('displayMode').innerHTML = "Day &#x2600;";
  } else {
    $("#windowcolor").css("background-color", "#eeeccc");
    $(".searchBar").css("background-color", "white");
    $(".startbar").css("background-color", "white");
    $("#search").css("background-color", "white");
    $("#search").css("color", "black");
    $("#searchpos").css("color", "black");
    $("#searchpos").css("background-color", "white");
    $(".floor a").css("background-color", "#eee");
    $(".icon a").css("background-color", "#eee");
    $(".floor a").css("color", "#222");
    $(".icon a").css("color", "#222");
    $(".FLUI").css("filter", "invert(0%)");
    document.getElementById('displayMode').innerHTML = "Night &#x263E;";
  }
}
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
