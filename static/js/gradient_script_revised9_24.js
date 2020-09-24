
/*
Process order:
0. get filepaths for images from CSV
1a. Function to get two random anchor images
1b. print affect vectors for anchor images
1c. Set up refresh buttons for anchor images

2a. get all gradient blends between two anchor images and save to array
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
                console.log(randomImage + affVec);
                $('#AffectBlend1').append(randomImage + " " + affVec + "<br>")

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
    var target_affVec = getBeginningImage('#target');
    var anchor1img_affVec = getBeginningImage('#anchor1');
    var anchor2img_affVec = getBeginningImage('#anchor2');


    $('#Affect1').html("Affect vector: " + anchor1img_affVec)
    $('#Affect2').html("Affect vector: " + anchor2img_affVec)
    $('#targetAffect').html("Affect vector: " + target_affVec)


/*
1c. Set up refresh buttons for anchor images
*/

  $('#mbutton1').click(function(){
        var aff1 = getBeginningImage('#anchor1');
        var aff2 = getBeginningImage('#target');

        $('#Affect1').html("Affect vector: " + aff1)
        $('#targetAffect').html("Affect vector " + aff2)

    });

    $('#mbutton2').click(function(){
        var aff1 = getBeginningImage('#anchor2');
        var aff2 = getBeginningImage('#target');

        $('#Affect2').html("Affect vector: " + aff1)
        $('#targetAffect').html("Affect vector " + aff2)


    });



/*
2a. get all gradient blends between two anchor images and save to array
*/

function getGradientBlends{

    weight = [.9,.8,.7,.6,.5,.4,.3,.2,.1]
    opp_weight = [.1,.2,.3,.4,.5,.6,.7,.8,.9]

    //array of arrays of gradient blends
    gradient_blends = []
    // array of affects for one gradient blend
    gradient_blend = []

    for(var i=0; i<weight.length; i++){
        for (var k=0; k<5; k++){
            grad_piece = weight[i] * anchor1img_affVec[k] + opp_weight[i] * anchor2img_affVec[k]
            gradient_blend.push[grad_piece]
        }
        gradient_blends.push[gradient_blend]
    }
    return gradient_blends;
    console.log(gradient_blends)
    /*
    2b. print the weight and gradient blends
    */

}

gradient_blends = getGradientBlends()

/*
3a. run lookup function for all gradient blends, ensure there are no duplicates,
save file names to another array
*/


//array of gradient image names
image_names = []

    function getGradientImages(gradient_blends){
        for(var i=0; i<gradient_blends.length; i++){
            var pred = {"positive": gradient_blends[i][0], "anxiety": gradient_blends[i][1], "anger": gradient_blends[i][2],
            "sad": gradient_blends[i][3], "affiliation": gradient_blends[i][4]}
            // run getGradientImage with each pred
            img_src = getGradientImage(pred);
            // TO DO - have to ensure there are no duplicates!
            image_names.push(img_src);
        }

    return(image_names)
    }

    function getGradientImage(pred){
        $.ajax({
            url: "/GradientArt",
            type: 'POST',
            data: JSON.stringify (pred),
            contentType: "application/json",
            dataType: 'json',
            success:function( data ){
                //this should be the image name
                var res = dataTosplit.split(";");
                var data = res[0];
                var features = res[1];
            }
        })
    return data;
    }

/*
3b. print file names and affect vectors
*/

//Print data + features


/*
4a. Build Function to move gradient images across screen
4b. set up "more like this" buttons to move between anchor images
*/

/*
BELOW CODE IS FOR STEPS 4A AND 4B


  var dataTosplit = data;
            var res = dataTosplit.split(";");
            var data = res[0];
            var features = res[1];
            console.log("new data is" + data)
            console.log("new features is" + features)

            $('#AffectBlend2').append("new data is " + data + " ")
            $('#AffectBlend2').append("new features is" + features)


            $('#myInnerDiv').empty();
            var img = document.createElement("img");
            img.src = "/static/imgs/images/" + data;

            if ((img.src == $('#anchor1img').prop('src')) || (img.src == $('#anchor2img').prop('src'))){
                console.log('same image');
                return;
            }


            img.id = "targetimg";
            $('#myInnerDiv').append(img);

*/




function move_img(str){
    var step=63; // change this to different step value

    if (str == "left"){
    var y=document.getElementById('myInnerDiv').offsetLeft;
    y= y - step;
    document.getElementById('myInnerDiv').style.left= y + "px";
    }
    else if (str == "right"){
    var y=document.getElementById('myInnerDiv').offsetLeft;
    y= y + step;
    document.getElementById('myInnerDiv').style.left= y + "px";
}
}



var a=.5;

    $('#anchor1but').click(function(){
        if (a >= .1){
            newTargetImage(a);

            if ($('#myInnerDiv').is(':empty') ){
                newTargetImage(a);
            }

            move_img('left');

            a = a - .1;
            console.log("a is", a);
            $('#AffectBlend2').append("a is " + a + "<br> ")

        }
    });


    $('#anchor2but').click(function(){
        if (a < .99){
            newTargetImage(a);
            move_img('right');


        if ($('#myInnerDiv').is(':empty') ){
            newTargetImage(a);
        }

            a = a + .1;
            console.log("a is", a);
            $('#AffectBlend2').append("a is " + a + "<br> ")

        }

    });
})