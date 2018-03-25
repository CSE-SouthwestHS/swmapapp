function autocomplete(inp, arr) {
/*the autocomplete function takes two arguments,
the text field element and an array of possible autocompleted values:*/
var currentFocus;
/*execute a function when someone writes in the text field:*/
inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete_pos-list");
    a.setAttribute("class", "autocomplete_pos-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
      }
    }
});

/*execute a function presses a key on the keyboard:*/
inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete_pos-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
});

function addActive(x) {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete_pos-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete_pos-active");
  }
}
function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  var x = document.getElementsByClassName("autocomplete_pos-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
  var x = document.getElementById("searchpos").value;
  closeAllLists(e.target);
    if (results.indexOf(x) <= -1){
      /*do nothing*/
    } else {
      if ( $('.startbar').hasClass('active') ){
        /*do nothing*/
        document.getElementById("strtBtn").click();
      } else {
      /*simulate click on searchBtn*/

      }
    }
  });
}

/*An array containing all the rooms in the school:*/
var results = ["110","Art","Athletic Dir.","Boys Locker Room","Cafeteria","Community Ed","Courtyard Upper","E101","E102",
"E103","E104","E105","E106","E107","E110","E112","E115","E117","E119","E120","E122","E124","Girls Locker Room","Kitchen",
"Main Office","N101","N102","N103","N104","N113","N130","N131","N132","N133","N135","N136","N137","N140","N142","N144","N145",
"N148","N149","N150","N151","N152","N153","N154","Pool Seating","The Cove","The Garages","W101","W102","W105","W106","W108",
"W109","W111","W114","W115","W116","W117","W118","W119","W120","W121","W124","W125","W126","Weight Room","West Gym",
"Gender Neutral Bathroom", "Men's Bathroom", "Women's Bathroom", "Elevator","Door 1","Door 2","Door 5","Door 6","Athletic Entrance",
"Door 7","Door 12","Door 13","Door 15","Door 16","Door 17","201","203","206","207","208","209","211","212","Auditorium","Band",
"BlackBox","Choir","Dance","Media Center","W201","W202","W203","W204","W208","W221","W223","W225","W226","W228","W229","W230",
"W232 A-M","Guitar Room","303","306","307","308","309","310","311","313","314","315","317","321","W301","W302","W303","W304",
"W313","W314","W316","W318","W319","W320","W321","W322","Pool","Pool Locker Rooms","E05","E08","E09","E10","E12","E13","E19",
"E20","E21","E23","Courtyard Lower","East Gym"];

/*initiate the autocomplete function on the "search" element, and pass along the rooms array as possible autocomplete values:*/
autocomplete(document.getElementById("searchpos"), results);
