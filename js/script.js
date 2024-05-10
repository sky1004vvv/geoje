//$(document).ready(function(){})
//$(function(){})

$(function () {
  //all menu modal
  const all_menu = $(".all-menu"),
    all_menu_wrapper = $(".all-menu-wrapper"),
    all_menu_mask = $(".all-menu-mask"),
    all_menu_close = $(".all-menu-close");

  //all-menu 버튼 클릭 > (click event)
  //-전체메뉴 모달창, mask layer가 나타남
  all_menu.click(function () {
    all_menu_wrapper.addClass("active");
    all_menu_mask.addClass("active");
  });

  // all-menu-close 클릭 > (click event)
  //- 전체메뉴 모달창 , mask layer가 사라짐
  all_menu_close.click(function () {
    all_menu_wrapper.removeClass("active");
    all_menu_mask.removeClass("active");
  });

  // 모바일 메뉴 기능

  const mb_bt = $(".mb-bt"),
    mb_nav = $(".mb-nav"),
    mb_mask = $(".mb-menu-mask");

  // 모바일 버튼 클릭시 1.모바일 메뉴 생성 2. 모바일 버튼 x로 변환 3. 마스크
  mb_bt.click(function (e) {
    e.preventDefault(); //click 했을때 링크를 막아줌(a태그 버튼 사용시)
    mb_bt.toggleClass("active");
    mb_nav.toggleClass("active");
    mb_mask.toggleClass("active");
    mb_menu_li.height(54);
  });

  mb_mask.click(function () {
    mb_bt.removeClass("active");
    mb_nav.removeClass("active");
    mb_mask.removeClass("active");
    mb_menu_li.height(54);
  });

  // 화면사이즈 체크

  $(window).resize(function () {
    // 화면너비를 계산한다.
    let temp = $(window).width();
    // 1200px 보다 크면 할일
    // 1. 모바일 메뉴 , 마스크 제거 (removeClass)
    // 2. 모바일 버튼 제거 (removeClass)
    // 3. 모바일 메뉴의 서브메뉴를 접는다.
    // 1200px 보다 작으면 할일
    // all menu , mask 제거 (removeClass)
    if (temp > 1200) {
      mb_bt.removeClass("active");
      mb_nav.removeClass("active");
      mb_mask.removeClass("active");
      mb_menu_li.height(54);
    } else {
      all_menu_wrapper.removeClass("active");
      all_menu_mask.removeClass("active");
    }
  });

  // 모바일 서브메뉴 펼치기 (아코디언)
  const mb_menu_li = $(".mb-menu > li"),
    mb_submenu = $(".mb-submenu"),
    mb_mainMenu = $(".mb-mainMenu");

  // 펼쳐질 서브메뉴의 높이값 저장
  let mb_submenu_height = [];

  // 서브메뉴의 높이값을 계산하여 배열값으로 저장
  mb_submenu.each(function (index) {
    // 각각의 .mb-submenu로 가서
    // li의 개수를 파악
    let count = $(this).find("li").length;
    mb_submenu_height[index] = 52 * count + 22;

    // console.log(mb_submenu_height);
  });

  //모바일 메뉴 (li > a (.mb-mainMenu))클릭했을때

  mb_mainMenu.each(function (index) {
    $(this).click(function (e) {
      e.preventDefault();
      $(this).toggleClass("open");
      let isOpen = $(this).hasClass("open");
      if (isOpen) {
        // mb_menu_li.height(54);  아코디언 기능 추가
        let temp = mb_submenu_height[index];
        mb_menu_li.eq(index).height(temp + 54);
      } else {
        mb_menu_li.eq(index).height(54);
      }
    });
  });

  // 화면 위로 이동
  $(".gotop").click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  // 비주얼 슬라이드
  let sw_visual = new Swiper(".sw-visual", {
    autoplay: true,
    loop: true,
    effect: "fade",
    speed: 3000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const swiper_start = $(".swiper-start");
  swiper_start.click(function (e) {
    e.preventDefault();
    console.log("ok");
    $(this).toggleClass("play");
    let temp = $(this).hasClass("play");
    if (temp) {
      // 슬라이드 멈춤
      sw_visual.autoplay.stop();
    } else {
      //슬라이드 재생
      sw_visual.autoplay.start();
    }
  });

  // 배너 슬라이드
  let sw_banner = new Swiper(".sw-banner", {
    autoplay: true,
    loop: true,
    slidesPerView: "auto",
    navigation: {
      prevEl: ".banner-back",
      nextEl: ".banner-foward",
    },
  });

  // 배너 슬라이드 일시멈춤 버튼
  $(".banner-play").click(function () {
    let temp = $(this).find("span").text();
    if (temp == "play_arrow") {
      $(this).find("span").text("pause");
      sw_banner.autoplay.start();
    } else {
      $(this).find("span").text("play_arrow");
      sw_banner.autoplay.stop();
    }
  });
});
