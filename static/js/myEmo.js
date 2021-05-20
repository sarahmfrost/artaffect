

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

