// Giphy API parameters 
var apiKey = "Th13hT1y8CrzFwBfQtDIFvQ2xgdON23l";
var urlDomain = "https://api.giphy.com";
var endPoint = "/v1/gifs/search?";
var q = "Donald+Trump";
var limit = 5;
// result data
var response;

// topics array 
var topics = ["Toronto", "Seattle", "Chicago", "Los Angeles", "New York",
    "Jakarta", "Amsterdam", "Milan", "Paris", "Tokyo", "Beijing"]

// ajax call
// set the stage for the ajax call 
// image on click event 
// render buttons 
function renderButtons() {
    // cycle through array 
    for (var i = 0; i < topics.length; i++) {
        // create a button with the topic text and custom class
        var button = $("<button>").text(topics[i]).addClass("topicButton");
        // add bootstrap class to button 
        button.addClass("btn btn-outline-success");
        // add some margins between buttons 
        button.addClass("m-2");
        // set an attribute of data-topic equal to button text 
        button.attr("data-topic", topics[i]);
        // append to existing button container 
        $("#buttonContainer").append(button);
    }
}

// render the buttons given the topic array 
renderButtons();

// topic click event 
$("body").on("click", ".topicButton", function () {
    // get attributes of button clicked 
    var topic = $(this).attr("data-topic");
    $.ajax({
        url: urlDomain + endPoint + $.param({
            'q': topic,
            'limit': limit,
            'api_key': apiKey
        })
    }).then(function (result) {
        // grab response data and place in var 
        var gifData = result.data;
        // loop through each and grab the correct img src string 
        for (var i = 0; i < gifData.length; i++) {
            // get the image source of the animated gif 
            var imgSrc = gifData[i].images.fixed_height.url;
            console.log(imgSrc);
            // get the image source of the still gif 
            var imgSrcStill = gifData[i].images.fixed_height_still.url;
            console.log(imgSrcStill);
            // create an image element 
            var imgElement = $("<img>", {
                "src": imgSrcStill,
                "class": "gifImg m-1 border border-secondary"
            })
            imgElement.appendTo("#mainImgContainer");

            
        }
        
    })
}
)


