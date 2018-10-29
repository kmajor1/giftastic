// Giphy global API parameters 
var apiKey = "Th13hT1y8CrzFwBfQtDIFvQ2xgdON23l";
var urlDomain = "https://api.giphy.com";
var endPoint = "/v1/gifs/search?";
var limit = 10;
// result data
var response;

// topics array 
var topics = ["Toronto", "Seattle", "Chicago", "Los Angeles", "New York",
    "Jakarta", "Amsterdam", "Milan", "Paris", "Tokyo", "Beijing"]


// render buttons based on topics array 
function renderButtons() {
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


// on-load events
$(document).ready(function () {
    renderButtons();
});
// topic click event 
$("body").on("click", ".topicButton", function () {
    // get the topic of button clicked 
    var topic = $(this).attr("data-topic");
    // call the giphy search API with this topic 
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
                "class": "gifImg m-1 border border-secondary",
                "data-still": imgSrcStill,
                "data-animate": imgSrc,
                "data-state": "still"
            })
            // place the image
            imgElement.appendTo("#mainImgContainer");
            // once the image is loaded, show it. 
            // imgElement.on("load", function() {
            // imgElement.removeClass("d-none");
        }
    })
})



// image click event 
$("body").on("click", ".gifImg", function () {
    // get the data-state of the image clicked 
    var imgState = $(this).attr("data-state");
    var imgSrcStill = $(this).attr("data-still");
    var imgSrcAnimate = $(this).attr("data-animate");
    if (imgState == "still") { 
        $(this).attr("src", imgSrcAnimate);
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", imgSrcStill);
        $(this).attr("data-state", "still");
    }
}
)


