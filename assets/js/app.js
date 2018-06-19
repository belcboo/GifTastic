//This array hold the 'default' buttons and it will receive all the new buttons that the user pushes.
var buttons = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedhehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

//This counter will be to add an unique ID to the buttons that will match the index # in the array.
var counter = 0;
var userpick;

var app = {

  //Create the default buttons that are stored in the array 'buttons'.
  defaultButtons: function() {
    for (var i = 0; i < buttons.length; i++) {

      var sp = $("<button>");
      sp.attr("id", "item-" + counter);
      sp.attr("class", "button");
      sp.attr("animal", buttons[i]);
      sp.append("" + buttons[i]);

      $("#buttons").append(sp);

      //Increase the counter to have it 'up to date'.
      counter++;
    }
  },

  //Function to create buttons typed by user.
  newButton: function() {

    //Get the value typed in the text box.
    var newbutton = $("#animal-input").val().trim();

    //Create the new button, and add an ID and a custon attribute.
    var sp = $("<button>");
    sp.attr("id", "item-" + counter);
    sp.attr("class", "button");
    sp.attr("animal", newbutton);
    sp.append("" + newbutton);

    //Append the new button to the div "buttons".
    $("#buttons").append(sp);

    //Increase counter to add unique id to the buttons.
    counter++;

    //Cleaning text box.
    $("#animal-input").val("");
  },

  showGif: function() {

    //Generatin the QueryURL.
    var api = "&api_key=osci6gUKNLoHPAxZkxn8zpUNbfrXEghy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userpick + api;

    //Getting the gifs using the Giphy API with Ajax.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){ //all the information queed from Giphy is stored in the object "response".



    })

  },

};


//Calls function on load to create all the default buttons.
app.defaultButtons();


//Adding a new custom button by user.
$("#addAnimal").on('click', function(event) {
  event.preventDefault();
  app.newButton();
});

//Clicking one of the buttons.
$(document.body).on('click', ".button", function(){

  //Updates the userpick variable with the value
  userpick = $(this).attr("animal");
  app.showGif();

});
