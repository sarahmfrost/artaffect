// carousel_functions2.js
//carousel design from: https://kenwheeler.github.io/slick/


function setAngerCarousel(){
  images = ['the-man-from-bantul-the-final-round-2000.jpg',
  'samson-tearing-the-lion-s-mouth-1.jpg',
  "beggars-fighting-1634.jpg",
  "cossack-fighting-off-a-tiger-1811.jpg",
  "the-virgin-spanking-the-christ-child-before-three-witnesses-andre-breton-paul-eluard-and-the-1926.jpg",
  "the-bitter-drunk.jpg", "st-george-and-the-dragon-1.jpg",
  "red-field-1972.jpg", "a-fight.jpg", "the-battle-of-culloden-1746.jpg",
  "rape-of-tamar-1640.jpg", "komposition-1984.jpg", 'hercules-fighting-with-the-lernaean-hydra-1634.jpg',
  'the-family-1909.jpg', 'venus-punishing-profane-love-1595.jpg'
];

  console.log(images);
  for (i=0; i<images.length; i++){
    casing = document.createElement('div');
    image = document.createElement('img');
    image.src = '../imgs/images/' + images[i];
    carousel1 = document.getElementsByClassName('carousel')[0];
    casing.appendChild(image);
    carousel1.appendChild(casing);
  }
}


function setPosemoCarousel(){
  images = ["madonna-litta-madonna-and-the-child.jpg",
  "a-winter-s-tale-act-iv-scene-3-the-shepherd-s-cot-1787.jpg",
  "the-madonna-in-the-church-1439.jpg",
  "madame-jeanne-desbassayns-de-richemont-and-her-son-eug-ne.jpg",
  "portrait-of-e-n-khruschova-and-princess-e-n-khovanskaya-1773.jpg",
  "benjamin-and-eleanor-ridgley-laming-1788.jpg",
  "six-red-flowers-october-28-1999-1999.jpg", "portrait-of-familie-copley-1776.jpg",
  "africa.jpg", "chiswick-house-middlesex-1742.jpg", "hip-hip-hurrah-1888.jpg",
  "the-concert.jpg", "winston-churchill-1970.jpg", "psyche-showing-her-sisters-her-gifts-from-cupid-1753.jpg",
  "the-major-s-marriage-proposal-1851.jpg"
  ];

  console.log(images);
  for (i=0; i<images.length; i++){
    casing = document.createElement('div');
    image = document.createElement('img');
    image.src = '../imgs/images/' + images[i];
    carousel2 = document.getElementsByClassName('carousel')[1];
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
  'et-in-arcadia-ego-1622.jpg', "woman-verso-untitled.jpg",
  "lace-and-ghosts-1856.jpg", 'the-capture-of-troy-1639.jpg',
  'medusa-1597-1.jpg', 'the-nightmare-1781.jpg', 'procession-in-toledo.jpg',
   'rape-of-tamar-1640.jpg', 'orfeu-nos-infernos-1904.jpg',
   'horse-frightened-by-a-storm-1824(1).jpg'
  ];

  console.log(images);
  for (i=0; i<images.length; i++){
    casing = document.createElement('div');
    image = document.createElement('img');
    image.src = '../imgs/images/' + images[i];
    carousel3 = document.getElementsByClassName('carousel')[2];
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
  'not_detected_235865.jpg', 'despair(1).jpg',
  'prisoners-exercising-prisoners-round-1890.jpg',
  'king-lear-weeping-over-the-dead-body-of-cordelia-1788.jpg',
  'portrait-of-doctor-gachet-1890.jpg', 'malvine-dying-in-the-arms-of-fingal(1).jpg',
  'deposi-o-no-t-mulo-1521.jpg', 'the-three-shades.jpg', 'piet-1533.jpg'
  ];
  console.log(images);
  for (i=0; i<images.length; i++){
    casing = document.createElement('div');
    image = document.createElement('img');
    image.src = '../imgs/images/' + images[i];
    carousel4 = document.getElementsByClassName('carousel')[3];
    casing.appendChild(image);
    carousel4.appendChild(casing);
  }
}

function setAffiliationCarousel(){
  images = ['the-lovers-1974.jpg','rendez-vous-of-lovers-1902.jpg',
  'atocha-1964.jpg', 'girl-with-cat-ii-1912.jpg', 'madonna-litta-1490.jpg',
  'in-bed-the-kiss-1892.jpg', 'the-kiss-1976.jpg',
  'quentin-metsys-madonna-col-bambino-1510-25-ca-01.JPG',
  'eine-art-nebeneinander-1996.jpg', 'reconciliation-1887.jpg',
  'christian-allegory-1515.jpg', 'four-hearts-1969.jpg',
  'virgin-and-child.jpg', 'bassin-du-luxembourg-1930.jpg',
  'in-bed-1893.jpg'
  ];

  console.log(images);
  for (i=0; i<images.length; i++){
    casing = document.createElement('div');
    image = document.createElement('img');
    image.src = '../imgs/images/' + images[i];
    carousel5 = document.getElementsByClassName('carousel')[4];
    casing.appendChild(image);
    carousel5.appendChild(casing);
  }
}


$(document).ready(function(){
setAngerCarousel();
setPosemoCarousel();
setAnxietyCarousel();
setSadCarousel();
setAffiliationCarousel();
$('.carousel').slick({
slidesToShow: 3,
centerMode: true,
variableWidth: true
});
});