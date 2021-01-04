
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
/*
if (sessionStorage.getItem('value1') == null) {
    alert("Please increase size of your browser window for optimal experience");
}*/


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



function getCuratedImages(){

        curated_images = [['stormy-seashore-with-ruined-temple-shipwreck-and-figures-1747.jpg','the-lovers-1974.jpg'], ['john-philip-kemble-1757-1823-as-richard-in-richard-iii-by-william-shakespeare-1788.jpg','atocha-1964.jpg'],
['the-shipwreck.jpg', 'the-kiss-1976.jpg'], ['m-quina-de-coser-electro-sexual-1934.jpg','quentin-metsys-madonna-col-bambino-1510-25-ca-01.JPG'], ['et-in-arcadia-ego-1622.jpg','eine-art-nebeneinander-1996.jpg'],
['procession-in-toledo.jpg', 'christian-allegory-1515.jpg'], ['rape-of-tamar-1640.jpg', 'four-hearts-1969.jpg'], ['horse-frightened-by-a-storm-1824(1).jpg', 'in-bed-1893.jpg'],
['orfeu-nos-infernos-1904.jpg', 'bassin-du-luxembourg-1930.jpg'], ["madonna-litta-madonna-and-the-child.jpg", 'samson-tearing-the-lion-s-mouth-1.jpg'],
["a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg","beggars-fighting-1634.jpg"], ["the-virgin-spanking-the-christ-child-before-three-witnesses-andre-breton-paul-eluard-and-the-1926.jpg","benjamin-and-eleanor-ridgley-laming-1788.jpg"],
["psyche-showing-her-sisters-her-gifts-from-cupid-1753.jpg",'venus-punishing-profane-love-1595.jpg'], ["africa.jpg","the-battle-of-culloden-1746.jpg"],
["hip-hip-hurrah-1888.jpg", 'hercules-fighting-with-the-lernaean-hydra-1634.jpg'], ["the-major-s-marriage-proposal-1851.jpg", 'the-family-1909.jpg']];


        var randomNumber = Math.floor(Math.random() * curated_images.length);
        curatedPair = curated_images[randomNumber];
        console.log('curated pair is', curatedPair)

        $('#anchor1but').empty();
        $('#anchor2but').empty();


        leftImg = curatedPair[0];
        rightImg = curatedPair[1];

        let x1 = document.createElement('img');
        x1.src = '../imgs/images/' + leftImg;

        let x2 = document.createElement('img');
        x2.src = '../imgs/images/' + rightImg;


        x1.setAttribute('id', 'anchor1img');
        x2.setAttribute('id', 'anchor2img');


        $('#anchor1but').prepend(x1);
        $('#anchor2but').prepend(x2);


        let left_image_title = leftImg.replace(/.jpg/g, "");
        let left_image_title2 = left_image_title.replaceAll("-"," ");
        $('#anchor1but').append("<br>" + left_image_title2);


        for (i=0; i < liwc_filePaths.length; i++){
            if (liwc_filePaths[i][0] == leftImg){
                var affVec = liwc_filePaths[i].slice(1, 6);
                $('#anchor1but').append("<br>" + affVec);

            };
        };


        let right_image_title = rightImg.replace(/.jpg/g, "");
        let right_image_title2 = right_image_title.replaceAll("-"," ");
        $('#anchor2but').append("<br>" + right_image_title2);


        for (i=0; i < liwc_filePaths.length; i++){
            if (liwc_filePaths[i][0] == rightImg){
                var affVec2 = liwc_filePaths[i].slice(1, 6);
                $('#anchor2but').append("<br>" + affVec2);

            };
        };
        console.log("affvec2", affVec2);
        return [affVec, affVec2];
    };

    /*
    1. Function to get two random anchor images
    */
function getBeginningImage(divID){
        //$('#anchor1but').empty();
        //$('#anchor2but').empty();

        filePaths = readCSVToArray(csvFile);
        let randomNumber = Math.floor(Math.random() * filePaths.length);
        randomImage = filePaths[randomNumber];

        let butName = divID + 'but';
        $(butName).empty();
        let x = document.createElement('img');
        x.src = '../imgs/images/' + randomImage;

        let divName = divID.replace("#","");
        x.setAttribute('id', divName+ 'img');

        $(butName).prepend(x);



        let image_title = randomImage.replace(/.jpg/g, "");
        let image_title2 = image_title.replaceAll("-"," ");
        $(butName).append("<br>" + image_title2);


        for (i=0; i < liwc_filePaths.length; i++){
            if (liwc_filePaths[i][0] == randomImage){
                var affVec = liwc_filePaths[i].slice(1, 6);
            };
        };
        $(butName).append(" <br> Affect vector: " + affVec);
        return affVec;
    };

        /*
    2. get all gradient blends between two anchor images and save to array
    */

    function getGradientBlends(anchor1img_affVec, anchor2img_affVec){

        weight = [.8,.7,.6,.5,.4,.3,.2]
        opp_weight = [.2,.3,.4,.5,.6,.7,.8]

        //array of arrays of gradient blends
        gradient_blends = []
        // array of affects for one gradient blend
        gradient_blend = []

        for(let i=0; i<weight.length; i++){
            for (let k=0; k<7; k++){
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

/*
    3. run lookup function for all gradient blends, ensure there are no duplicates,
    save file names to another array
    */

    //array of predictions for lookup function
    pred_array = []

    function getGradientImages(gradient_blends){
        pred_array = [];
        for(let i=0; i<gradient_blends.length; i++){
            let pred = {"positive": Number(gradient_blends[i][0]), "anxiety": Number(gradient_blends[i][1]), "anger": Number(gradient_blends[i][2]),
            "sad": Number(gradient_blends[i][3]), "affiliation": Number(gradient_blends[i][4])}
            pred_array.push(pred);
            pred = {};
        }

        image_values = []

        let pred_array_string = JSON.stringify(pred_array);

        //$('#gradients').text("Gradient arrays are \n" +pred_array_string)

        let promises = pred_array.map(getGradientImage)

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

    /*
    4a. Build slider to show/hide gradient images
    */

    function showImages(image_array) {
        console.log(image_array);
        $('#target0, #target1, #target2, #target3, #target4, #target5, #target6').empty();
        console.log(image_array);

        for (let i=0; i<image_array.length; i++){  //change to the last 7 items
            console.log(image_array.length);
            let res = image_array[i].split(";");
            let data = res[0];
            let emotion = res[1];
            //console.log("data is", data);

            let img = document.createElement("img");
            img.width = "200";
            img.src = "/static/imgs/images/" + data;
            //console.log(img.src);

            let image_title = data.replace(/.jpg/g, "");
            let image_title2 = image_title.replaceAll("-"," ");


            $('#target' + i + "").append(img).css("visibility", "hidden");
            $('#target' + i + "").append("<br>" + image_title2 + "<br>" + emotion).css("visibility", "hidden");


        }
        //start with all the images hidden, except the middle
       $('#target3').css("visibility", "visible");
    }


    $( '#sliderValue' ).mouseup(function(){
        $('#target0, #target1, #target2, #target3, #target4, #target5, #target6').css("visibility", "hidden");
        let slider = document.getElementById("sliderValue");

        if (slider.value == 0){
            $("#target0").css("visibility", "visible");
            //$("#targetImageName").html(img.src);

        }
        if (slider.value == 10){ $("#target1").css("visibility", "visible");}
        if (slider.value == 20){ $("#target2").css("visibility", "visible");}
        if (slider.value == 30){ $("#target3").css("visibility", "visible");}
        if (slider.value == 40){ $("#target4").css("visibility", "visible");}
        if (slider.value == 50){ $("#target5").css("visibility", "visible");}
        if (slider.value == 60){ $("#target6").css("visibility", "visible");}

    })


$(document).ready(function() {

    let names = getCuratedImages();

    let twoanchor1img_affVec = names[0], twoanchor2img_affVec = names[1];


    gradient_blends = getGradientBlends(twoanchor1img_affVec, twoanchor2img_affVec);


    getGradientImages(gradient_blends)
    .then(result => {showImages(result)})

    /*
    4b. set up "refresh random anchors" and "curated anchors" buttons
    */

    $('#new_anchors').click(function(){


/*        sessionStorage.setItem("value1", "1");*/
        let anchor1img_affVec = getBeginningImage('#anchor1');
        let anchor2img_affVec = getBeginningImage('#anchor2');

        gradient_blends = getGradientBlends(anchor1img_affVec, anchor2img_affVec);

        getGradientImages(gradient_blends)
        .then(result => {showImages(result)})
    });

    $('#new_curated_anchors').click(function(){

        let names = getCuratedImages();

        let twoanchor1img_affVec = names[0], twoanchor2img_affVec = names[1];


        gradient_blends = getGradientBlends(twoanchor1img_affVec, twoanchor2img_affVec);


        getGradientImages(gradient_blends)
        .then(result => {showImages(result)})

    });

})

