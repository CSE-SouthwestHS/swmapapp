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
function Deactivate() {
    $('.floor').removeClass('active');
    $('.icon').removeClass('active');
}
//---------------deactivate buttons above------------

$(document).ready(function(){
  $('.colorActivator').click(function(){
    $('.Scontainer').toggleClass('active');
  });
});

//----------------windowcolor Changer below----------

function noColor(){
  $(".windowcolor").css("background-color", "#eeeccc");
}
//--------------------Floor Display below------

function fl1() {
  document.getElementById("floor_text").innerHTML = '';
  document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', floor);
  document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("floor_img").innerHTML = "<img src=\"images/SW_Floor_1.svg\" width=\"30px\" height=\"auto\">";
  document.getElementById("searchpos").value = '';
  document.getElementById("search").value = '';
  $('.startbar').removeClass('active');
}
function fl2() {
  document.getElementById("floor_text").innerHTML = '';
  document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_2.svg');
  document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("floor_img").innerHTML = "<img src=\"images/SW_Floor_2.svg\" width=\"30px\" height=\"auto\">";
  document.getElementById("searchpos").value = '';
  document.getElementById("search").value = '';
  $('.startbar').removeClass('active');
}
function fl3() {
  document.getElementById("floor_text").innerHTML = '';
  document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_3.svg');
  document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("floor_img").innerHTML = "<img src=\"images/SW_Floor_3.svg\" width=\"30px\" height=\"auto\">";
  document.getElementById("searchpos").value = '';
  document.getElementById("search").value = '';
  $('.startbar').removeClass('active');
}
function bsm() {
  document.getElementById("floor_text").innerHTML = '';
  document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_bsm.svg');
  document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("floor_img").innerHTML = "<img src=\"images/SW_Floor_bsm.svg\" width=\"30px\" height=\"auto\">";
  document.getElementById("searchpos").value = '';
  document.getElementById("search").value = '';
  $('.startbar').removeClass('active');
}
function clr() {
  document.getElementById("floor_text").innerHTML = '';
  document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
  document.getElementById("floor_img").innerHTML = "";
  document.getElementById("searchpos").value = '';
  document.getElementById("search").value = '';
  $('.startbar').removeClass('active');
}
function All() {
  document.getElementById("floor_text").innerHTML = '';
  document.getElementById("FloorX").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_1.svg');
  document.getElementById("FloorY").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_2.svg');
  document.getElementById("FloorZ").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_3.svg');
  document.getElementById("Floor0").setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/SW_Floor_bsm.svg');
  document.getElementById("floor_img").innerHTML = "<img src=\"images/SW_Floor_1.svg\" width=\"30px\" height=\"auto\">";
  document.getElementById("searchpos").value = '';
  document.getElementById("search").value = '';
  $('.startbar').removeClass('active');
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

var bs = ["Pool","Pool Locker Rooms","E05","E08","E09","E10","E12","E13","E19","E20","E21","E23","Courtyard Lower","East Gym"]; //14rooms

//---------------Pass to Python---------->
