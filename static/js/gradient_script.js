
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


    //Takes a divID, and puts a random image in that div
    function getBeginningImage(divID){

        filePaths = readCSVToArray(csvFile);

        var randomNumber = Math.floor(Math.random() * filePaths.length);
        randomImage = filePaths[randomNumber];
        console.log("randomImage is", randomImage);


        if (divID == "#target"){
            $(divID).empty();
            myImage = document.createElement('img');
            myImage.src = '../imgs/images/' + randomImage;
            var divName = divID.replace("#","");
            myImage.setAttribute('id', divName+ 'img');

            $(divID).append(myImage);
        }
        else{
            var butName = divID + 'but';
            $(butName).empty();
            var x = document.createElement('img');
            //var x = document.createElement("INPUT");
            //x.setAttribute("type", "image");
            x.src = '../imgs/images/' + randomImage;

            var divName = divID.replace("#","");
            x.setAttribute('id', divName+ 'img');

            $(butName).prepend(x);
            //console.log("please has been inputted");
            //$(divID).append(x);

            for (i=0; i < liwc_filePaths.length; i++){
                if (liwc_filePaths[i][0] == randomImage){
                //if (('../imgs/images/' + liwc_filePaths[i][0]) == $('#anchor2img').attr('src')){
                    var affVec = liwc_filePaths[i].slice(1, 6);
                    console.log(randomImage + affVec);
                };
            };
        }
    return affVec;
    };

    getBeginningImage('#target');
    var anchor1img_affVec = getBeginningImage('#anchor1');
    var anchor2img_affVec = getBeginningImage('#anchor2');

    $('#mbutton1').click(function(){
        getBeginningImage('#anchor1');
        $('#target').css('margin-right', "");
        $('#target').css('margin-left', "");
        marginR = 0;
        marginL = 0;

    });

    $('#mbutton2').click(function(){
        getBeginningImage('#anchor2');
        $('#target').css('margin-right', "");
        $('#target').css('margin-left', "");
        marginR = 0;
        marginL = 0;
    });

//subtract one array from another, and divide by 10, add to each step
//run lookup function and return closest image

/*
For C0, C1 either the affect vector or the position vector of the anchor images

where a is [.1,.2,.3,.4,.5,.6,.7,.8,.9]
C = (1-a)C0 + (a)C1

C1 = right
C0 = left
*/

    function getVectorStep(a){
        //var a = [.1,.2,.3,.4,.5,.6,.7,.8,.9]
        var c0 = anchor1img_affVec;
        var c1 = anchor2img_affVec;

        var c0_num = [];
        var c1_num = [];

        var c0plusc1 = [];

    //c0, image on left
        for(var i=0; i<5; i++) {
            imgInt = parseInt(c0[i]);
            imgInt *= (1-a);
            c0_num.push( imgInt );
        }
        console.log('c0num', c0_num);


    //c1, image on right
        for(var i=0; i<5; i++) {
            imgInt = parseInt(c1[i]);
            imgInt *= a;
            c1_num.push( imgInt );
        }
        console.log('c1num', c1_num);

    // the first step will be c0_num + c1_num,
        for(var i=0; i<5; i++) {
            imgInt = c0_num[i] + c1_num[i];
            c0plusc1.push(imgInt);

        }


    var pred = {"positive": c0plusc1[0],
    "anxiety": c0plusc1[1],
    "anger": c0plusc1[2],
    "sad": c0plusc1[3],
    "affiliation": c0plusc1[4]}

    console.log("pred is", pred);
    return pred

    }

    function newTargetImage(a){
        pred = getVectorStep(a);
        $.ajax({
        url: "/GradientArt",
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

            $('#target').empty();
            var img = document.createElement("img");
            img.src = "/static/imgs/images/" + data;
            img.id = "targetimg";
            $('#target').append(img);

        }
    })
}


var a=.4;
    $('#anchor1but').click(function(){
        newTargetImage(a);
        $('#target').css('margin-right', "" + marginR + 70 + "px");
        $('#target').css('margin-left', "" + marginL - 70 + "px");

        marginR = marginR + 2;
        console.log("marginR is", marginR);
        a = a - .1;
        console.log("a is", a);

    });


    $('#anchor2but').click(function(){
        newTargetImage(a);
        $('#target').css('margin-left', "" + marginL + 70 + "px");
        $('#target').css('margin-right', "" + marginR - 70 + "px");

        marginL = marginL + 2;
        console.log("margin is", marginL);
        a = a + .1;
        console.log("a is", a);
    });
})