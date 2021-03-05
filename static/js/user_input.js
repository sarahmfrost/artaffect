/*function getFileName() {
    $.ajax({
        url: "/GetUserImage",
        type: 'GET',
       data: JSON.stringify(pred),
      contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    })
}
getFileName();*/


function getNewFile(){
    document.getElementById("resultDiv").innerHTML = "";
    var img = document.createElement("img");

    img src="/static/imgs/user_uploads/userImage.jpg";
}


getNewFile();