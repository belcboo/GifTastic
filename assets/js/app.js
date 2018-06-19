//This array hold the 'default' buttons and it will receive all the new buttons that the user pushes.
var buttons = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedhehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

//This counter will be to add an unique ID to the buttons that will match the index # in the array.
var counter = 0;
var userpick;

var app = {

  //Create the default buttons that are stored in the array 'buttons'.
  defaultButtons: function() {
    for (var i = 0; i < buttons.length; i++) {

      var sp = $("<button>"); //Creates a new button
      sp.attr("id", "item-" + counter); //Add id with value "item-" and the actual counter value.
      sp.attr("class", "button"); //Adds a class called button.
      sp.attr("animal", buttons[i]); //Adds a custom attribute with the name of the animal.
      sp.append("" + buttons[i]); //Adds the value of the animal to display in the button.

      $("#buttons").append(sp); //Append the new button to the assigned div in the body.

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
//Creates a new button//Creates a new button
  showGif: function() {

    //Generatin the QueryURL.
    var api = "&api_key=osci6gUKNLoHPAxZkxn8zpUNbfrXEghy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userpick + api;

    //Getting the gifs using the Giphy API with Ajax.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { //all the information queed from Giphy is stored in the object "response".

      var gifSpan = $("<span>"); //Using span to have all the new images inline by default.
      var ratingDiv = $("<div>");//This will hold the rating.
      var gifImg = $("<img>"); //This will hold the gif.

      ratingDiv.append("Rating: ", response.data[1].rating); //pulling the rating for the image.
      gifImg.attr("src", response.data[1].images.original.url); //pulling the url for the image.

      gifSpan.append(ratingDiv);//Appending the rating to the span.
      gifSpan.append(gifImg); //Appending the image to the span.

      $("#images").append(gifSpan);//Generating the span in the body of the website.

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
$(document.body).on('click', ".button", function() {

  //Updates the userpick variable with the value
  userpick = $(this).attr("animal");
  app.showGif();

});
