//const csvPath = "static/data/image_path.csv"
//var allFilePaths = []


var affect = [];

function readCSVToArray(path, delimter)
{
    var filePaths = []
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(artCollection) {
              filePaths = artCollection.split(delimter);

        }
  });

  return filePaths
}

// function to return random image

function show_image() {

//clear the "resultDiv"
document.getElementById("resultDiv").innerHTML = "";

allFilePaths = readCSVToArray(csvPath, '\r')

ranNum = Math.floor(Math.random() * allFilePaths.length);

    var img = document.createElement("img");
    img.src = "../imgs/images/" + allFilePaths[ranNum];
    img.id = "picture";

console.log(allFilePaths[ranNum])

    var foo = document.getElementById("resultDiv");
    foo.appendChild(img);

}


function saveAffects(){

var anger = document.getElementById("angerValue");
var anxiety = document.getElementById("anxietyValue");
var positiveEmotion = document.getElementById("positiveValue");
var affiliation = document.getElementById('affiliationValue')
var sad = document.getElementById("sadnessValue");

var pred = {"positive": Number(positiveEmotion.value),
  "anxiety": Number(anxiety.value),
  "anger": Number(anger.value),
  "sad": Number(sad.value),
  "affiliation": Number(affiliation.value)}

affect = [Number(positiveEmotion.value), Number(anxiety.value), 
    Number(anger.value), Number(sad.value), Number(affiliation.value)]

console.log("affect is " + affect)
console.log("pred is", pred)
return pred
}



$(document).ready(function()
{

    $( '#angerValue,#anxietyValue,#sadnessValue,#positiveValue,#affiliationValue' ).mouseup(function() {
        console.log('starting submit')
        pred = saveAffects()
    $.ajax({
        url: "/TouchToArt",
        type: 'POST',
        data: JSON.stringify (pred),
        contentType: "application/json",
        dataType: 'json',
        success:function( data )
            {
                var dataTosplit = data;
                var res = dataTosplit.split(";");
                var data = res[0];
                var features = res[1];
                console.log("new data is" + data)
                console.log("new features is" + features)

                document.getElementById("resultDiv").innerHTML = "";
                var img = document.createElement("img");
                img.src = "../imgs/images/" + data;
                img.id = "picture";
                img.height = "600";

                var foo = document.getElementById("resultDiv");
                foo.appendChild(img);
                console.log("img src is" + img.src)

            $('#PaintingName').html("result image is " + data)
            $('#artFeatures').html("features of selected art are: " + features)
            $('#sliderValues').html("slider values are: " + JSON.stringify (pred))

            }
        })
    })
})


var options = {
    scale: {
        ticks: {
            beginAtZero: true,
            max: 100,
            min: 0
        }
    },
};

var myRadarChart = new Chart("myChart", {
    type: 'radar',
    data: {
        labels: ["Pos Emo", "Anxiety", "Anger", "Sadness", "Affiliation"],
        datasets: [{
            label: "Affects as radar chart",
            backgroundColor: 'rgba(0, 200, 132, 0.1)',
            borderColor: 'rgba(0, 200, 132)',
            data: [20, 30, 40, 50, 60]
        }],
    },
    options: options
});