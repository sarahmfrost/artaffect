
/*
Process order:
0. get filepaths for images from CSV
1. Function to get two random anchor images and print affect vectors for anchor images

2. get all gradient blends between two anchor images and save to array

3. run lookup function for all gradient blends, ensure there are no duplicates,
save file names to another array

4a. Build slider to show/hide gradient images
4b. set up "refresh anchors" button


*/


/*
0. get filepaths for images from CSV
*/

var csvFile = "../data/images.csv";

var liwc_csv = "../data/liwc_toParse.csv";



var marginR = 0;
var marginL = 0;

function readCSVToArray(path)
{
    var filePaths = [];
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(artCollection) {
              filePaths = artCollection.split('\r');

        }
  });
  return filePaths
}

function LIWC_CSVToArray(path)
{
    var data = [];
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(artCollection) {
            var rows = artCollection.split("\r");
            for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].split(",");
                data.push( cells );
            }
        }

  });
    return data

}

var liwc_filePaths = LIWC_CSVToArray(liwc_csv);


$(document).ready(function() {
    /*
    1. Function to get two random anchor images
    */
    function getBeginningImage(divID){
        filePaths = readCSVToArray(csvFile);
        var randomNumber = Math.floor(Math.random() * filePaths.length);
        randomImage = filePaths[randomNumber];

        var butName = divID + 'but';
        $(butName).empty();
        var x = document.createElement('img');
        x.src = '../imgs/images/' + randomImage;

        var divName = divID.replace("#","");
        x.setAttribute('id', divName+ 'img');

        $(butName).prepend(x);

        for (i=0; i < liwc_filePaths.length; i++){
            if (liwc_filePaths[i][0] == randomImage){
                var affVec = liwc_filePaths[i].slice(1, 6);
            };
        };
        return affVec;
    };

    var anchor1img_affVec = getBeginningImage('#anchor1');
    var anchor2img_affVec = getBeginningImage('#anchor2');


    //EDITED CODE TO DISPLAY 3 AFFECT VECTORS
    //var target_affVec = getBeginningImage('#target');
    //var anchor1img_affVec = getBeginningImage('#anchor1');
    //var anchor2img_affVec = getBeginningImage('#anchor2');


    $('#Affect1').html("Affect vector: " + anchor1img_affVec)
    $('#Affect2').html("Affect vector: " + anchor2img_affVec)


    /*
    2. get all gradient blends between two anchor images and save to array
    */

    function getGradientBlends(anchor1img_affVec, anchor2img_affVec){

        weight = [.8,.7,.5,.3,.2]
        opp_weight = [.2,.3,.5,.7,.8]

        //array of arrays of gradient blends
        gradient_blends = []
        // array of affects for one gradient blend
        gradient_blend = []

        for(var i=0; i<weight.length; i++){
            for (var k=0; k<5; k++){
                grad_piece = (weight[i] * anchor1img_affVec[k]) + (opp_weight[i] * anchor2img_affVec[k]);
                grad_piece = grad_piece.toFixed(3);
                gradient_blend.push(grad_piece);
                grad_piece = 0
            }
            gradient_blends.push(gradient_blend)
            gradient_blend = []
        }
        return gradient_blends;
    }

    gradient_blends = getGradientBlends(anchor1img_affVec, anchor2img_affVec)

    /*
    3. run lookup function for all gradient blends, ensure there are no duplicates,
    save file names to another array
    */

    //array of predictions for lookup function
    pred_array = []

    function getGradientImages(gradient_blends){
        for(var i=0; i<gradient_blends.length; i++){
            var pred = {"positive": Number(gradient_blends[i][0]), "anxiety": Number(gradient_blends[i][1]), "anger": Number(gradient_blends[i][2]),
            "sad": Number(gradient_blends[i][3]), "affiliation": Number(gradient_blends[i][4])}
            pred_array.push(pred);
            pred = {}
        }

        image_values = []

        var pred_array_string = JSON.stringify(pred_array);
        $('#gradients').text("Gradient arrays are \n" +pred_array_string)

        var promises = pred_array.map(getGradientImage)

        return Promise.allSettled(promises)
            .then(
                (results) =>
                    {
                        results.forEach((result) => image_values.push(result.value))
                        return image_values
                    }
                )
            .catch(error => {console.log("there is an error", error)})
    }

    function getGradientImage(pred) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "/GradientArt",
          type: 'POST',
          data: JSON.stringify (pred),
          contentType: "application/json",
          dataType: 'json',
          success: function (data) {
            resolve(data)
          },
          error: function (error) {
            reject(error)
          },
        })
      })
    }

    getGradientImages(gradient_blends)
    .then(result => {showImages(result)})

    /*
    4a. Build slider to show/hide gradient images
    */

    function showImages(image_array) {
        //console.log(image_array);
        for (var i=0; i<image_array.length; i++){
            var res = image_array[i].split(";");
            var data = res[0];
            console.log("data is", data)

            var img = document.createElement("img");
            img.width = "300";
            img.src = "/static/imgs/images/" + data;

            $('#target' + i + "").append(img).css("visibility", "hidden");
        }
        //start with all the images hidden, except the middle
        $('#target2').css("visibility", "visible");
    }


    $( '#sliderValue' ).mouseup(function(){
        $('#target0, #target1, #target2, #target3, #target4').css("visibility", "hidden");
        var slider = document.getElementById("sliderValue");

        if (slider.value == 0){ $("#target0").css("visibility", "visible");}
        if (slider.value == 25){ $("#target1").css("visibility", "visible");}
        if (slider.value == 50){ $("#target2").css("visibility", "visible");}
        if (slider.value == 75){ $("#target3").css("visibility", "visible");}
        if (slider.value == 100){ $("#target4").css("visibility", "visible");}
    })

    /*
    4b. set up "refresh anchors" button
    */

    $('#new_anchors').click(function(){
        location.reload();
    });

})

