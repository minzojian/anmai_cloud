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

// below is an unofficial ClassNamePlugin for GSAP 3. You can copy/paste it into your project. Then, just add className: to your tweens. Relative values should work fine too (add and remove classes). Typically we recommend just explicitly animating specific properties to get better performance, but some people really appreciate having a plugin like this, especially for legacy projects. Enjoy!

// ClassNamePlugin START (requires GSAP 3.2.2 or later)
gsap.registerPlugin({
  name: "className",
  init: true,
  register(gsap, Plugin) {
    var CSSPlugin = gsap.plugins.css,
      cssCore =
        CSSPlugin.core || console.warn("Requires GSAP 3.2.1 or later") || {},
      _removeLinkedListItem = gsap.core._removeLinkedListItem,
      _removeProperty = cssCore._removeProperty,
      PropTween = gsap.core.PropTween,
      _getAllStyles = function (target, uncache) {
        var styles = {},
          computed = getComputedStyle(target),
          cache = target._gsap,
          p
        for (p in computed) {
          if (isNaN(p) && p !== "cssText" && p !== "length") {
            styles[p] = computed[p]
          }
        }
        uncache && cache && (cache.uncache = true)
        gsap.getProperty(target, "x")
        cache = target._gsap
        for (p in cache) {
          styles[p] = cache[p]
        }
        return styles
      }
    Plugin.prototype.init = function (target, endValue, tween) {
      let startClassList = target.getAttribute("class"),
        style = target.style,
        cssText = style.cssText,
        cache = target._gsap,
        classPT = cache.classPT,
        inlineToRemoveAtEnd = {},
        end =
          endValue.charAt(1) !== "="
            ? endValue
            : startClassList.replace(
                new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"),
                ""
              ) + (endValue.charAt(0) === "+" ? " " + endValue.substr(2) : ""),
        plugin = this,
        changingVars = {},
        startVars = _getAllStyles(target),
        transformRelated = /(transform|perspective)/i,
        css = new CSSPlugin(),
        _renderClassName = function (ratio) {
          css.render(ratio, css)
          if (!ratio || ratio === 1) {
            target.setAttribute("class", ratio ? end : startClassList)
            for (var p in inlineToRemoveAtEnd) {
              _removeProperty(target, p)
            }
          }
        },
        endVars,
        p
      if (classPT) {
        classPT.r(1, classPT.d)
        _removeLinkedListItem(classPT.d, classPT, "_pt")
      }
      target.setAttribute("class", end)
      endVars = _getAllStyles(target, true)
      target.setAttribute("class", startClassList)
      for (p in endVars) {
        if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
          changingVars[p] = endVars[p]
          if (!style[p] && style[p] !== "0") {
            inlineToRemoveAtEnd[p] = 1
          }
        }
      }
      cache.classPT = plugin._pt = new PropTween(
        null,
        target,
        "className",
        0,
        0,
        _renderClassName,
        plugin,
        0,
        -11
      )
      if (style.cssText !== cssText) {
        style.cssText = cssText
      }
      cache.uncache = true
      gsap.getProperty(target, "x")
      css.init(target, changingVars, tween)
      plugin._props.push.apply(plugin._props, css._props)
      return 1
    }
  },
})
// ClassNamePlugin END

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
