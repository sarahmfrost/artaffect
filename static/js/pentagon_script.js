/*var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

    var numberOfSides = 5;
    var radius=100;
    var x = 125;
    var y = 125;
    var angle = 2*Math.PI/numberOfSides;

    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(radius, 0);
    for (var i=1; i<=numberOfSides; i++) {
       ctx.lineTo(radius*Math.cos(i * angle), radius*Math.sin(i * angle));
    }
    ctx.stroke();*/

//https://stackoverflow.com/questions/36529781/how-to-draw-a-simple-pentagon-in-canvas

function myClick(){
    console.log("click");
}


$(function(){
   var canvas=document.getElementById("myCanvas");
   var cxt=canvas.getContext("2d");
   cxt.translate(0.5, 0.5);

    // hexagon
    var numberOfSides = 5,
        size = 60,
        Xcenter = 90,
        Ycenter = 80,
        step  = 2 * Math.PI / numberOfSides,//Precalculate step value
        shift = (Math.PI / 180.0) * -18;//Quick fix ;)

    cxt.beginPath();
    //cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

    for (var i = 0; i <= numberOfSides;i++) {
        var curStep = i * step + shift;
        cxt.lineTo (Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
    }

    cxt.strokeStyle = "#000000";
    cxt.lineWidth = 1.5;
    cxt.stroke();
  });


var AffectDict = {
'transnonain-street-1834.jpg':[10.42, 31.25, 6.25, 25, 0],
'triptych-of-st-sebastian-1464.jpg': [46.3, 14.81, 1.85, 14.81, 2.13],
'adam-and-eve-banished-from-paradise.jpg': [5.29, 37.5, 4.33, 43.75, 0.49],
};


filePaths = ['transnonain-street-1834.jpg','triptych-of-st-sebastian-1464.jpg', 'adam-and-eve-banished-from-paradise.jpg' ];


    /* ["madonna-litta-madonna-and-the-child.jpg",
    "a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg"
   "the-madonna-in-the-church-1439.jpg",
    "madame-jeanne-desbassayns-de-richemont-and-her-son-eug-ne.jpg",
    "portrait-of-e-n-khruschova-and-princess-e-n-khovanskaya-1773.jpg",
    "benjamin-and-eleanor-ridgley-laming-1788.jpg",
    "six-red-flowers-october-28-1999-1999.jpg", 'stormy-seashore-with-ruined-temple-shipwreck-and-figures-1747.jpg',
    'john-philip-kemble-1757-1823-as-richard-in-richard-iii-by-william-shakespeare-1788.jpg',
    'the-shipwreck.jpg',
    'm-quina-de-coser-electro-sexual-1934.jpg',
    'thunderstorm-with-the-death-of-amelia-1784.jpg',
    'et-in-arcadia-ego-1622.jpg', 'boy-with-a-dead-goldfinch-1829.jpg',
    'the-dead-christ-1478.jpg',
    'anachor-te-endormi-1751.jpg',
    'the-death-of-st-bonaventura-1629.jpg',
    '1.jpg', 'death-in-the-sickroom-1893.jpg',
    'not_detected_235865.jpg'];*/


function getBeginningImage(filePaths){

    var randomNumber = Math.floor(Math.random() * filePaths.length); // removed plus one
    randomImage = filePaths[randomNumber];

    //casing = document.createElement('div');
        //casing2.setAttribute('class', 'item');

    myImage = document.createElement('img');
    myImage.src = '../imgs/images/' + randomImage;
    myImage.height = "300";
    myImage.setAttribute('id', 'targetImg');
    //$('#targetImg').append(myImage)

    //image2.title = images2[i];
    //carousel2 = document.getElementsByClassName('carousel')[1];

    $('.myPentagon').append(myImage);

    return randomImage
    }

getBeginningImage(filePaths);

//gotta get the current image values
//add value

console.log("randomImage numb is", AffectDict[randomImage]);

$('#affectValues').html('The affect values are ' + AffectDict[randomImage] + '');

//for each button, on click, set a value

//then call the main.py with the function


function saveAffects(randomImage){


var pos = AffectDict[randomImage][0];
var anx = AffectDict[randomImage][1];
var ang =AffectDict[randomImage][2];
var sad = AffectDict[randomImage][3];
var aff = AffectDict[randomImage][4];

console.log('var aff is', aff);
console.log(typeof(aff));

$('#mbutton1').click(function(){
    pos += 3;
    console.log(pos);
});

$('#mbutton2').click(function(){
    anx += 3;
    console.log(anx);
});

$('#mbutton3').click(function(){
    ang += 3;
    console.log(ang);
});

$('#mbutton4').click(function(){
    sad += 3;
    console.log(sad);
});

$('#mbutton5').click(function(){
    aff += 3;
    console.log(aff);
});



var pred = {"positive": pos,
  "anxiety": anx,
  "anger": ang,
  "sad": sad,
  "affiliation": aff};

console.log("pred is", pred);
return pred
}


//getButtons(randomImage);

//'#mbutton1,#mbutton2,#mbutton3,#mbutton4,#mbutton5'


$(document).ready(function()
{

    $( '#randomButton' ).click(function() {
        console.log('starting submit')
        pred = saveAffects(randomImage)
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
            //console.log("data is" + data)
            var img = document.createElement("img");
            img.src = "../imgs/images/" + data;
            img.id = "picture";
            img.height = "300";
            // take image width or height, constrain larger to 600 px
/*            if (img.width > img.height){
                img.width = "600";
            }
            else {
                img.height = "600";
            }*/

      /*      var foo = document.getElementById("resultDiv");
            foo.appendChild(img);
            console.log("img src is" + img.src)

        $('#PaintingName').html("result image is " + data)
        $('#artFeatures').html("features of selected art are: " + features)
        $('#sliderValues').html("slider values are: " + JSON.stringify (pred))*/

        }
    })
})
})






/*
function getRandomNinePaths(filePaths)
{
    var randomNumber = [];
    var randomFilePaths = [];

    for (var i=0; i<5; i++)
        randomNumber.push(Math.floor(Math.random() * filePaths.length)) // removed plus one

    $.each(randomNumber, function(index, value){
        randomFilePaths.push(filePaths[value]);
    });
    console.log(randomFilePaths);

    return randomFilePaths;
}


function drawPaintings(paintings)
{

      for (i=1; i<=paintings.length; i++){
        console.log("paintings length is" + paintings.length)
        console.log(paintings[i])
        //casing = document.createElement('div');
        //casing2.setAttribute('class', 'item');
        image = document.createElement('img');
        image.src = '../imgs/images/' + paintings[i];
        //image.height = "500";
        //image2.title = images2[i];
        //carousel2 = document.getElementsByClassName('carousel')[1];
        console.log("i is", i);
        carousel2 = document.getElementById('mbutton' + i);
        //casing.appendChild(image);
        carousel2.appendChild(image);
    }
  }

/*function getRandomPaintingsAndDraw()
{
   randomNineFilePaths = getRandomNinePaths(filePaths)
   drawPaintings(randomNineFilePaths);
}*/

//getRandomPaintingsAndDraw();
/*

$('#randomButton').click(function(){
    console.log('clicked');
    selectedPaintings = [];
    getRandomPaintingsAndDraw();
});
*/
