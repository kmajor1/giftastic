// Giphy global API parameters 
var apiKey = "Th13hT1y8CrzFwBfQtDIFvQ2xgdON23l";
var urlDomain = "https://api.giphy.com";
var endPoint = "/v1/gifs/search?";
var limit = 10;
// result data
var response;
// global image source variables 
var mq = window.matchMedia("(min-width: 450px)");
console.log(mq);
var isFH = false; 


// topics array 
var topics = ["Donald Trump", "Colbert", "Clinton", "Russia", "Robert Mueller",
    "Abraham Lincoln", "Alec Baldwin", "Putin", "Jay-Z", "Beyonce", "Kimmel", "Toronto", "Raptors", "Dinosaurs",  "Angry", "Confused", "Tired", "Sick"]

// render buttons based on topics array 
function renderButtons() {
    // empty button container 
    document.getElementById("buttonContainer").innerText = ""; 
    // document.getElementsByName.innerHTML = "<h1>Click to find Gifs!</h1>";
    for (var i = 0; i < topics.length; i++) {
        // create a button with the topic text and custom class
        var button = $("<button>").text(topics[i]).addClass("topicButton");
        // add bootstrap class to button 
        button.addClass("btn btn-success");
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
        // get the render type checkbox value 
        var isRenderReplaceChecked = document.getElementById("renderReplace").checked;
        // if it is checked, clear the div first before placing in images 
        if (!isRenderReplaceChecked) {
            document.getElementById("mainImgContainer").innerHTML = ""; 
        }
        // grab response data and place in var 
        var gifData = result.data;
        // loop through each and grab the correct img src string 
        for (var i = 0; i < gifData.length; i++) {
            // get the rating of the image 
            var rating = gifData[i].rating; 
            rating = "Rated: " + rating; 
            // get all the image URLs needed both fixed width and fixed height for mobile responsiveness 
            var imgSrcFH = gifData[i].images.fixed_height.url;
            var imgSrcFW = gifData[i].images.fixed_width.url;
            var imgSrcStillFH = gifData[i].images.fixed_height_still.url;
            var imgSrcStillFW = gifData[i].images.fixed_width_still.url; 
            // check the current value of the isFH variable 
            if (isFH) {
                var imgSrc = imgSrcFH; 
                var imgSrcStill = imgSrcStillFH; 
            }
            else {
                var imgSrc = imgSrcFW;
                var imgSrcStill = imgSrcStillFW; 
            }
            
            // create an image element 
            var imgElement = $("<img>", {
                "src": imgSrcStill,
                "class": "gifImg m-1",
                "data-still": imgSrcStill,
                "data-animate": imgSrc,
                "data-state": "still",
                "data-stillFW": imgSrcStillFW,
                "data-stillFH": imgSrcStillFH, 
                "data-animateFW": imgSrcFW,
                "data-animateFH": imgSrcFH 
                
            })
            // depending on images initially loaded, store proper attributes 
            // create a div to hold the image, then add rating, then add image
            var newDiv = $("<div>");
            newDiv.addClass("d-flex flex-column align-items-start rating m-2 gifContainer");
            // create a span 
            var newSpan = $("<span>");
            newSpan.addClass("badge badge-info")
            newSpan.text(rating);
            // add span & image to div
            newDiv.append(newSpan);
            newDiv.append(imgElement);
            if (renderReplace)
            // place the div 
            newDiv.prependTo("#mainImgContainer");
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

// new topic submit event 
$("#submitNewTopic").on("click", function (event) {
    // grab the text of the user input 
    // prevent default behaviour of click? 
    // event.preventDefault(); 
    var userTopic = document.getElementById("newTopicInput").value;
    // add topic to array
    topics.push(userTopic);
    renderButtons(); 
    document.getElementById("newTopicInput").value = '';
})
// put a listener for media changes (responsive)

function imgType (mq) {
    if (mq.matches) {
        isFH = true; 
        // loop through any existing gif images and changed the source accordingly 
        $.each($(".gifImg"), function (indexInArray, valueOfElement) { 
            // check state of image 
            var imgState = $(this).attr("data-state");
            if (imgState == "still") {
                var imgSrcNew =  $(this).attr("data-stillFH");
                $(this).attr("src", imgSrcNew);
            }
            else {
                var imgSrcNew = $(this).attr("data-animateFH");
                $(this).attr("src", imgSrcNew);
            }
            
        });
    }
    else {
        isFH = false; 
        // loop through any existing gif images and changed the source accordingly 
        $.each($(".gifImg"), function (indexInArray, valueOfElement) { 
            // check state of image 
            var imgState = $(this).attr("data-state");
            if (imgState == "still") {
                var imgSrcNew =  $(this).attr("data-stillFW");
                $(this).attr("src", imgSrcNew);
            }
            else {
                var imgSrcNew = $(this).attr("data-animateFW");
                $(this).attr("src", imgSrcNew);
            }
            
        });
        
    }

}

// test for check value 
console.log(renderReplace);
// run media query right away 
imgType(mq); 
mq.addListener(imgType);


