
/*
Process order:
0. get filepaths for images from CSV
1a. Function to get two random anchor images
1b. print affect vectors for anchor images
1c. Set up refresh buttons for anchor images

2a. ge  t all gradient blends between two anchor images and save to array
2b. print the weight and gradient blends

3a. run lookup function for all gradient blends, ensure there are no duplicates,
save file names to another array
3b. print file names and affect vectors


4a. Build Function to move gradient images across screen
4b. set up "more like this" buttons to move between anchor images


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

/*
1a. Function to get two random anchor images
*/

$(document).ready(function() {
    //Takes a divID, and puts a random image in that div
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

/*
1b. print affect vectors for anchor images
*/

    //EDITED CODE TO DISPLAY 3 AFFECT VECTORS
    //var target_affVec = getBeginningImage('#target');
    //var anchor1img_affVec = getBeginningImage('#anchor1');
    //var anchor2img_affVec = getBeginningImage('#anchor2');


    $('#Affect1').html("Affect vector: " + anchor1img_affVec)
    $('#Affect2').html("Affect vector: " + anchor2img_affVec)
    //$('#targetAffect').html("Affect vector: " + target_affVec)


/*
1c. Set up refresh buttons for anchor images
*/

  $('#mbutton1').click(function(){
        var aff1 = getBeginningImage('#anchor1');

        $('#Affect1').html("Affect vector: " + aff1)

    });

    $('#mbutton2').click(function(){
        var aff1 = getBeginningImage('#anchor2');

        $('#Affect2').html("Affect vector: " + aff1)


    });



/*
2a. get all gradient blends between two anchor images and save to array
*/

//<<<<<<< HEAD
//function getGradientBlends(){
//=======
TestOne = [0,0,0,0,0]
TestTwo = [100,100,100,100,100]


function getGradientBlends(anchor1img_affVec, anchor2img_affVec){
//>>>>>>> cd505ec54dd1c7917646f41b606f958891076277


    //Option for 9 gradient images
    //weight = [.9,.8,.7,.6,.5,.4,.3,.2,.1]
    //opp_weight = [.1,.2,.3,.4,.5,.6,.7,.8,.9]

    weight = [.9,.7,.5,.3,.1]
    opp_weight = [.1,.3,.5,.7,.9]




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
    /*
    2b. print the gradient blends (This has been moved to around line 213)
    */

    return gradient_blends;

}

gradient_blends = getGradientBlends(anchor1img_affVec, anchor2img_affVec)
//gradient_blends = getGradientBlends(TestOne, TestTwo)

/*
3a. run lookup function for all gradient blends, ensure there are no duplicates,
save file names to another array
*/


//array of gradient image names
image_names = []
pred_array = []

    function getGradientImages(gradient_blends){
        for(var i=0; i<gradient_blends.length; i++){
            var pred = {"positive": Number(gradient_blends[i][0]), "anxiety": Number(gradient_blends[i][1]), "anger": Number(gradient_blends[i][2]),
            "sad": Number(gradient_blends[i][3]), "affiliation": Number(gradient_blends[i][4])}
            // run getGradientImage with each pred

            pred_array.push(pred);
            pred = {}
        }

        image_values = []

        console.log(pred_array)

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
    //need to get the results in an array, to print out

/*
3b. print file names and affect vectors
*/


    //return(image_names)



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
4a. Build Function to get images and move gradient images across screen
*/

    function showImages(image_array) {

        for (var i=0; i<image_array.length; i++){
            var res = image_array[i].split(";");
            var data = res[0];
            console.log("data is", data)

            var img = document.createElement("img");
            img.width = "300";
            img.src = "/static/imgs/images/" + data;

            $('#target' + i + "").append(img);

        }
    }


/*
4b. set up "more like this" and "refresh anchor" buttons

*/


$('#FLT_Left').click(function(){
        console.log("left Feels more like this clicked")
        });

$('#FLT_Right').click(function(){
        console.log("Right feels more like this clicked")
        });


$('#new_anchor_left').click(function(){
            getBeginningImage('#anchor1');
        });

$('#new_anchor_right').click(function(){
            getBeginningImage('#anchor2');
        });
})

