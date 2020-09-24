
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


        if (divID == "#target"){
            $(divID).empty();
            myInnerDiv = document.createElement('div');
            myInnerDiv.setAttribute('id', 'myInnerDiv');

            myImage = document.createElement('img');
            myImage.src = '../imgs/images/' + randomImage;
            var divName = divID.replace("#","");
            myImage.setAttribute('id', divName+ 'img');

            $(myInnerDiv).append(myImage);
            $(divID).append(myInnerDiv);
        }
        else {
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
        }
        return affVec;
    };

    getBeginningImage('#target');
    var anchor1img_affVec = getBeginningImage('#anchor1');
    var anchor2img_affVec = getBeginningImage('#anchor2');


    //NEW CODE TO DISPLAY AFFECT VECTORS
    newDiv1 = document.createElement("div1");
    newDiv1.setAttribute('id', 'newDiv1');

    


    $('#mbutton1').click(function(){
        getBeginningImage('#anchor1');
        getBeginningImage('#target');


    });

    $('#mbutton2').click(function(){
        getBeginningImage('#anchor2');
        getBeginningImage('#target');

    });


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

        for(var i=0; i<5; i++) {
            imgInt = (c0_num[i] + c1_num[i]);
            c0plusc1.push(imgInt);

        }


    var pred = {"positive": c0plusc1[0],
    "anxiety": c0plusc1[1],
    "anger": c0plusc1[2],
    "sad": c0plusc1[3],
    "affiliation": c0plusc1[4]}

    console.log("pred is", pred);



    $('#AffectBlend2').append("affect blend is " + c0plusc1 + "<br> ")


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




        }
    })
}







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