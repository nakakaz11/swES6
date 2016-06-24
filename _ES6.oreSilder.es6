/* sw ES6 151202 */
"use strict";
(($, win, doc)=> {
  let $win = $(win),
      $doc = $(doc),
      swns = {};

  const FRAME_RATE = 567,
        STOP_RATE  = 5678,
        COUNT_CNAME  = "count",
        EASING     = 'easeOutExpo';

  class CarouselAssyL {
    constructor(list, speed, _flag) {
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
    rotateLeft(_speed) {
      let sabun = Math.abs(this.item_width + parseInt($(this.thumbsWrapL).css("left")));
      //let speed = !_flag ? this.speed : sabun * (FRAME_RATE / 100);
      // speed 飛ばす場合
      let speed = _speed ? _speed : this.speed;
      // カウントしてから版
      let ref;
      if (Math.abs(this.count) === 0) {
        this.count = this.thumbs.length - 1;
      } else if ((0 < (ref = Math.abs(this.count)) && ref <= this.thumbs.length - 1)) {
        this.count -= 1;
      }
      this._pagerAssy();
      return $(this.thumbsWrapL).animate({
        left: this.item_width * (-1)
      }, speed, EASING, ()=> {
        $(this.thumbsWrapL).find(this.first_thumb).before($(this.thumbsWrapL).find(this.last_thumb));
        $(this.thumbsWrapL).css({
          left: this.item_width * (-2)
        });
      });
    }
    rotateRight(_speed) {
      let sabun = Math.abs((this.item_width * 3) + parseInt($(this.thumbsWrapL).css("left")));
      //let speed = !_flag ? this.speed : sabun * (FRAME_RATE / 100);
      // speed 飛ばす場合
      let speed = _speed ? _speed : this.speed;
      // カウントしてから版
      if (Math.abs(this.count) === this.thumbs.length - 1) {
        this.count = 0;
      } else {
        this.count += 1;
      }
      this._pagerAssy();
      return $(this.thumbsWrapL).animate({
        left: this.item_width * (-3)
      }, speed, EASING, ()=> {
        $(this.thumbsWrapL).find(this.last_thumb).after($(this.thumbsWrapL).find(this.first_thumb));
        $(this.thumbsWrapL).css({
          left: this.item_width * (-2)
        });
      });
    }
    // notice スマホを考慮しない 1+左右+1 版 
    _rotateRight(_speed) {
      let sabun = Math.abs((this.item_width * 3) + parseInt($(this.thumbsWrapL).css("left")));
      //let speed = !_flag ? this.speed : sabun * (FRAME_RATE / 100);
      let speed = _speed ? _speed : this.speed;
      // 右発火したときに、先に置く
      $(this.thumbsWrapL).find(this.last_thumb).after($(this.thumbsWrapL).find(this.first_thumb));
      // CSSすりかえる
      $(this.thumbsWrapL).css({ left: this.item_width * (-1) });
      return $(this.thumbsWrapL).animate({
        left: this.item_width * (-2)
      }, speed, EASING, ()=> {
        // SSすりかえしたあと、左同様のanimate
        $(this.thumbsWrapL).css({ left: this.item_width * (-2) });
        // カウントあとの版
        if (Math.abs(this.count) === this.thumbs.length - 1) {
          this.count = 0;
        } else {
          this.count += 1;
        }
        this._pagerAssy();
      });
    }
    _initialPager() {
      this.pager = $("#CarouselArea1").find(".pagerMaker1");
      this.pagerList = $(this.pager).find(".sliderThumbs");
      return $(this.pagerList).eq(0).addClass("active");
    }
    _pagerAssy() {
      // add active class
      let j = null;
      $(this.pagerList).each((i, val)=> {
        j = this.count - 1;
        $(val).addClass(`${COUNT_CNAME}${i + 1}`);
        $(this.pagerList).eq(j).addClass("active");
        $(this.pagerList).eq(j).siblings().removeClass("active");
      });
    }
    clickSnippet() { // not use this
      let j = this.count;
      let href = $(this.thumbs).eq(j).find("a").attr("href");
      let target = $(this.thumbs).eq(j).find("a").attr("target");
    }
  } // CarouselAssyL }

  let timerID = void 0;

  // do it DRF
  $(()=> {
    let carousel1 = new CarouselAssyL("ul#cycleList1", FRAME_RATE);
    let $sliderUL = $("ul#cycleList1");

    let initLoopFunc = ()=> {
      carousel1.rotateRight();
    };
    let startTimeout = ()=> {
      initLoopFunc();
      return timerID = setTimeout(startTimeout, STOP_RATE);
    };
    let stopTimeout = ()=> {
      return clearTimeout(timerID);
    };
    let resetTimeout = ()=> {
      if (!swns.isToggleStop) {
        stopTimeout();
        _.delay(startTimeout, STOP_RATE);
      }
    };
    let initial = ()=> {
      //$("div#h_resume a").hide();
      return $sliderUL.animate({
        opacity: 1
      }, FRAME_RATE, EASING);
    };
    let fncFireTouchMove = (e)=> {
      if (e) { e.preventDefault(); }
      if (!$sliderUL.is(":animated")) {
        $sliderUL.css("left", (i, val)=> {
          val = swns.diffX - swns.item_width * 2;
          return val;
        });
      }
    };
    let fncFireNext = (e)=> {
      if (e) { e.preventDefault(); }
      if (!$sliderUL.is(":animated")) {
        carousel1.rotateLeft();
        return false;
      }
      resetTimeout();
    };
    let fncFirePrev = (e)=> {
      if (e) { e.preventDefault(); }
      if (!$sliderUL.is(":animated")) {
        carousel1.rotateRight();
        return false;
      }
      resetTimeout();
    };
    $("div#h_rotate-left1").on("click", (e)=> {
      fncFireNext(e);
      return false;
    });
    $("div#h_rotate-right1").on("click", (e)=> {
      fncFirePrev(e);
      return false;
    });
    let toggleStopFunc = (_flag)=> {
      if (_flag) {
        $("div#h_resume a").show();
        swns.isToggleStop = true;
      } else {
        $("div#h_resume a").hide();
        swns.isToggleStop = false;
      }
    };
    $("div#pause a").on("click", (e)=> {
      toggleStopFunc(true);
      stopTimeout();
      $("ul.cycleList").stop(true, true);
      return false;
    });
    $("div#h_resume a").on("click", (e)=> {
      startTimeout();
      toggleStopFunc(false);
      return false;
    });
    // ------ Clone my DOM
    let thumbsClickFuncTest = (_elem)=> {
      let myClone;
      myClone = $(_elem).clone();
      $("#ovLay").append(myClone);
    };
    let getTouchHandler = ()=> {
      let clkDefs, diffX, sTime, startX, timeBrank, touchDefs;
      sTime = 0;
      startX = 0;
      diffX = 0;
      touchDefs = 111;
      timeBrank = 123;
      clkDefs = 55;
      return (e)=> {
        let t, touch;
        touch = e.originalEvent.touches[0];
        if (e.type === "touchstart") {
          startX = touch.pageX;
          return sTime = (new Date()).getTime();
        } else if (e.type === "touchmove") {
          e.preventDefault();
          diffX = touch.pageX - startX;
          swns.diffX = diffX;
          return fncFireTouchMove(e);
        } else if (e.type === "touchend") {
          t = (new Date()).getTime() - sTime;
          if ((0 <= diffX && diffX < touchDefs) || t < timeBrank) {
          } else if ((diffX > touchDefs) || (t < timeBrank && diffX > clkDefs)) {
            return fncFireNext(e);
          } else if ((diffX < -touchDefs) || (t < timeBrank && diffX < -clkDefs)) {
            return fncFirePrev(e);
          } else {
          }
        }
      };
    };
    let SMPevt = ()=> {
      let touchHandler1 = getTouchHandler();
      $sliderUL.on("touchstart.box touchmove.box touchend.box", touchHandler1);
    };
    let initialEvt = ()=> {
      /* arrow function内のthisは、関数が定義されたコンテキストのthisにバインドされるようです。
      これは var self = this; みたいなことをやっていたベストプラクティスが不要になるので
      基本的には歓迎なのですが、今回のようなケースでは困ることになります。 てっとり早いのはarrow functionをやめることです。
      */
      let $thumbsList = $sliderUL.find("li"); //$("ul#cycleList1 li");
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
      let $pager = $(".pagerMaker1 .sliderThumbs");
      /**
       *
       * @param {int} a
       * @param {int} b
       * @returns {string}
       */
      let count =(a, b)=>{
        if (a > b) {
          let num = a - b;
          _(num).times(()=>{ carousel1.rotateLeft(321); });
          resetTimeout();
          return `<-${num}`;
        } else if (a < b) {
          let num = Math.abs(a - b);
          _(num).times(()=>{ carousel1.rotateRight(321); });
          resetTimeout();
          return `${num}->`;
        } else {
          return `<-->`;
        }
      };
      $pager.on("click", function (e) {
        let nowCount = $pager.filter(".active").attr("class");
        let regexp = new RegExp(COUNT_CNAME + '(\\d+)', '');  // g
        let activeNum = nowCount.match(regexp);
        let thisCount = $(this).attr("class");
        thisCount = thisCount.match(regexp);
        if ( activeNum !== void 0) {
          console.info("reg", regexp, "active", activeNum, "click", thisCount[1], count(activeNum[1] | 0, thisCount[1] | 0));
        }
        return false;
      });
      
    }; // initialEvt }

    if ((doc.ontouchstart !== void 0) || (doc.createTouch !== void 0)) {
      SMPevt();
    } else {
    }
    initial();
    initialEvt();
    startTimeout();


  }); // DRF }


  win.__SWNS = {};
  win.__SWNS = swns;
  //export { exportObj };

})(jQuery, window, document);


// EOF