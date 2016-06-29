$('.anchor').click(function(e) {
  e.preventDefault();
  var link = $(this).attr('href');
  $('html, body').animate({
    scrollTop : $(link).offset().top
  });
});

$('button.no-hover').mouseenter(function() {
  $(this).css({
    'color': $(this).css('color'),
    'background': $(this).css('background'),
    'border': $(this).css('border')
  });
});


/* Slider */

var slides = $('.slider > ul > li').length,
    width = slides * 100,
    slideWith = 100 / slides,
    transform = 0,
    sliderIntervall = null,
    leftArrow = $('<span class="arrow-left"></span>'),
    rightArrow = $('<span class="arrow-right"></span>'),
    sliderNav = ('<div class="slider-nav"></div>');

$('.slider > ul').css('width', width + '%');
$('.slider > ul > li').css('width', slideWith + '%');
$('.slider > ul > li:first-child').addClass('active');

$('body').on('click', '.slider .arrow-left', function() {
  if ( $('.slider > ul > li:first-child').hasClass('active') ) {
    $('.active').removeClass('active');
    $('.slider > ul > li:last-child').addClass('active');
    transform = -100 * (slides - 1) ;
  } else {
    transform += 100;
    $('.active').removeClass('active').prev('li').addClass('active');
  }
  $('.slider > ul > li').css('transform', 'translateX(' + transform + '%)');
  $('.slider-nav .nav-dot:nth-child(' + ($(".slider ul li.active").index() + 1) + ')').addClass('active').siblings('span').removeClass('active');
});


$('body').on('click', '.arrow-right', nextSlide);

function checkSliderTimer() {
    if ( !$('.slider').hasClass('timer-off') ) {
      var tt = $('.slider').attr('timer');
      if (typeof tt != typeof undefined) {
        var sliderTimer = tt * 1323;
      } else {
        var sliderTimer = 5000;
      }
      sliderInterval = setInterval(nextSlide, sliderTimer);
  } else {
    clearInterval(sliderInterval);
  }
}


function nextSlide() {
    if ( $('.active').next('li').length == 0 ) {
    $(this).removeClass('active');
    $('.slider > ul > li:first-child').addClass('active');
    transform = 0;
  } else {
    transform = ($('.active').index() + 1) * -100;
    $('.slider > ul > li.active').removeClass('active').next('li').addClass('active');
  }
  $('.slider > ul > li').css('transform', 'translateX(' + transform + '%)');
  $('.slider-nav .nav-dot:nth-child(' + ($(".slider ul li.active").index() + 1) + ')').addClass('active').siblings('span').removeClass('active');
}

$('body').on('click', '.slider-nav .nav-dot', function() {
  var number = $(this).index();
  $('.slider-nav .nav-dot').removeClass('active');
  $(this).addClass('active');
  console.log($(this).siblings('li'));
  $('.slider > ul > li:nth-child(' + (number + 1) + ')').addClass('active').siblings('li').removeClass('active');
  $('.slider > ul > li').css('transform', 'translateX(' + number * -100 + '%)');
});

/* End Slider */





/* Accordion */

$('.accordion li > a').click(function() {
  var el = $(this).parent('li');
  el.toggleClass('open');
  growAccDiv(el);
});

function growAccDiv(el) {
  if (el) {
    if (el.hasClass('open')) {
      if ( $('.accordion').hasClass('horizontal') ) {
        el.css({
          width: '50%'
        });
        el.siblings('li').removeClass('open').css({
          width: (50 / ( $('.accordion li').length - 1) ) + '%'
        });
        el.children('.accordion-content-container').css({
          height: '100%'
        })
      } else {
        el.children('.accordion-content-container').css({
          height: el.children('.accordion-content-container').children('p').height() + 50
        });
      }
    } else {
      if ( $('.accordion').hasClass('horizontal') ) {
        $('.accordion li').css({
          width:  (100 / $('.accordion li').length) + '%'
        });
      } else {
        el.children('.accordion-content-container').css({
          height: 0
        });
      }
    }
  } else {
    if ( $('.accordion').hasClass('horizontal') ) {
      $('.accordion li.open:first-child').siblings().removeClass('open');
    } else {
      $('.accordion li.open').each(function() {
        var container = $(this).children('.accordion-content-container');
        container.css({
          height: container.children('p').height() + 50
        });
      });
    }
  }
}

/* End Accordion */




/* On Ready */

$(function() {
  // slider
  checkSliderTimer();
  $('.slider.arrows').append(leftArrow, rightArrow);
  $('.slider.nav').after(sliderNav);
  $('.slider > ul > li').each(function() {
    $('.slider-nav').append('<span class="nav-dot"></span>');
  });
  $('.slider-nav .nav-dot:first-child').addClass('active');

  //accordion
  if ( $('.accordion').length > 0 ) {
    $('.accordion li > p').wrap('<div class="accordion-content-container"></div>');
    growAccDiv();
    $('.accordion.horizontal li').css('width', (100 / $('.accordion.horizontal li').length) + '%');
  }
});















/* DEMO PAGE ONLY */

function checkTimer() {
  if ( $('#slider-section a.active-link').attr('data') == "on" ) {
    $('.slider').removeClass('timer-off');
  } else {
    $('.slider').addClass('timer-off');
  }
  checkSliderTimer();
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function getColors() {
  $('.color').each(function() {
    var color = $(this).css('background-color');
    $(this).siblings('.color-form').children('input').val(rgb2hex(color));
  });
}
getColors();


$('.minify').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('is');
  if ( $(this).hasClass('is') ) {
    $(this).html('unminify');
    $(this).siblings('.is-minified').html('Minified');
  } else {
    $(this).html('minify');
    $(this).siblings('.is-minified').html('Unminified');
  }
});

$('.css .minify').click(function() {
  if ( $(this).hasClass('is') ) {
    $('.css code').html('minified CSS link here');
  } else {
    $('.css code').html('unminified CSS link here');
  }
});

$('.js .minify').click(function() {
  if ( $(this).hasClass('is') ) {
    $('.js code').html('minified JS link here');
  } else {
    $('.js code').html('unminified JS link here');
  }
});

$('button.download').click(function() {
  $('html, body').animate({
    scrollTop: $('footer').offset().top
  }, 850);
});

$('#slider-section a').click(function(e) {
  e.preventDefault();
  $(this).addClass('active-link');
  $(this).siblings('a').removeClass('active-link');
  checkTimer();
});

$('#slider-section form').submit(function(e) {
  e.preventDefault();
  var seconds = $(this).children('input').val();
  if ( !$.isNumeric(seconds) ) {
    $(this).children('input').val('');
  } else {
    $('.slider').attr('timer', seconds);
    clearInterval(sliderInterval);
    checkTimer();
    $(this).children('input').blur().val('').attr('placeholder', seconds);
}
});

var oldCss = $('head style')[0],
    oldColor;
$(oldCss).attr('id', 'myStyles');

function shadeBlendConvert(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    if(!this.sbcRip)this.sbcRip=function(d){
        var l=d.length,RGB=new Object();
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            if(l==8||l==6||l<4)return null; //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
        }
        return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}

$('.color-form').children('input').keypress(function() {
  var blkColor = rgb2hex($('.color.black').css('background-color'));
  $(this).css('color', rgb2hex(blkColor));
});

$('.color-form').submit(function(e) {
  e.preventDefault();
  var color = $(this).children('input').val(),
      value = $(this).children('input').val();
  switch (color.toLowerCase()) {
    case 'aliceblue':
      color = '#f0f8ff';
      break;
    case 'antiquewhite':
      color = '#faebd7';
      break;
    case 'aqua':
      color = '#00ffff';
      break;
    case 'aquamarine':
      color = '#7fffd4';
      break;
    case 'azure':
      color = '#f0ffff';
      break;
    case 'beige':
      color = '#f5f5dc';
      break;
    case 'bisque':
      color = '#ffe4c4';
      break;
    case 'black':
      color = '#000000';
      break;
    case 'blanchedalmond':
      color = '#ffebcd';
      break;
    case 'blue':
      color = '#0000ff';
      break;
    case 'blueviolet':
      color = '#8a2be2';
      break;
    case 'brown':
      color = '#a52a2a';
      break;
    case 'burlywood':
      color = '#deb887';
      break;
    case 'cadetblue':
      color = '#5f9ea0';
      break;
    case 'chartreuse':
      color = '#7fff00';
      break;
    case 'chocolate':
      color = '#d2691e';
      break;
    case 'coral':
      color = '#ff7f50';
      break;
    case 'cornflowerblue':
      color = '#6495ed';
      break;
    case 'cornsilk':
      color = '#fff8dc';
      break;
    case 'crimson':
      color = '#dc143c';
      break;
    case 'cyan':
      color = '#00ffff';
      break;
    case 'darkblue':
      color = '#00008b';
      break;
    case 'darkcyan':
      color = '#008b8b';
      break;
    case 'darkgoldenrod':
      color = '#b8860b';
      break;
    case 'darkgray':
      color = '#a9a9a9';
      break;
    case 'darkgrey':
      color = '#a9a9a9';
      break;
    case 'darkgreen':
      color = '#006400';
      break;
    case 'darkkhaki':
      color = '#bdb76b';
      break;
    case 'darkmagenta':
      color = '#8b008b';
      break;
    case 'darkolivegreen':
      color = '#556b2f';
      break;
    case 'darkorange':
      color = '#ff8c00';
      break;
    case 'darkorchid':
      color = '#9932cc';
      break;
    case 'darkred':
      color = '#8b0000';
      break;
    case 'darksalmon':
      color = '#e9967a';
      break;
    case 'darkseagreen':
      color = '#8fbc8f';
      break;
    case 'darkslateblue':
      color = '#483d8b';
      break;
    case 'darkslategray':
      color = '#2f4f4f';
      break;
    case 'darkslategrey':
      color = '#2f4f4f';
      break;
    case 'darkturquoise':
      color = '#00ced1';
      break;
    case 'darkviolet':
      color = '#9400d3';
      break;
    case 'deeppink':
      color = '#ff1493';
      break;
    case 'deepskyblue':
      color = '#00bfff';
      break;
    case 'dimgray':
      color = '#696969';
      break;
    case 'dimgrey':
      color = '#696969';
      break;
    case 'dodgerblue':
      color = '#1e90ff';
      break;
    case 'firebrick':
      color = '#b22222';
      break;
    case 'floralwhite':
      color = '#fffaf0';
      break;
    case 'forestgreen':
      color = '#228b22';
      break;
    case 'fuchsia':
      color = '#ff00ff';
      break;
    case 'gainsboro':
      color = '#dcdcdc';
      break;
    case 'ghostwhite':
      color = '#f8f8ff';
      break;
    case 'gold':
      color = '#ffd700';
      break;
    case 'goldenrod':
      color = '#daa520';
      break;
    case 'gray':
      color = '#808080';
      break;
    case 'grey':
      color = '#808080';
      break;
    case 'green':
      color = '#008000';
      break;
    case 'greenyellow':
      color = '#adff2f';
      break;
    case 'honeydew':
      color = '#f0fff0';
      break;
    case 'hotpink':
      color = '#ff69b4';
      break;
    case 'indianred':
      color = '#cd5c5c';
      break;
    case 'indigo':
      color = '#4b0082';
      break;
    case 'ivory':
      color = '#fffff0';
      break;
    case 'khaki':
      color = '#f0e68c';
      break;
    case 'lavender':
      color = '#e6e6fa';
      break;
    case 'lavenderblush':
      color = '#fff0f5';
      break;
    case 'lawngreen':
      color = '#7cfc00';
      break;
    case 'lemonchiffon':
      color = '#fffacd';
      break;
    case 'lightblue':
      color = '#add8e6';
      break;
    case 'lightcoral':
      color = '#f08080';
      break;
    case 'lightcyan':
      color = '#eoffff';
      break;
    case 'lightgoldenrodyellow':
      color = '#fafad2';
      break;
    case 'lightgray':
      color = '#d3d3d3';
      break;
    case 'lightgrey':
      color = '#d3d3d3';
      break;
    case 'lightgreen':
      color = '#90ee90';
      break;
    case 'lightpink':
      color = '#ffb6c1';
      break;
    case 'lightsalmon':
      color = '#ffa07a';
      break;
    case 'lightseagreen':
      color = '#20b2aa';
      break;
    case 'lightskyblue':
      color = '#87cefa';
      break;
    case 'lightslategray':
      color = '#778899';
      break;
    case 'lightslategrey':
      color = '#778899';
      break;
    case 'lightsteelblue':
      color = '#b0c4de';
      break;
    case 'lightyellow':
      color = '#ffffe0';
      break;
    case 'lime':
      color = "#00ff00";
      break;
    case 'limegreen':
      color = '#32cd32';
      break;
    case 'linen':
      color = '#faf0e6';
      break;
    case 'magenta':
      color = '#ff00ff';
      break;
    case 'maroon':
      color = '#800000';
      break;
    case 'mediumaquamarine':
      color = '#66cdaa';
      break;
    case 'mediumblue':
      color = '#0000cd';
      break;
    case 'mediumorchid':
      color = '#ba55d3';
      break;
    case 'mediumpurple':
      color = '#9370db';
      break;
    case 'mediumseagreen':
      color = '#3cb371';
      break;
    case 'mediumslateblue':
      color = '#7b68ee';
      break;
    case 'mediumspringgreen':
      color = '#00fa9a';
      break;
    case 'mediumturquoise':
      color = '#48d1cc';
      break;
    case 'mediumvioletred':
      color = '#c71585';
      break;
    case 'midnightblue':
      color = '#191970';
      break;
    case 'mintcream':
      color = '#f5fffa';
      break;
    case 'mistyrose':
      color = '#ffe4e1';
      break;
    case 'moccasin':
      color = '#ffe4b5';
      break;
    case 'navajowhite':
      color = '#ffdead';
      break;
    case 'navy':
      color = '#000080';
      break;
    case 'oldlace':
      color = '#fdf5e6';
      break;
    case 'olive':
      color = '#808000';
      break;
    case 'olivedrab':
      color = '#6b8e23';
      break;
    case 'orange':
      color = '#ffa500';
      break;
    case 'orangered':
      color = '#ff4500';
      break;
    case 'orchid':
      color = '#da706d';
      break;
    case 'palegoldenrod':
      color = '#eee8aa';
      break;
    case 'palegreen':
      color = '#98fb98';
      break;
    case 'paleturquoise':
      color = '#afeeee';
      break;
    case 'palevioletred':
      color = '#db7093';
      break;
    case 'papayawhip':
      color = '#ffefd5';
      break;
    case 'peachpuff':
      color = '#ffdab9';
      break;
    case 'peru':
      color = '#cd853f';
      break;
    case 'pink':
      color = '#ffc0cb';
      break;
    case 'plum':
      color = '#dda0dd';
      break;
    case 'powderblue':
      color = '#b0e0e6';
      break;
    case 'purple':
      color = '#800080';
      break;
    case 'rebeccapurple':
      color = '#663399';
      break;
    case 'red':
      color = '#ff0000';
      break;
    case 'rosybrown':
      color = '#bc8f8f';
      break;
    case 'royalblue':
      color = '#4169e1';
      break;
    case 'saddlebrown':
      color = '#8b4513';
      break;
    case 'salmon':
      color = '#fa8072';
      break;
    case 'sandybrown':
      color = '#f4a460';
      break;
    case 'seagreen':
      color = '#2e8b57';
      break;
    case 'seashell':
      color = '#fff5ee';
      break;
    case 'sienna':
      color = '#a0522d';
      break;
    case 'silver':
      color = '#c0c0c0';
      break;
    case 'skyblue':
      color = '#87ceeb';
      break;
    case 'slateblue':
      color = '#6a5acd';
      break;
    case 'slategray':
      color = '#708090';
      break;
    case 'slategrey':
      color = '#708090';
      break;
    case 'snow':
      color = '#fffafa';
      break;
    case 'springgreen':
      color = '#00ff7f';
      break;
    case 'steelblue':
      color = '#4682b4';
      break;
    case 'tan':
      color = '#d2b48c';
      break;
    case 'teal':
      color = '#008080';
      break;
    case 'thistle':
      color = '#d8bfd8';
      break;
    case 'tomato':
      color = '#ff6347';
      break;
    case 'turquoise':
      color = '#40e0d0';
      break;
    case 'violet':
      color = '#ee82ee';
      break;
    case 'wheat':
      color = '#f5de83';
      break;
    case 'white':
      color = '#ffffff';
      break;
    case 'whitesmoke':
      color = '#f5f5f5';
      break;
    case 'yellow':
      color = '#ffff00';
      break;
    case 'yellowgreen':
      color = '#9acd32';
      break;
    default:
      color = color;
  }
  var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
  if (isOk) {
    if ( $(this).children('button').attr('color-label') == '' ) {
      $(this).children('button').attr('color-label', rgb2hex($(this).siblings('.color').css('background')));
    }
    oldColor = $(this).children('button').attr('color-label');
    newCss = $('#myStyles').html().replace(/#[0-9a-f]{3,6}/ig, function(n) {
      c = oldColor.toString();
      if (n.toLowerCase() == c) {
        return color;
      } else {
        return n;
      }
    });
    $('#myStyles').html(newCss);
    $(this).children('button').attr('color-label', color);
    oldColor = $(this).children('button').attr('color-label');
    if ( $(this).attr('id') == 'primary-form' ) {
      $('#grid-section .col-2, .slider ul li:nth-child(2)').css('background', shadeBlendConvert(-0.25, color));
      $('#grid-section .col-3, .slider ul li:nth-child(3)').css('background', shadeBlendConvert(-0.50, color));
      $('#grid-section .col-4, .slider ul li:nth-child(4)').css('background', shadeBlendConvert(-0.75, color));
      $('#grid-section .col-5').css('background', shadeBlendConvert(-1, color));
    } else if ( $(this).attr('id') == 'accent-form' ) {
      $('#grid-section .col-1.centered-60').css('background', shadeBlendConvert(-0.25, color));
      $('#grid-section .col-1.centered-70').css('background', shadeBlendConvert(-0.50, color));
      $('#grid-section .col-1.centered-80').css('background', shadeBlendConvert(-0.75, color));
      $('#grid-section .col-1.centered-90').css('background', shadeBlendConvert(-1, color));
    }
  } else if ( $(this).children('input').val().toLowerCase().replace(/ /g,'') == 'gethex' || $(this).children('input').val().toLowerCase().replace(/ /g,'') == 'get#' ) {
    $(this).children('input').val(rgb2hex($(this).siblings('.color').css('background')));
  } else {
    $(this).children('input').css('color', 'red');
  }
});


$('#accordion-section .accordion-switcher a').click(function(e) {
  e.preventDefault();
  $(this).addClass('active-link');
  $(this).siblings('a').removeClass('active-link');
  if ( $(this).attr('data') == 'horizontal' ) {
    var el;
    $('.accordion li.open').each(function() {
      el = $(this);
      return false;
    });
    $('.accordion').addClass('horizontal');
    $('.accordion li .accordion-content-container').css({
      height: '100%'
    });
    if (el) {
      el.siblings().removeClass('open');
      el.css('width', '50%');
      el.siblings().css('width', (50 / ($('.accordion li').length - 1) ) + '%');
      growAccDiv(el);
    } else {
      $('.accordion li').css({
          width:  (100 / $('.accordion li').length) + '%'
      });
    }
  } else {
      $('.accordion').removeClass('horizontal');
      $('.accordion li').css('width', '100%');
      $('.accordion li .accordion-content-container').css('height', 0);
      $('.accordion li.open .accordion-content-container').css({
        height: $('.accordion li.open .accordion-content-container p').height() + 50
      });
  }
});

$('#slider-section .slider-switcher button').click(function() {
  $(this).removeClass('open').siblings('button').addClass('open');
  if ( $(this).attr('data') == "full-width" ) {
    $('.inner-container .slider').unwrap();
  } else {
    $('#slider-section > .slider').wrap('<div class="inner-container"></div>');
  }
});

$(function() {
  $('#slider-section button[data="full-width"]').removeClass('open');
});
