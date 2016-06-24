// Generated by CoffeeScript 1.9.2

/* sw cofee oreSlider v2016 */

/*<![CDATA[ */
"use strict";
(function($, win, doc) {
  var $doc, $win, COUNT_CNAME, CarouselAssyL, EASING, FRAME_RATE, STOP_RATE, swns, timerID;
  $win = $(win);
  $doc = $(doc);
  swns = {};
  FRAME_RATE = 567;
  STOP_RATE = 5678;
  COUNT_CNAME = "count";
  EASING = 'easeInOutExpo';
  CarouselAssyL = (function() {
    function CarouselAssyL(list, speed, _flag) {
      this.thumbsWrapL = $(list);
      this.thumbs = $(list).find("li");
      this.first_thumb = "li:first";
      this.last_thumb = "li:last";
      this.item_width = $(this.thumbs).outerWidth();
      swns.item_width = this.item_width;
      this.item_height = $(this.thumbs).outerHeight();
      this.left_value = this.item_width * (-2);
      $(this.thumbsWrapL).css("width", this.thumbs.length * this.item_width);
      $(this.thumbsWrapL).find(this.first_thumb).before($(this.thumbsWrapL).find(this.last_thumb));
      $(this.thumbsWrapL).css({
        left: this.left_value
      });
      this.count = 0;
      this.speed = speed;
      this._initialPager();
    }

    CarouselAssyL.prototype.rotateLeft = function(_speed) {
      var ref, sabun, self, speed;
      self = this;
      sabun = Math.abs(self.item_width + parseInt($(self.thumbsWrapL).css("left")));
      speed = _speed ? _speed : self.speed;
      ref = null;
      if (Math.abs(self.count) === 0) {
        self.count = self.thumbs.length - 1;
      } else if (0 < (ref = Math.abs(self.count)) && ref <= self.thumbs.length - 1) {
        self.count -= 1;
      }
      self._pagerAssy();
      return $(self.thumbsWrapL).animate({
        left: self.item_width * (-1)
      }, speed, EASING, function() {
        $(self.thumbsWrapL).find(self.first_thumb).before($(self.thumbsWrapL).find(self.last_thumb));
        return $(self.thumbsWrapL).css({
          left: self.item_width * (-2)
        });
      });
    };

    CarouselAssyL.prototype.rotateRight = function(_speed) {
      var sabun, self, speed;
      self = this;
      sabun = Math.abs((self.item_width * 3) + parseInt($(self.thumbsWrapL).css("left")));
      speed = _speed ? _speed : self.speed;
      if (Math.abs(self.count) === self.thumbs.length - 1) {
        self.count = 0;
      } else {
        self.count += 1;
      }
      self._pagerAssy();
      return $(self.thumbsWrapL).animate({
        left: self.item_width * (-3)
      }, speed, EASING, function() {
        $(self.thumbsWrapL).find(self.last_thumb).after($(self.thumbsWrapL).find(self.first_thumb));
        return $(self.thumbsWrapL).css({
          left: self.item_width * (-2)
        });
      });
    };

    CarouselAssyL.prototype._rotateRight = function(_speed) {
      var sabun, self, speed;
      self = this;
      sabun = Math.abs((self.item_width * 3) + parseInt($(self.thumbsWrapL).css("left")));
      speed = _speed ? _speed : self.speed;
      $(self.thumbsWrapL).find(self.last_thumb).after($(self.thumbsWrapL).find(self.first_thumb));
      $(self.thumbsWrapL).css({
        left: self.item_width * (-1)
      });
      return $(self.thumbsWrapL).animate({
        left: self.item_width * (-2)
      }, speed, EASING, function() {
        $(self.thumbsWrapL).css({
          left: self.item_width * (-2)
        });
        if (Math.abs(self.count) === self.thumbs.length - 1) {
          self.count = 0;
        } else {
          self.count += 1;
        }
        return self._pagerAssy();
      });
    };

    CarouselAssyL.prototype._initialPager = function() {
      var self;
      self = this;
      self.pager = $("#CarouselArea0").find(".pagerMaker0");
      self.pagerList = $(self.pager).find(".sliderThumbs");
      return $(self.pagerList).eq(0).addClass("active");
    };

    CarouselAssyL.prototype._pagerAssy = function() {
      var j, self;
      self = this;
      j = null;
      return $(self.pagerList).each(function(i, val) {
        j = self.count - 1;
        $(val).addClass("" + COUNT_CNAME + (i + 1));
        $(self.pagerList).eq(j).addClass("active");
        return $(self.pagerList).eq(j).siblings().removeClass("active");
      });
    };

    CarouselAssyL.prototype.clickSnippet = function() {
      var href, j, self, target;
      self = this;
      j = self.count;
      href = $(self.thumbs).eq(j).find("a").attr("href");
      return target = $(self.thumbs).eq(j).find("a").attr("target");
    };

    return CarouselAssyL;

  })();
  timerID = void 0;
  return $(function() {
    var $sliderUL, SMPevt, carousel1, fncFireNext, fncFirePrev, fncFireTouchMove, getTouchHandler, initLoopFunc, initial, initialEvt, resetTimeout, startTimeout, stopTimeout, thumbsClickFuncTest, toggleStopFunc;
    carousel1 = new CarouselAssyL("ul#cycleList0", FRAME_RATE);
    $sliderUL = $("ul#cycleList0");
    initLoopFunc = function() {
      return carousel1.rotateRight();
    };
    startTimeout = function() {
      initLoopFunc();
      return timerID = setTimeout(startTimeout, STOP_RATE);
    };
    stopTimeout = function() {
      return clearTimeout(timerID);
    };
    resetTimeout = function() {
      if (!swns.isToggleStop) {
        stopTimeout();
        return _.delay(startTimeout, STOP_RATE);
      }
    };
    initial = function() {
      return $sliderUL.animate({
        opacity: 1
      }, FRAME_RATE, EASING);
    };
    fncFireTouchMove = function(e) {
      if (e) {
        e.preventDefault();
      }
      if (!$sliderUL.is(":animated")) {
        return $sliderUL.css("left", function(i, val) {
          val = swns.diffX - swns.item_width * 2;
          return val;
        });
      }
    };
    fncFireNext = function(e) {
      if (e) {
        e.preventDefault();
      }
      if (!$sliderUL.is(":animated")) {
        carousel1.rotateLeft();
        return false;
      }
      return resetTimeout();
    };
    fncFirePrev = function(e) {
      if (e) {
        e.preventDefault();
      }
      if (!$sliderUL.is(":animated")) {
        carousel1.rotateRight();
        return false;
      }
      return resetTimeout();
    };
    $("div#h_rotate-left0").on("click", function(e) {
      fncFireNext(e);
      return false;
    });
    $("div#h_rotate-right0").on("click", function(e) {
      fncFirePrev(e);
      return false;
    });
    toggleStopFunc = function(_flag) {
      if (_flag) {
        $("div#h_resume a").show();
        return swns.isToggleStop = true;
      } else {
        $("div#h_resume a").hide();
        return swns.isToggleStop = false;
      }
    };
    $("div#pause a").on("click", function(e) {
      toggleStopFunc(true);
      stopTimeout();
      $("ul.cycleList").stop(true, true);
      return false;
    });
    $("div#h_resume a").on("click", function(e) {
      startTimeout();
      toggleStopFunc(false);
      return false;
    });
    thumbsClickFuncTest = function(_elem) {
      myClone;
      var myClone;
      myClone = $(_elem).clone();
      return $("#ovLay").append(myClone);
    };
    getTouchHandler = function(bool) {
      var clkDefs, diffX, sTime, startX, timeBrank, touchDefs;
      sTime = 0;
      startX = 0;
      diffX = 0;
      touchDefs = 111;
      timeBrank = 123;
      clkDefs = 55;
      return function(e) {

        /* .on用に変更〜 */
        var t, touch;
        touch = e.originalEvent.touches[0];
        if (e.type === "touchstart") {
          startX = touch.pageX;
          return sTime = (new Date()).getTime();
        } else if (e.type === "touchmove") {
          e.preventDefault();
          diffX = touch.pageX - startX;
          swns.diffX = diffX;
          return fncFireTouchMove(e, bool);
        } else if (e.type === "touchend") {
          t = (new Date()).getTime() - sTime;
          if ((0 <= diffX && diffX < touchDefs) || t < timeBrank) {

          } else if ((diffX > touchDefs) || (t < timeBrank && diffX > clkDefs)) {
            return fncFireNext(e, bool);
          } else if ((diffX < -touchDefs) || (t < timeBrank && diffX < -clkDefs)) {
            return fncFirePrev(e, bool);
          }
        }
      };
    };
    SMPevt = function() {
      var touchHandler;
      touchHandler = getTouchHandler();
      $sliderUL.on("touchstart.box touchmove.box touchend.box", touchHandler);
    };
    initialEvt = function() {
      var $pager, count;
      $pager = $(".pagerMaker0 .sliderThumbs");

      /*
       *
       * @param {int} a
       * @param {int} b
       * @returns {string}
       */
      count = function(a, b) {
        var num;
        if (a > b) {
          num = a - b;
          _(num).times(function() {
            return carousel1.rotateLeft(321);
          });
          resetTimeout();
          return "<-" + num;
        } else if (a < b) {
          num = Math.abs(a - b);
          _(num).times(function() {
            return carousel1.rotateRight(321);
          });
          resetTimeout();
          return num + "->";
        } else {
          return "<-->";
        }
      };
      return $pager.on("click", function(e) {
        var activeNum, nowCount, regexp, thisCount;
        nowCount = $pager.filter(".active").attr("class");
        regexp = new RegExp(COUNT_CNAME + '(\\d+)', '');
        activeNum = nowCount.match(regexp);
        thisCount = $(this).attr("class");
        thisCount = thisCount.match(regexp);
        if (activeNum !== void 0) {
          console.info("reg", regexp, "active", activeNum, "click", thisCount[1], count(activeNum[1] | 0, thisCount[1] | 0));
        }
        return false;
      });
    };
    if ((doc.ontouchstart !== void 0) || (doc.createTouch !== void 0)) {
      SMPevt();
    }
    initial();
    initialEvt();
    return startTimeout();
  });
})(jQuery, window, document);


/*]]> */

//# sourceMappingURL=_coffee.oreSilder.js.map
