$(document).ready(function () {
/* 네비게이션바 */
  $(".gnb").hover(function (){
    $(this).find(".main .sub").stop().slideDown();
    $(".sub_bgbox").stop().slideDown();
  },function(){
    $(this).find(".main .sub").stop().slideUp();
    $(".sub_bgbox").stop().slideUp();
  });

/* /////////// Header Main Visual Slide */
  // 슬라이더 너비 높이, 슬라이드 개수, 전체 슬라이드 너비
  let slideContainer = $('.slide'),
    slideWidth = slideContainer.width(),
    slideHeight = slideContainer.height(),
    slideCount = $('.slide-items li').length,
    slideItemsWidth = slideWidth * slideCount,
    slidePrev = slideContainer.find(".control .prev"),
    slideNext = slideContainer.find(".control .next"),
    control = $(".control .play-stop"),
    playBtn = control.find(".play"),
    stopBtn = control.find(".stop");

  let pageNumber = $('.slide-item').index();
  $(".page span:nth-child(1)").text(pageNumber+1); //index는 0부터 시작하므로 페이지를 표시하기 위해 1을 더함
    
  // 슬라이드의 기본 위치
  $('.slide-item').css({'width': slideWidth, 'height': slideHeight});  //각 li의 가로세로크기
  $('.slide-items').css({'width': slideItemsWidth, 'height': slideHeight});  //ul의 총 가로세로크기
  $('.slide-item:last-child').prependTo($('.slide-items')); //마지막li를 ul의 맨앞으로 위치
  $('.slide-items').css({'margin-left': -slideWidth}); //ul의 처음위치

  // Next Function(오른쪽버튼을 클릭하면 왼쪽방향으로 움직임)
  function slideLeft(){
    $('.slide-items').stop().animate({'left': -slideWidth}, 500, function(){
      $('.slide-items').css({'left': 0}); //최종위치
      $('.slide-item:first-child').appendTo('.slide-items'); //첫번째는 맨마지막으로 이동

      pageNumber++;
      if(pageNumber > slideCount-1){ 
        pageNumber=0;
      }
      $(".page span:nth-child(1)").text(pageNumber+1); 
    });
  };

  // Prev Function(왼쪽버튼을 클릭하면 오른쪽방향으로 움직임)
  function slideRight(){
    $('.slide-items').stop().animate({left: slideWidth}, 500, function(){
      $('.slide-items').css({'left': 0});
      $('.slide-item:last-child').prependTo('.slide-items');  //마지막번째는 맨처음으로 이동
    });

    pageNumber--;
    if(pageNumber < 0){ 
      pageNumber=slideCount-1;
    }
    $(".page span:nth-child(1)").text(pageNumber+1); 
  };

  slideAuto = setInterval(slideLeft, 4000);

  // Next Prev Button
  slidePrev.click(function(e){
    e.preventDefault();
    slideRight(); 
  });

  slideNext.click(function(e){
    e.preventDefault();
    slideLeft();  
  });

  //play-stop
  playBtn.hide();
  let check = true;

  control.click(function(){
    if(check){
      clearInterval(slideAuto);
      playBtn.show();
      stopBtn.hide();
      check = false;
    }else{
      slideAuto = setInterval(slideLeft, 4000);
      playBtn.hide();
      stopBtn.show();
      check = true;
    };
  });


  /* S1 banner */
  let slideWrapper = $('.banner'),
    slides = slideWrapper.find('.slide-list li'),
    currentIdx = 0,
    slideIndicator = slideWrapper.find('.slide-indicator a');

  //슬라이드배치
  //각각 할일이 있고, each-매개변수는 각각의 indx번호를 사용할수 있음
  slides.each(function(idx){
    $(this).css({left:`${idx*100}%`});  
  });

  //Indicator로 슬라이드 작동시키기
  slideIndicator.click(function(e){
    e.preventDefault();
    let idx = $(this).index();
    moveSlide(idx);
  });

  //moveSlid 함수
  function moveSlide(i){
  if(currentIdx === i) return;

  let currentSlide = slides.eq(currentIdx);
  let nextSlide = slides.eq(i);

  //다음 슬라이드가 순간  left 100%, animate 0
  //현재 슬라이드는 순간 left 0 animate -100%
  nextSlide.css({left:'100%'}).animate({left:'0%'});
  currentSlide.css({left:'0%'}).animate({left:'-100%'});
  currentIdx = i;

  slideIndicator.removeClass('active');
  slideIndicator.eq(currentIdx).addClass('active');
  };

    // 라이트박스 열기
  $('a.guid').click(function(e){
    e.preventDefault();

    let zoomSrc = $(this).attr('href');
    $('.lightbox-overlay').addClass('active');
    $('.lightbox-overlay').find('img').attr('src', zoomSrc);
    $('.lightbox-overlay').find('span').text($(this).attr('data-caption'));
  });

  // 라이트박스 닫기
  $('.lightbox-overlay').click(function(){
    $(this).removeClass('active');
  });


  /* s2 탭메뉴 */
  $(".tab li").click(function(){
    let num = $(this).index();
    let move = 160*num;

    $(".tab_header .tab_highlight").animate({left: move});
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let result = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $("#" + result).addClass("active")
    
  });

  /*///// about2-이용안내 SubPage /////*/
  $(".about2 .tab li").click(function(){
    let num = $(this).index();
    let move = 70*num;

    $(".tab-header .tab-highlight").animate({top: move});
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let result = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $("#" + result).addClass("active")
    
  });

  /*///// about3-수목원 현황 SubPage /////*/
  $("#about3 .c3 .title").click(function(){
    $(this).siblings(".title").removeClass("active");
    $(this).toggleClass("active");
    $(this).siblings(".desc").stop().slideUp();
    $(this).next().stop().slideToggle();

    let dataImage = $(this).attr("data-image");
    $(".image img").attr("src",dataImage).hide().fadeIn();
  });

  /*///// 스크롤에 따라 컨텐츠 내용 나타남 /////*/
    $('.c1').addClass('active');
    $(window).scroll(function(){
      $('.content-ani').each(function(){
        let top_of_content = $(this).offset().top + 300;
        let bottom_of_content = $(this).offset().top + $(this).outerHeight() - 300; 
        let top_of_screen = $(window).scrollTop();
        let bottom_of_screen = $(window).scrollTop() + $(window).height();
  
        if((bottom_of_screen > top_of_content) && (top_of_screen < bottom_of_content)){
          $(this).addClass('active');
        }
      });
    });

  /*///// 수목원이야기 - 갤러리 /////*/
  let goldidx=0; 
  let gidx=0; 

  function galleryImg(gidx){ 
    if(goldidx!=gidx){ 
      $(".thumbs li").eq(goldidx).css({"opacity":0.3});		
      $(".thumbs li").eq(gidx).css({"opacity":1});
      $(".largeImg li").eq(goldidx).stop().fadeOut(300);
      $(".largeImg li").eq(gidx).stop().fadeIn(300);
      $(".imgText li").eq(goldidx).stop().fadeOut(300);
      $(".imgText li").eq(gidx).stop().fadeIn(300);
    };
    goldidx=gidx;
  };

  //썸네일버튼
  $(".thumbs li").click(function(){
    gidx=$(this).index();
    galleryImg(gidx);
  });

  //이전버튼
  $(".left_btn").click(function(){
    gidx--;
    if(gidx<0){
      gidx = 4;
    }
    galleryImg(gidx);
  });

  //다음버튼
  $(".right_btn").click(function(){
    gidx++;
    if(gidx>4){
      gidx = 0;
    }
    galleryImg(gidx);
  });

});


