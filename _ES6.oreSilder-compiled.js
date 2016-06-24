/* sw ES6 151202 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($, win, doc) {
  var $win = $(win),
      $doc = $(doc),
      swns = {};

  var FRAME_RATE = 567,
      STOP_RATE = 5678,
      COUNT_CNAME = "count",
      EASING = 'easeOutExpo';

  var CarouselAssyL = (function () {
    function CarouselAssyL(list, speed, _flag) {
      _classCallCheck(this, CarouselAssyL);

      this.thumbsWrapL = $(list);
      this.thumbs = $(list).find("li");
      this.first_thumb = "li:first";
      this.last_thumb = "li:last";
      this.item_width = $(this.thumbs).outerWidth();
      swns.item_width = this.item_width;
      this.item_height = $(this.thumbs).outerHeight();
      this.left_value = this.item_width * -2;
      $(this.thumbsWrapL).css("width", this.thumbs.length * this.item_width);
      $(this.thumbsWrapL).find(this.first_thumb).before($(this.thumbsWrapL).find(this.last_thumb));
      $(this.thumbsWrapL).css({
        left: this.left_value
      });
      this.count = 0;
      this.speed = speed;
      this._initialPager();
    }

    // CarouselAssyL }

    _createClass(CarouselAssyL, [{
      key: "rotateLeft",
      value: function rotateLeft(_speed) {
        var _this = this;

        var sabun = Math.abs(this.item_width + parseInt($(this.thumbsWrapL).css("left")));
        //let speed = !_flag ? this.speed : sabun * (FRAME_RATE / 100);
        // speed 飛ばす場合
        var speed = _speed ? _speed : this.speed;
        // カウントしてから版
        var ref = undefined;
        if (Math.abs(this.count) === 0) {
          this.count = this.thumbs.length - 1;
        } else if (0 < (ref = Math.abs(this.count)) && ref <= this.thumbs.length - 1) {
          this.count -= 1;
        }
        this._pagerAssy();
        return $(this.thumbsWrapL).animate({
          left: this.item_width * -1
        }, speed, EASING, function () {
          $(_this.thumbsWrapL).find(_this.first_thumb).before($(_this.thumbsWrapL).find(_this.last_thumb));
          $(_this.thumbsWrapL).css({
            left: _this.item_width * -2
          });
        });
      }
    }, {
      key: "rotateRight",
      value: function rotateRight(_speed) {
        var _this2 = this;

        var sabun = Math.abs(this.item_width * 3 + parseInt($(this.thumbsWrapL).css("left")));
        //let speed = !_flag ? this.speed : sabun * (FRAME_RATE / 100);
        // speed 飛ばす場合
        var speed = _speed ? _speed : this.speed;
        // カウントしてから版
        if (Math.abs(this.count) === this.thumbs.length - 1) {
          this.count = 0;
        } else {
          this.count += 1;
        }
        this._pagerAssy();
        return $(this.thumbsWrapL).animate({
          left: this.item_width * -3
        }, speed, EASING, function () {
          $(_this2.thumbsWrapL).find(_this2.last_thumb).after($(_this2.thumbsWrapL).find(_this2.first_thumb));
          $(_this2.thumbsWrapL).css({
            left: _this2.item_width * -2
          });
        });
      }

      // notice スマホを考慮しない 1+左右+1 版
    }, {
      key: "_rotateRight",
      value: function _rotateRight(_speed) {
        var _this3 = this;

        var sabun = Math.abs(this.item_width * 3 + parseInt($(this.thumbsWrapL).css("left")));
        //let speed = !_flag ? this.speed : sabun * (FRAME_RATE / 100);
        var speed = _speed ? _speed : this.speed;
        // 右発火したときに、先に置く
        $(this.thumbsWrapL).find(this.last_thumb).after($(this.thumbsWrapL).find(this.first_thumb));
        // CSSすりかえる
        $(this.thumbsWrapL).css({ left: this.item_width * -1 });
        return $(this.thumbsWrapL).animate({
          left: this.item_width * -2
        }, speed, EASING, function () {
          // SSすりかえしたあと、左同様のanimate
          $(_this3.thumbsWrapL).css({ left: _this3.item_width * -2 });
          // カウントあとの版
          if (Math.abs(_this3.count) === _this3.thumbs.length - 1) {
            _this3.count = 0;
          } else {
            _this3.count += 1;
          }
          _this3._pagerAssy();
        });
      }
    }, {
      key: "_initialPager",
      value: function _initialPager() {
        this.pager = $("#CarouselArea1").find(".pagerMaker1");
        this.pagerList = $(this.pager).find(".sliderThumbs");
        return $(this.pagerList).eq(0).addClass("active");
      }
    }, {
      key: "_pagerAssy",
      value: function _pagerAssy() {
        var _this4 = this;

        // add active class
        var j = null;
        $(this.pagerList).each(function (i, val) {
          j = _this4.count - 1;
          $(val).addClass("" + COUNT_CNAME + (i + 1));
          $(_this4.pagerList).eq(j).addClass("active");
          $(_this4.pagerList).eq(j).siblings().removeClass("active");
        });
      }
    }, {
      key: "clickSnippet",
      value: function clickSnippet() {
        // not use this
        var j = this.count;
        var href = $(this.thumbs).eq(j).find("a").attr("href");
        var target = $(this.thumbs).eq(j).find("a").attr("target");
      }
    }]);

    return CarouselAssyL;
  })();

  var timerID = void 0;

  // do it DRF
  $(function () {
    var carousel1 = new CarouselAssyL("ul#cycleList1", FRAME_RATE);
    var $sliderUL = $("ul#cycleList1");

    var initLoopFunc = function initLoopFunc() {
      carousel1.rotateRight();
    };
    var startTimeout = function startTimeout() {
      initLoopFunc();
      return timerID = setTimeout(startTimeout, STOP_RATE);
    };
    var stopTimeout = function stopTimeout() {
      return clearTimeout(timerID);
    };
    var resetTimeout = function resetTimeout() {
      if (!swns.isToggleStop) {
        stopTimeout();
        _.delay(startTimeout, STOP_RATE);
      }
    };
    var initial = function initial() {
      //$("div#h_resume a").hide();
      return $sliderUL.animate({
        opacity: 1
      }, FRAME_RATE, EASING);
    };
    var fncFireTouchMove = function fncFireTouchMove(e) {
      if (e) {
        e.preventDefault();
      }
      if (!$sliderUL.is(":animated")) {
        $sliderUL.css("left", function (i, val) {
          val = swns.diffX - swns.item_width * 2;
          return val;
        });
      }
    };
    var fncFireNext = function fncFireNext(e) {
      if (e) {
        e.preventDefault();
      }
      if (!$sliderUL.is(":animated")) {
        carousel1.rotateLeft();
        return false;
      }
      resetTimeout();
    };
    var fncFirePrev = function fncFirePrev(e) {
      if (e) {
        e.preventDefault();
      }
      if (!$sliderUL.is(":animated")) {
        carousel1.rotateRight();
        return false;
      }
      resetTimeout();
    };
    $("div#h_rotate-left1").on("click", function (e) {
      fncFireNext(e);
      return false;
    });
    $("div#h_rotate-right1").on("click", function (e) {
      fncFirePrev(e);
      return false;
    });
    var toggleStopFunc = function toggleStopFunc(_flag) {
      if (_flag) {
        $("div#h_resume a").show();
        swns.isToggleStop = true;
      } else {
        $("div#h_resume a").hide();
        swns.isToggleStop = false;
      }
    };
    $("div#pause a").on("click", function (e) {
      toggleStopFunc(true);
      stopTimeout();
      $("ul.cycleList").stop(true, true);
      return false;
    });
    $("div#h_resume a").on("click", function (e) {
      startTimeout();
      toggleStopFunc(false);
      return false;
    });
    // ------ Clone my DOM
    var thumbsClickFuncTest = function thumbsClickFuncTest(_elem) {
      var myClone = undefined;
      myClone = $(_elem).clone();
      $("#ovLay").append(myClone);
    };
    var getTouchHandler = function getTouchHandler() {
      var clkDefs = undefined,
          diffX = undefined,
          sTime = undefined,
          startX = undefined,
          timeBrank = undefined,
          touchDefs = undefined;
      sTime = 0;
      startX = 0;
      diffX = 0;
      touchDefs = 111;
      timeBrank = 123;
      clkDefs = 55;
      return function (e) {
        var t = undefined,
            touch = undefined;
        touch = e.originalEvent.touches[0];
        if (e.type === "touchstart") {
          startX = touch.pageX;
          return sTime = new Date().getTime();
        } else if (e.type === "touchmove") {
          e.preventDefault();
          diffX = touch.pageX - startX;
          swns.diffX = diffX;
          return fncFireTouchMove(e);
        } else if (e.type === "touchend") {
          t = new Date().getTime() - sTime;
          if (0 <= diffX && diffX < touchDefs || t < timeBrank) {} else if (diffX > touchDefs || t < timeBrank && diffX > clkDefs) {
            return fncFireNext(e);
          } else if (diffX < -touchDefs || t < timeBrank && diffX < -clkDefs) {
            return fncFirePrev(e);
          } else {}
        }
      };
    };
    var SMPevt = function SMPevt() {
      var touchHandler1 = getTouchHandler();
      $sliderUL.on("touchstart.box touchmove.box touchend.box", touchHandler1);
    };
    var initialEvt = function initialEvt() {
      /* arrow function内のthisは、関数が定義されたコンテキストのthisにバインドされるようです。
      これは var self = this; みたいなことをやっていたベストプラクティスが不要になるので
      基本的には歓迎なのですが、今回のようなケースでは困ることになります。 てっとり早いのはarrow functionをやめることです。
      */
      var $thumbsList = $sliderUL.find("li"); //$("ul#cycleList1 li");
      /*$thumbsList.each((i, ele)=> {
        //console.info($(ele).attr("class"));
       let getAttr = $(ele).attr("class");
       $(ele).hover(()=>{
          console.info("$each:mouseenter-> " + getAttr);
        }, ()=>{
          console.info("$each:mouseleave<- " + getAttr);
        })
      });*/
      // todo for
      /*for (let i = 0, l = $thumbsList.length; i < l; i++) {
        //console.info($($thumbsList[i]));
        let getAttr = $($thumbsList[i]).attr("class");
        getAttr = getAttr + ` index:${i}`;
        $($thumbsList[i]).hover(()=>{
          console.info(`for:mouseenter ${getAttr}`);
        }, ()=>{
          console.info(`for:mouseleave ${getAttr}`);
        })
      }*/

      // do it pager click event
      var $pager = $(".pagerMaker1 .sliderThumbs");
      /**
       *
       * @param {int} a
       * @param {int} b
       * @returns {string}
       */
      var count = function count(a, b) {
        if (a > b) {
          var num = a - b;
          _(num).times(function () {
            carousel1.rotateLeft(321);
          });
          resetTimeout();
          return "<-" + num;
        } else if (a < b) {
          var num = Math.abs(a - b);
          _(num).times(function () {
            carousel1.rotateRight(321);
          });
          resetTimeout();
          return num + "->";
        } else {
          return "<-->";
        }
      };
      $pager.on("click", function (e) {
        var nowCount = $pager.filter(".active").attr("class");
        var regexp = new RegExp(COUNT_CNAME + '(\\d+)', ''); // g
        var activeNum = nowCount.match(regexp);
        var thisCount = $(this).attr("class");
        thisCount = thisCount.match(regexp);
        if (activeNum !== void 0) {
          console.info("reg", regexp, "active", activeNum, "click", thisCount[1], count(activeNum[1] | 0, thisCount[1] | 0));
        }
        return false;
      });
    }; // initialEvt }

    if (doc.ontouchstart !== void 0 || doc.createTouch !== void 0) {
      SMPevt();
    } else {}
    initial();
    initialEvt();
    startTimeout();
  }); // DRF }

  win.__SWNS = {};
  win.__SWNS = swns;
  //export { exportObj };
})(jQuery, window, document);

// EOF

//# sourceMappingURL=_ES6.oreSilder-compiled.js.map