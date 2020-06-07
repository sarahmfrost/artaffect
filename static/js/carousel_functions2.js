// carousel_functions2.js
//https://kenwheeler.github.io/slick/

/*mad images = ['the-man-from-bantul-the-final-round-2000.jpg',
 'samson-tearing-the-lion-s-mouth-1.jpg',
 "beggars-fighting-1634.jpg",
 "cossack-fighting-off-a-tiger-1811.jpg",
 "the-virgin-spanking-the-christ-child-before-three-witnesses-andre-breton-paul-eluard-and-the-1926.jpg",
 "the-bitter-drunk.jpg", "st-george-and-the-dragon-1.jpg",
 "red-field-1972.jpg", "a-fight.jpg"];
*/





  function setPosemoCarousel(){
    images = ["madonna-litta-madonna-and-the-child.jpg",
    "a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg",
    "the-madonna-in-the-church-1439.jpg",
    "madame-jeanne-desbassayns-de-richemont-and-her-son-eug-ne.jpg",
    "portrait-of-e-n-khruschova-and-princess-e-n-khovanskaya-1773.jpg",
    "benjamin-and-eleanor-ridgley-laming-1788.jpg",
    "six-red-flowers-october-28-1999-1999.jpg"];
    console.log(images);
    for (i=0; i<images.length; i++){
      casing = document.createElement('div');
      //casing2.setAttribute('class', 'item');
      image = document.createElement('img');
      image.src = '../imgs/images/' + images[i];
      //image2.height = "600";
      //image2.title = images2[i];
      carousel2 = document.getElementsByClassName('carousel')[1];
      //carousel2 = document.getElementById('tryThis');
      casing.appendChild(image);
      carousel2.appendChild(casing);
    }
  }

  function setAnxietyCarousel(){
    images = ['stormy-seashore-with-ruined-temple-shipwreck-and-figures-1747.jpg',
    'john-philip-kemble-1757-1823-as-richard-in-richard-iii-by-william-shakespeare-1788.jpg',
    'the-shipwreck.jpg',
    'm-quina-de-coser-electro-sexual-1934.jpg',
    'thunderstorm-with-the-death-of-amelia-1784.jpg',
    'et-in-arcadia-ego-1622.jpg'];
    console.log(images);
    for (i=0; i<images.length; i++){
      casing = document.createElement('div');
      //casing2.setAttribute('class', 'item');
      image = document.createElement('img');
      image.src = '../imgs/images/' + images[i];
      //image2.height = "600";
      //image2.title = images2[i];
      carousel3 = document.getElementsByClassName('carousel')[2];
      //carousel2 = document.getElementById('tryThis');
      casing.appendChild(image);
      carousel3.appendChild(casing);
    }
  }

  function setSadCarousel(){
    images = ['boy-with-a-dead-goldfinch-1829.jpg',
    'the-dead-christ-1478.jpg',
    'anachor-te-endormi-1751.jpg',
    'the-death-of-st-bonaventura-1629.jpg',
    '1.jpg', 'death-in-the-sickroom-1893.jpg',
    'not_detected_235865.jpg'];
    console.log(images);
    for (i=0; i<images.length; i++){
      casing = document.createElement('div');
      //casing2.setAttribute('class', 'item');
      image = document.createElement('img');
      image.src = '../imgs/images/' + images[i];
      //image2.height = "600";
      //image2.title = images2[i];
      carousel4 = document.getElementsByClassName('carousel')[3];
      //carousel2 = document.getElementById('tryThis');
      casing.appendChild(image);
      carousel4.appendChild(casing);
    }
  }

  function setAffiliationCarousel(){
    images = ['the-lovers-1974.jpg','rendez-vous-of-lovers-1902.jpg',
    'atocha-1964.jpg', 'girl-with-cat-ii-1912.jpg', 'madonna-litta-1490.jpg',
    'in-bed-the-kiss-1892.jpg', 'the-kiss-1976.jpg',
    'quentin-metsys-madonna-col-bambino-1510-25-ca-01.JPG'];
    console.log(images);
    for (i=0; i<images.length; i++){
      casing = document.createElement('div');
      //casing2.setAttribute('class', 'item');
      image = document.createElement('img');
      image.src = '../imgs/images/' + images[i];
      //image2.height = "600";
      //image2.title = images2[i];
      carousel5 = document.getElementsByClassName('carousel')[4];
      //carousel2 = document.getElementById('tryThis');
      casing.appendChild(image);
      carousel5.appendChild(casing);
    }
  }


$(document).ready(function(){
  setPosemoCarousel();
  setAnxietyCarousel();
  setSadCarousel();
  setAffiliationCarousel();
  $('.carousel').slick({
  slidesToShow: 3,
  //dots:true,
  centerMode: true,
  variableWidth: true
  });
});
