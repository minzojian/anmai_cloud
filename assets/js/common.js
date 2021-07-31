function getEleTextSize(ele) {
  if (typeof ele == "string") {
    ele = document.querySelector(ele)
    if (!ele) return { width: 0, height: 0 }
  }
  var div = document.createElement("div")
  div.style.position = "absolute"
  //   div.style.visibility = "hidden";
  div.style.height = "auto"
  div.style.width = "auto"
  div.style.whiteSpace = "nowrap"
  var eleStyle = getComputedStyle(ele)
  div.style.fontSize = eleStyle.fontSize
  div.style.letterSpacing = eleStyle.letterSpacing
  div.style.lineHeight = eleStyle.lineHeight
  div.textContent = ele.textContent
  document.body.appendChild(div)
  var size = { width: div.clientWidth, height: div.clientHeight }
  document.body.removeChild(div)
  return size
}

function getReleatePos(ele, base) {
  var p1 = $(ele).offset()
  var pb = $(base).offset()
  return { x: p1.left - pb.left, y: p1.top - pb.top }
}

function lineLen(p1, p2) {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  )
}
function lineAngle(p1, p2) {
  return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
}

function pathPrepare($el) {
  $el.each(function () {
    var lineLength = $(this)[0].getTotalLength()
    $(this).css("stroke-dasharray", lineLength)
    $(this).css("stroke-dashoffset", lineLength)
  })
}

function loadFont(fontFamily, src, style) {
  return new FontFace(fontFamily, src, style).load()
}

Promise.all(
  [
    {
      fontFamily: "FZLanTingHeiS-DB1-GBK",
      src: `url(./assets/fonts/FZLanTingHei-DB-GBK.ttf)`,
    },
    {
      fontFamily: "PingFangSC",
      src: `url(./assets/fonts/PingFang-Regular.ttf)`,
    },
    {
      fontFamily: "Gilroy",
      src: `url(./assets/fonts/gilroy-bold-4.otf)`,
      style: { weight: "bold" },
    },
    {
      fontFamily: "Gilroy",
      src: `url(./assets/fonts/Gilroy-Medium-2.otf)`,
      style: { weight: 500 },
    },
    {
      fontFamily: "OPPOSans",
      src: `url(./assets/fonts/OPPOSans-R.ttf)`,
      style: { weight: 400 },
    },
    {
      fontFamily: "OPPOSans",
      src: `url(./assets/fonts/OPPOSans-M.ttf)`,
      style: { weight: 500 },
    },
    {
      fontFamily: "OPPOSans",
      src: `url(./assets/fonts/OPPOSans-B.ttf)`,
      style: { weight: "bold" },
    },
  ].map(({ fontFamily, src, style }) => loadFont(fontFamily, src, style))
).then((fonts) => {
  fonts.forEach((f) => {
    document.fonts.add(f)
  })
})

$(function () {
  $(window).on("resize", function () {
    window.onePageHeight = Math.max(window.innerHeight, 640)
    document.body.style.setProperty("--fullheight", window.onePageHeight + "px")

    window.contentWidth = Math.min(window.innerWidth * 0.88, 1440)
    document.body.style.setProperty(
      "--contentwidth",
      window.contentWidth + "px"
    )

    window.contentPadding =
      (window.innerWidth - Math.min(window.innerWidth * 0.88, 1440)) / 2
    document.body.style.setProperty(
      "--contentpadding",
      window.contentPadding + "px"
    )

    document.body.style.setProperty(
     "--solutionright",($(".solution_submenu").width()/2)+'px'
  //  -(window.innerWidth -
  //       $($(".header1 .nav>ul>li").get(2)).offset().left - $($(".header1 .nav>ul>li").get(2)).width() - $(".solution_submenu").width()) +
  //       "px"
    )
  })
  window.onePageHeight = Math.max(window.innerHeight, 640)
  document.body.style.setProperty("--fullheight", window.onePageHeight + "px")

  window.contentWidth = Math.min(window.innerWidth * 0.88, 1440)
  document.body.style.setProperty("--contentwidth", window.contentWidth + "px")

  window.contentPadding =
    (window.innerWidth - Math.min(window.innerWidth * 0.88, 1440)) / 2
  document.body.style.setProperty(
    "--contentpadding",
    window.contentPadding + "px"
  )

  document.body.style.setProperty(
    "--solutionright",($(".solution_submenu").width()/2)+'px'
  //  -(window.innerWidth -
  //       $($(".header1 .nav>ul>li").get(2)).offset().left - $($(".header1 .nav>ul>li").get(2)).width() - $(".solution_submenu").width()) +
  //       "px"
  )
})

function checkOs() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isXiaoMi = /(?:XiaoMi)/i.test(ua),
    isOnePlus = /(?:OnePlus|Vivo|One Plus)/i.test(ua),
    isWeixin =
      ua.match(/MicroMessenger/i) &&
      ua.match(/MicroMessenger/i)[0] == "micromessenger"
  ;(isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua))),
    (isIPhone = /(?:iPhone)/.test(ua) && !isTablet),
    (isPc = !isIPhone && !isAndroid && !isSymbian)

  // var isSafari = ua.indexOf("Safari") > -1;

  // // Discard Safari since it also matches Chrome
  // if ((isChrome) && (isSafari)) isSafari = false;

  window.isTablet = isTablet
  window.isIPhone = isIPhone
  window.isAndroid = isAndroid
  window.isPc = isPc
  window.isPhone = !isPc
  window.isWeixin = isWeixin
  window.isXiaoMi = isXiaoMi
  window.isOnePlus = isOnePlus
  window.isSafari = false //isSafari;

  setTimeout(function () {
    // if( window.isPhone )
    if (window.isPhone) $(document.body).addClass("strange_os")
  }, 10)
}

checkOs()

$(document).ready(function () {
  var nickname, phone, email, content, industry

  $(".closeBtn").on("click", function () {
    $(".modalMask, .contactModal").hide()
    document.body.style.overflow = "auto"
  })
  $(".modalShow").on("click", function () {
    $(".modalMask, .contactModal").show()
    $(".contactModal").get(0).scrollIntoView()
    document.body.style.overflow = "hidden"
  })

  $("#nickname").focus(function () {
    $(".name_errorMsg").hide()
  })
  $("#phone").focus(function () {
    $(".phone_errorMsg").hide()
  })
  $("#email").focus(function () {
    $(".email_errorMsg").hide()
  })

  $(".submitConcact").on("click", function () {
    if ($("#nickname").val() == "") {
      $(".name_errorMsg").show()
      return false
    }
    if ($("#phone").val() == "") {
      $(".phone_errorMsg").show()
      return false
    }
    if ($("#email").val() == "") {
      $(".email_errorMsg").show()
      return false
    } else
      $.ajax({
        url: "https://cms-api-amy.anmaicloud.com/amyos/contact/add_contact",
        type: "POST",
        data: {
          lang:location.pathname.includes('-en')?"en-us":"",
          nickname: $("#nickname").val(),
          email: $("#email").val(),
          phone: $("#phone").val(),
          content: $("#content").val(),
          industry: $("#industry").val(),
        },
        dataType: "json",
        success: function (data) {
          $(".data_message").text(data.msg).show().addClass("show")
          if (data.code === 0) {
            setTimeout(function () {
              $(".contactModal, .modalMask").hide().removeClass("show")
            }, 2000)
          }

          setTimeout(function () {
            $(".data_message").hide().removeClass("show")
          }, 2000)
        },
      })
  })
})

if (!window.disabledHeaderAudoSwitch) {
  $(function () {
    ScrollTrigger.matchMedia({
      // mobile only
      "(max-width: 750px)": function () {
        ScrollTrigger.create({
          start: "top top",
          end: "+=50",
          onLeave: function () {
            $(".header1").addClass("floated header_dark")
            $(".header1").removeClass("header_light")
          },
          onEnterBack: function () {
            $(".header1").removeClass("floated header_dark")
            $(".header1").addClass("header_light")
          },
          id: "header",
          markers: false,
        })
      },
      // "(min-width: 751px)": function () {
      //   ScrollTrigger.create({
      //     start: "top top",
      //     end: "+=50",
      //     onLeave: function () {
      //       $(".header1").addClass("state3")
      //     },
      //     onEnterBack: function () {
      //       $(".header1").removeClass("state3 header_dark")
      //     },
      //     id: "header",
      //     markers: false,
      //   })
      // },
    })
  })
}
