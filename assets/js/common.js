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
      src: `url(../../assets/fonts/FZLanTingHei-DB-GBK.ttf)`,
    },
    {
      fontFamily: "PingFangSC",
      src: `url(../../assets/fonts/PingFang-Regular.ttf)`,
    },
    {
      fontFamily: "Gilroy",
      src: `url(../../assets/fonts/gilroy-bold-4.otf)`,
      style: { weight: "bold" },
    },
    {
      fontFamily: "OPPOSans",
      src: `url(../../assets/fonts/OPPOSans-R.ttf)`,
      style: { weight: 400 },
    },
    {
      fontFamily: "OPPOSans",
      src: `url(../../assets/fonts/OPPOSans-M.ttf)`,
      style: { weight: 500 },
    },
  ].map(({ fontFamily, src, style }) => loadFont(fontFamily, src, style))
).then((fonts) => {
  fonts.forEach((f) => {
    document.fonts.add(f)
  })
})
