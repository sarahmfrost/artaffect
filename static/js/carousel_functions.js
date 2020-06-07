// carousel_functions.js
//https://codepen.io/jeffreypoland/pen/zfjrB

//get images list
//get list of selected art features

//order by anger column, lowest to highest
//want the B column

/*    $.get('../data/images.csv', function(data) {
      //var build = '<table border="1" cellpadding="2" cellspacing="0" style="border-collapse: collapse" width="100%">\n';
      var images = [];
      var rows = data.split("\r");
      rows.forEach( function getvalues(thisRow) {
        //var columns = thisRow.split(",");
        images.push(thisRow);
        /*images.push(columns[2]);*/
  /*      for(var i=0;i<columns.length;i++){
          images.push(rows[2]);
        }*/
        //return(images);

    //console.log(images);



//could use promises, using async and owait


/*posemo: madonna-litta-madonna-and-the-child(1).jpg, a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg, the-madonna-in-the-church-1439.jpg,
madame-jeanne-desbassayns-de-richemont-and-her-son-eug-ne.jpg
portrait-of-e-n-khruschova-and-princess-e-n-khovanskaya-1773.jpg
benjamin-and-eleanor-ridgley-laming-1788.jpg
six-red-flowers-october-28-1999-1999.jpg
*/

/*anx: stormy-seashore-with-ruined-temple-shipwreck-and-figures-1747.jpg
john-philip-kemble-1757-1823-as-richard-in-richard-iii-by-william-shakespeare-1788.jpg
the-shipwreck.jpg
m-quina-de-coser-electro-sexual-1934.jpg
thunderstorm-with-the-death-of-amelia-1784.jpg
et-in-arcadia-ego-1622.jpg
*/

/*
sad: boy-with-a-dead-goldfinch-1829.jpg
the-dead-christ-1478.jpg
anachor-te-endormi-1751.jpg
the-death-of-st-bonaventura-1629.jpg
1.jpg
death-in-the-sickroom-1893.jpg
not_detected_235865.jpg
*/

/* aff: the-lovers-1974.jpg
rendez-vous-of-lovers-1902.jpg
atocha-1964.jpg
girl-with-cat-ii-1912.jpg
madonna-litta-1490.jpg
in-bed-the-kiss-1892.jpg
the-kiss-1976.jpg
quentin-metsys-madonna-col-bambino-1510-25-ca-01.JPG
*/



$(window).load(function() {

/*    $.get('../data/images.csv', function(data) {
      //var build = '<table border="1" cellpadding="2" cellspacing="0" style="border-collapse: collapse" width="100%">\n';
      var images = [];
      var rows = data.split("\r");
      rows.forEach( function getvalues(thisRow) {
        //var columns = thisRow.split(",");
        images.push(thisRow);
       for(var i=0;i<columns.length;i++){
          images.push(rows[2]);
        }
        return(images);
     });
    console.log(images);
    return(images);
    });

    setTimeout(() => {  setAngerCarousel(images); }, 10000);*/


  function setAngerCarousel(){
    images = ['the-man-from-bantul-the-final-round-2000.jpg', 'samson-tearing-the-lion-s-mouth-1.jpg', "beggars-fighting-1634.jpg", "cossack-fighting-off-a-tiger-1811.jpg", "the-virgin-spanking-the-christ-child-before-three-witnesses-andre-breton-paul-eluard-and-the-1926.jpg", "the-bitter-drunk.jpg", "st-george-and-the-dragon-1.jpg", "red-field-1972.jpg", "a-fight.jpg"];
    for (i=0; i<images.length; i++){
      casing = document.createElement('div');
      casing.setAttribute('class', 'item');
      image = document.createElement('img');
      image.src = '../imgs/images/' + images[i];
      image.height = "600";
      image.title = images[i];
      carousel = document.getElementsByClassName('carousel')[0];
      casing.appendChild(image);
      carousel.appendChild(casing);

/*    var x = document.getElementsByClassName("carousel").length;
    console.log(x);*/



    }
  }



  function setPosemoCarousel(){
    images2 = ["madonna-litta-madonna-and-the-child(1).jpg", "a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg", "the-madonna-in-the-church-1439.jpg", "madame-jeanne-desbassayns-de-richemont-and-her-son-eug-ne.jpg", "portrait-of-e-n-khruschova-and-princess-e-n-khovanskaya-1773.jpg"];
    console.log(images2);
    for (i=0; i<images2.length; i++){
      casing2 = document.createElement('div');
      casing2.setAttribute('class', 'item');
      image2 = document.createElement('img');
      image2.src = '../imgs/images/' + images2[i];
      image2.height = "600";
      image2.title = images2[i];
      carousel2 = document.getElementsByClassName('carousel')[1];
      //carousel2 = document.getElementById('tryThis');
      casing2.appendChild(image2);
      carousel2.appendChild(casing2);
    }
  }



  setAngerCarousel();
  setPosemoCarousel();


  function init() {
    var length = $('.carousel div').length / 2;
    var min = $('.carousel div').length;

    //Rule Carousel must have 5 images at a minimum
    if (min <= 4) {
      alert('Sorry. You must have 5 images at a minimum');
    } else {


      //find the first img and assign it to active
      $('.carousel').find('div').first().addClass('ic_active');
      $('.carousel').find('div').first().find('img').addClass('mainimg');

      //Divide Imgs in half and take the second half and move them to top of stack for wrap effect
      var getHalf = Math.ceil(length);
      var wrapImgs = $('.carousel').find('div').slice(getHalf, min);
      $('.carousel').prepend(wrapImgs);
      infinite();
    }
  }//end init
  init();


  function infinite() {
    //Center first image
    var active = $('.ic_active');
    initActive(active);

    $('.ic_active').next().addClass('next');
    $('.ic_active').prev().addClass('prev');

    //Get title
    var title = $('.ic_active').find('img').attr('title');
    //Add title
    $('.ic_title').append('<p>' + title + '</p>');

    function clickMe() {
      //prevent multiple clicks on the same img
      var clicked = $(this);
      clicked.unbind('click');

      if(clicked.hasClass('back_btn')){

        var bkbtn = clicked.parent().find('.carousel').find('.prev');
        clicked = bkbtn;


      }else if (clicked.hasClass('next_btn')){

        var nxbtn = $(this).parent().find('.carousel').find('.next');
        clicked = nxbtn;
      }

      var state;
      var parentMarginLeftCalculation;
      var animationCalculation;

      // Checking for what was clicked and assigning state a value
      if (clicked.hasClass('next')) {
        state = 'next';
      } else if (clicked.hasClass('prev')) {
        state = 'prev';
      }else{
        return;
      }

       //Sets new active img
      toggle(clicked);
      //Grab position, widths of necessary elements, and title
      elementInfo(clicked);

       // Checking for what was clicked for moving first/last img
      if (state === 'next') {
        clicked.parent().append('<div class="item">' + firstImg + '</div>');
        clicked.parent().find('div.item').first().remove();
      } else {
        clicked.parent().prepend('<div class="item">' + lastImg + '</div>');
        clicked.parent().find('div.item').last().remove();
      }

      var parentWidth = clicked.parent().parent().width() / 2;
      var value = (parentWidth - activeImgPositionLeft) - halfOfActiveImgWidth;

     // Calculations to move images forward or backward
      if (state === 'next') {

        parentMarginLeftCalculation = value + firstImgWidth + prevImgWidth;
        animationCalculation = parentMarginLeftCalculation - prevImgWidth;
      } else if (state === 'prev'){
        parentMarginLeftCalculation = value - lastImgWidth - nextImgWidth;
        animationCalculation = parentMarginLeftCalculation + nextImgWidth;
      }

      // Setting Margin Left based on calculations
      clicked.parent().css('margin-left', '' + parentMarginLeftCalculation + 'px');

      // Animating Margin Left
      clicked.parent().animate({
        marginLeft: '' + animationCalculation + ''
      }, 1000, function() {
        $('.next').unbind('click').click(clickMe);
        $('.prev').unbind('click').click(clickMe);
        $('.back_btn').unbind('click').click(clickMe);
        $('.next_btn').unbind('click').click(clickMe);
      });
    }//end clickMe

    //getting position, width, title and contents of the first and last img
    function elementInfo(myThis) {
      activeImgPositionLeft = myThis.position().left;
      halfOfActiveImgWidth = myThis.width() / 2;
      prevImgWidth = myThis.prev().width();
      nextImgWidth = myThis.next().width();
      title = myThis.find('img').attr('title');
      myThis.parent().next().find('p').html(title);
      firstImgWidth = myThis.parent().find('div.item').first().width();
      lastImgWidth = myThis.parent().find('div.item').last().width();
      firstImg = myThis.parent().find('div.item').first().html();
      lastImg = myThis.parent().find('div.item').last().html();
    }//end elementInfo

    // adding and removing appropriate classes
    function toggle(myThis) {
      myThis.parent().find('img').removeClass('mainimg');
      myThis.parent().find('div').removeClass('ic_active');
      myThis.parent().find('div').removeClass('next');
      myThis.parent().find('div').removeClass('prev');
      myThis.find('img').addClass('mainimg');
      myThis.addClass('ic_active');
      myThis.next().addClass('next');
      myThis.prev().addClass('prev');
    }//end toggle

    $('.next').click(clickMe);
    $('.prev').click(clickMe);
    $('.back_btn').click(clickMe);
    $('.next_btn').click(clickMe);

  }//end infinite


  //keeps active img centered on load and for window.resize function
  function initActive(myActive){

  p = myActive.position().left;
  w = myActive.width() / 2;
  pw = myActive.parent().parent().width() / 2;
  val = (pw - p) - w;
  myActive.parent().css('margin-left', '' + val + 'px');

  }//end initActive

 $(window).resize(function() {

  var active = $('.ic_active');
  initActive(active);

  });//end window.resize

});//end window.load
