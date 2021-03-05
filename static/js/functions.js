csvPath = "../data/image_path.csv"
vectorPath = "../data/liwc_toParse.csv"
//var allFilePaths = []
var clicks = 0;
var score = 0;
var rawScore = 0;
var questions = 0;
var qScore = 0;
var currVect = [];
var currDic = {};
//var emoteTypes = ['anger', 'anxiety', 'positivity', 'sadness', 'love'];
var emoteTypes = ['positivity', 'anxiety', 'anger', 'sadness', 'love'];
var numGames = 5;

function readCSVToArray(path, delimter) {
    var filePaths = []
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (artCollection) {
            filePaths = artCollection.split(delimter);

        }
    });

    return filePaths
}

function getVector() {
    $.ajax({
        type: 'POST',
        url: '/GetVector',
        data: JSON.stringify(allFilePaths[ranNum]),
        contentType: 'application/json',
        success: function (data) {
            return data;
        }
    });
}

// function to return random image

function show_image() { //TODO make show image never repeat (in same round, I got the same image 2x in a row)

    //clear the "resultDiv"
    document.getElementById("resultDiv").innerHTML = "";

    allFilePaths = readCSVToArray(csvPath, '\r');
    allVectorPaths = readCSVToArray(vectorPath, '\r');

    var ranNum = Math.floor(Math.random() * allFilePaths.length);
    data = (allVectorPaths[ranNum]).split(",");
    currVect = data.slice(1, 6);
    emoteTypes.forEach((key, i) => currDic[key] = currVect[i]);
    currVect = Object.keys(currDic).map(function (key) {
        return [key, currDic[key]];
    });
    currVect.sort(function (first, second) {
        return second[1] - first[1];
    });

    var img = document.createElement("img");
    img.src = "../imgs/images/" + data[0];
    img.id = "picture";
    img.height = "600";
    img.style = 'display: block; margin-left: auto; margin-right: auto;'

    console.log(allFilePaths[ranNum]);

    var foo = document.getElementById("resultDiv");
    foo.appendChild(img);
}

// function to return model output predictions

function saveAffects() { // NOT USED
    var pred = document.querySelector('input[name="emotion"]:checked').value;

    console.log("pred is", pred)
    return pred
}


// When the page loads - we want the user to be presented with the slider values set to zero, and a random image.
// Then the user changes the slider, and clicks "Submit your guess". When this happens, the slider values should be
//stored, along with the affect vector for the image, and the path to the image. After 5 images, all info
// should be shown to user

function onButtonClicked(clicked_id) {
    // disable button so it can't be clicked again
    // document.getElementById(clicked_id).disabled = true;
    document.getElementById(currVect[clicks][0] + '_button').disabled = true;

    // Get clicked button emotion
    clicked_emotion = clicked_id.split("_")[0];

    // compare against expected, change colour based on accuracy
    if (clicked_emotion == currVect[clicks][0]) {
        document.getElementById('selection_' + (clicks+1).toString()).textContent = clicked_emotion;
        qScore++;
        rawScore++;
        switch(clicks){ // give user points on a decreasing scale, with bonus points for all 5 right
            case 0:
                score += 2;
            case 1:
                score += 1;
            case 2:
                score += 1;
            case 3:
                score += 2;
            case 4:
                score += 1;
                if(qScore == 5){
                    score += 10;
                }
        }
        document.getElementById('selection_' + (clicks+1).toString()).style = 'color: green;';
    } else {
        document.getElementById('selection_' + (clicks+1).toString()).textContent = currVect[clicks][0];
        document.getElementById('selection_' + (clicks+1).toString()).style = 'color: red;';
    }

    clicks++;
    setTimeout(function () { // timeout allows users to evaluate their inputs before page reloads
        // next image if ranking has been completed
        if (clicks >= emoteTypes.length) {
            clicks = 0;
            qScore = 0;
            questions++;
            if (questions >= numGames) { // move to scoring page if game complete
                showScore();
            }
            for (var i = 0; i < emoteTypes.length; i++) {
                document.getElementById(emoteTypes[i] + '_button').disabled = false;
                document.getElementById('selection_' + (i + 1).toString()).innerHTML = "<br>";
                document.getElementById('selection_' + (clicks+1).toString()).style = 'color: white;';
            }
            show_image();
            document.getElementById('current_pick').textContent = (clicks + 1).toString();
        }
        document.getElementById('current_pick').textContent = (clicks+1).toString();
    }, 50);
}

function showScore() {
    // SET SCORE STRING TO 'playerScore' below
    sessionStorage.setItem('playerScore', score.toString());
    sessionStorage.setItem('playerRawScore', rawScore.toString())
    window.location.href = "/static/html/scoring_page.html";
    show_image();
}


$(document).ready(function () {
    show_image()
    sessionStorage.setItem('playerScore', '0');
    sessionStorage.setItem('playerRawScore', '0');
})