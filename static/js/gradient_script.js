
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
        var anchorImages = ['the-man-from-bantul-the-final-round-2000.jpg',
        'samson-tearing-the-lion-s-mouth-1.jpg',
        "beggars-fighting-1634.jpg",
        "cossack-fighting-off-a-tiger-1811.jpg",
        "the-virgin-spanking-the-christ-child-before-three-witnesses-andre-breton-paul-eluard-and-the-1926.jpg",
        "the-bitter-drunk.jpg", "st-george-and-the-dragon-1.jpg",
        "red-field-1972.jpg", "a-fight.jpg", "the-battle-of-culloden-1746.jpg",
        "rape-of-tamar-1640.jpg", "komposition-1984.jpg", 'hercules-fighting-with-the-lernaean-hydra-1634.jpg',
        'the-family-1909.jpg', 'venus-punishing-profane-love-1595.jpg',"madonna-litta-madonna-and-the-child.jpg",
        "a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg",
        "the-madonna-in-the-church-1439.jpg",
        "madame-jeanne-desbassayns-de-richemont-and-her-son-eug-ne.jpg",
        "portrait-of-e-n-khruschova-and-princess-e-n-khovanskaya-1773.jpg",
        "benjamin-and-eleanor-ridgley-laming-1788.jpg",
        "six-red-flowers-october-28-1999-1999.jpg", "portrait-of-familie-copley-1776.jpg",
        "africa.jpg", "chiswick-house-middlesex-1742.jpg", "hip-hip-hurrah-1888.jpg",
        "the-concert.jpg", "winston-churchill-1970.jpg", "psyche-showing-her-sisters-her-gifts-from-cupid-1753.jpg",
        "the-major-s-marriage-proposal-1851.jpg", 'stormy-seashore-with-ruined-temple-shipwreck-and-figures-1747.jpg',
        'john-philip-kemble-1757-1823-as-richard-in-richard-iii-by-william-shakespeare-1788.jpg',
        'the-shipwreck.jpg',
        'm-quina-de-coser-electro-sexual-1934.jpg',
        'thunderstorm-with-the-death-of-amelia-1784.jpg',
        'et-in-arcadia-ego-1622.jpg', "woman-verso-untitled.jpg",
        "lace-and-ghosts-1856.jpg", 'the-capture-of-troy-1639.jpg',
        'medusa-1597-1.jpg', 'the-nightmare-1781.jpg', 'procession-in-toledo.jpg',
         'rape-of-tamar-1640.jpg', 'orfeu-nos-infernos-1904.jpg',
         'horse-frightened-by-a-storm-1824(1).jpg', 'boy-with-a-dead-goldfinch-1829.jpg',
        'the-dead-christ-1478.jpg',
        'anachor-te-endormi-1751.jpg',
        'the-death-of-st-bonaventura-1629.jpg',
        '1.jpg', 'death-in-the-sickroom-1893.jpg',
        'not_detected_235865.jpg', 'despair(1).jpg',
        'prisoners-exercising-prisoners-round-1890.jpg',
        'king-lear-weeping-over-the-dead-body-of-cordelia-1788.jpg',
        'portrait-of-doctor-gachet-1890.jpg', 'malvine-dying-in-the-arms-of-fingal(1).jpg',
        'deposi-o-no-t-mulo-1521.jpg', 'the-three-shades.jpg', 'piet-1533.jpg', 'the-lovers-1974.jpg','rendez-vous-of-lovers-1902.jpg',
        'atocha-1964.jpg', 'girl-with-cat-ii-1912.jpg', 'madonna-litta-1490.jpg',
        'in-bed-the-kiss-1892.jpg', 'the-kiss-1976.jpg',
        'quentin-metsys-madonna-col-bambino-1510-25-ca-01.JPG',
        'eine-art-nebeneinander-1996.jpg', 'reconciliation-1887.jpg',
        'christian-allegory-1515.jpg', 'four-hearts-1969.jpg',
        'virgin-and-child.jpg', 'bassin-du-luxembourg-1930.jpg',
        'in-bed-1893.jpg'
        ];

        filePaths = readCSVToArray(csvFile);

        var randomNumber = Math.floor(Math.random() * filePaths.length);
        randomImage = filePaths[randomNumber];
        var randomAnchorNumber = Math.floor(Math.random() * anchorImages.length);
        randomAnchorImage = anchorImages[randomAnchorNumber];

        //var notRandom1 = 'hip-hip-hurrah-1888.jpg';
        //var notRandom2 = 'king-lear-weeping-over-the-dead-body-of-cordelia-1788.jpg';
        //console.log("randomAnchorImage is", randomAnchorImage);
        //console.log("randomImage is", randomImage);


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
            x.src = '../imgs/images/' + randomAnchorImage;

            var divName = divID.replace("#","");
            x.setAttribute('id', divName+ 'img');

            $(butName).prepend(x);

            for (i=0; i < liwc_filePaths.length; i++){
                if (liwc_filePaths[i][0] == randomAnchorImage){
                    var affVec = liwc_filePaths[i].slice(1, 6);
                    console.log(randomAnchorImage + affVec);
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

            $('#myInnerDiv').empty();
            var img = document.createElement("img");
            img.src = "/static/imgs/images/" + data;
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
            move_img('left');
            /*x= x - 50;*/
//document.getElementById('i1').style.top= x + "px";
            //$('#targetimg').css('left', x + "px")
           // $('#target').css('margin-right', "" + marginR + 99 + "px");
    /*        $('#target').css('margin-left', "" + marginL - 50 + "px");
    style="position: absolute; left: 750px; top: 100px;"
    */
/*            marginR = marginR + 1;
            console.log("marginR is", marginR);*/
                a = a - .1;
                console.log("a is", a);
            }
    });


    $('#anchor2but').click(function(){
        if (a < .99){
            newTargetImage(a);
            move_img('right');

    /*        $('#target').css('margin-left', "" + marginL + 50 + "px");
    */      //  $('#target').css('margin-right', "" + marginR - 99 + "px");

            //marginR = marginR + 1;
            //console.log("marginR is", marginR);
            a = a + .1;
            console.log("a is", a);
        }

    });
})