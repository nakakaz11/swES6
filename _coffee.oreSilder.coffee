### sw cofee oreSlider v2016 ###
###<![CDATA[###
"use strict"
do ($ = jQuery, win = window, doc = document) ->
  # init Assy
  $win = $(win)
  $doc = $(doc)
  swns = {
  }
  #win.__SWNS = swns

  FRAME_RATE = 567
  STOP_RATE  = 5678         # 9110 だいたい4秒？
  COUNT_CNAME  = "count"
  EASING     = 'easeInOutExpo'
  #EASING     = 'easeOutExpo'
  #EASING     = 'easeInOutBack'

  class CarouselAssyL
     constructor: (list, speed, _flag) ->
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

     rotateLeft: (_speed)->
       self = @
       sabun = Math.abs(self.item_width + parseInt($(self.thumbsWrapL).css("left")));
       #speed = !_flag ? self.speed : sabun * (FRAME_RATE / 100);
       # speed 飛ばす場合
       speed = if _speed then _speed else self.speed;
       # カウントしてから版
       ref = null;
       if (Math.abs(self.count) is 0)
         self.count = self.thumbs.length - 1;
       else if ((0 < (ref = Math.abs(self.count)) && ref <= self.thumbs.length - 1))
         self.count -= 1;
       self._pagerAssy();
       return $(self.thumbsWrapL).animate({
         left: self.item_width * (-1)
       }, speed, EASING, ()->
         $(self.thumbsWrapL).find(self.first_thumb).before($(self.thumbsWrapL).find(self.last_thumb));
         $(self.thumbsWrapL).css({
           left: self.item_width * (-2)
         });
        );

     rotateRight: (_speed)->
       self = @
       sabun = Math.abs((self.item_width * 3) + parseInt($(self.thumbsWrapL).css("left")));
       #speed = !_flag ? self.speed : sabun * (FRAME_RATE / 100);
       # speed 飛ばす場合
       speed = if _speed then _speed else self.speed;
       # カウントしてから版
       if (Math.abs(self.count) is self.thumbs.length - 1)
         self.count = 0;
       else
         self.count += 1;
       self._pagerAssy();
       return $(self.thumbsWrapL).animate({
         left: self.item_width * (-3)
       }, speed, EASING, ()->
          $(self.thumbsWrapL).find(self.last_thumb).after($(self.thumbsWrapL).find(self.first_thumb));
          $(self.thumbsWrapL).css({
            left: self.item_width * (-2)
          });
        );

      # notice スマホを考慮しない 1+左右+1 版
     _rotateRight: (_speed)->
        self = @
        sabun = Math.abs((self.item_width * 3) + parseInt($(self.thumbsWrapL).css("left")));
        #speed = !_flag ? self.speed : sabun * (FRAME_RATE / 100);
        speed = if _speed then _speed else self.speed;
        # 右発火したときに、先に置く
        $(self.thumbsWrapL).find(self.last_thumb).after($(self.thumbsWrapL).find(self.first_thumb));
        # CSSすりかえる
        $(self.thumbsWrapL).css({ left: self.item_width * (-1) });
        return $(self.thumbsWrapL).animate({
          left: self.item_width * (-2)
        }, speed, EASING, ()->
          # SSすりかえしたあと、左同様のanimate
          $(self.thumbsWrapL).css({ left: self.item_width * (-2) });
          # カウントあとの版
          if (Math.abs(self.count) is self.thumbs.length - 1)
            self.count = 0;
          else
            self.count += 1;
          self._pagerAssy();
        );

     _initialPager : ()->
       self = @
       self.pager = $("#CarouselArea0").find(".pagerMaker0");
       self.pagerList = $(self.pager).find(".sliderThumbs");
       return $(self.pagerList).eq(0).addClass("active");

     _pagerAssy: ()->
       self = @
       # add active class
       j = null;
       $(self.pagerList).each((i, val)->
         j = self.count - 1;
         $(val).addClass("#{COUNT_CNAME}#{i + 1}");
         $(self.pagerList).eq(j).addClass("active");
         $(self.pagerList).eq(j).siblings().removeClass("active");
       );

     clickSnippet: ()->   # not use this
       self = @
       j = self.count;
       href = $(self.thumbs).eq(j).find("a").attr("href");
       target = $(self.thumbs).eq(j).find("a").attr("target");


  timerID    = undefined
  # Do it DRF
  #jQuery ($) ->
  $ ->

    carousel1 = new CarouselAssyL("ul#cycleList0", FRAME_RATE);
    $sliderUL = $("ul#cycleList0");

    initLoopFunc = ()->
      carousel1.rotateRight();

    startTimeout = ()->
      initLoopFunc();
      return timerID = setTimeout(startTimeout, STOP_RATE);

    stopTimeout = ()->
      return clearTimeout(timerID);
      
    resetTimeout = ()->
      if (!swns.isToggleStop)
        stopTimeout();
        _.delay(startTimeout, STOP_RATE);

    initial = ()->
      #$("div#h_resume a").hide();
      return $sliderUL.animate({
        opacity: 1
      }, FRAME_RATE, EASING );

    fncFireTouchMove = (e)->
      if (e) then  e.preventDefault()
      if (!$sliderUL.is(":animated"))
        $sliderUL.css("left", (i, val)->
          val = swns.diffX - swns.item_width * 2;
          return val;
        )
    fncFireNext = (e)->
      if (e) then  e.preventDefault()
      if (!$sliderUL.is(":animated"))
        carousel1.rotateLeft();
        return false;
      resetTimeout();

    fncFirePrev = (e)->
      if (e) then  e.preventDefault()
      if (!$sliderUL.is(":animated"))
        carousel1.rotateRight();
        return false;
      resetTimeout();

    $("div#h_rotate-left0").on("click", (e)->
      fncFireNext(e);
      return false;
    )
    $("div#h_rotate-right0").on("click", (e)->
      fncFirePrev(e);
      return false;
    )
    toggleStopFunc = (_flag)->
      if (_flag)
        $("div#h_resume a").show();
        swns.isToggleStop = true;
      else
        $("div#h_resume a").hide();
        swns.isToggleStop = false;

    $("div#pause a").on("click", (e)->
      toggleStopFunc(true);
      stopTimeout();
      $("ul.cycleList").stop(true, true);
      return false;
    )
    $("div#h_resume a").on("click", (e)->
      startTimeout();
      toggleStopFunc(false);
      return false;
    )
    # ------ Clone my DOM
    thumbsClickFuncTest = (_elem)->
      myClone;
      myClone = $(_elem).clone();
      $("#ovLay").append(myClone);

    getTouchHandler = (bool)->
      sTime  = 0
      startX = 0
      diffX  = 0
      touchDefs = 111
      timeBrank = 123
      clkDefs   = 55
      return (e)->
        ### .on用に変更〜 ###
        #touch = e.touches[0]
        touch = e.originalEvent.touches[0]
        if (e.type is "touchstart")
          startX = touch.pageX
          sTime = (new Date()).getTime()         #開始時間
        else if (e.type is "touchmove")
          e.preventDefault()
          diffX = touch.pageX - startX
          swns.diffX = diffX
          fncFireTouchMove(e, bool)
        else if (e.type is "touchend")
          t = (new Date()).getTime() - sTime      #時間差分
          # touchDefs未満移動したか、timeBrank ミリ秒以内ならばスルー
          return  if 0 <= diffX < touchDefs or t < timeBrank
          # touchDefs以上移動したか、timeBrank ミリ秒以内にclkDefs以上移動したらフリックと判定
          else if (diffX > touchDefs) or (t < timeBrank and diffX > clkDefs)
            fncFireNext(e, bool)
          else if (diffX < - touchDefs) or (t < timeBrank and diffX < - clkDefs)
            fncFirePrev(e, bool)
          # それ以外もスルー
          else return

        #SMPDebugEventTest(e)  # fixme（ D_E_B_U_G ）
        #return  if (e.type is "click")
        #e.stopPropagation()

    SMPevt = ->
      touchHandler = getTouchHandler()
      $sliderUL.on( "touchstart.box touchmove.box touchend.box", touchHandler )
      return

    initialEvt = ->
      # do it pager click event
      $pager = $(".pagerMaker0 .sliderThumbs");
      ###
       *
       * @param {int} a
       * @param {int} b
       * @returns {string}
      ###
      count =(a, b)->
        if (a > b)
          num = a - b;
          _(num).times(()-> carousel1.rotateLeft(321) );
          resetTimeout();
          return "<-#{num}";
        else if (a < b)
          num = Math.abs(a - b);
          _(num).times(()-> carousel1.rotateRight(321) );
          resetTimeout();
          return "#{num}->";
        else
          return "<-->";

      $pager.on("click", (e)->
        nowCount = $pager.filter(".active").attr("class");
        regexp = new RegExp(COUNT_CNAME + '(\\d+)', '');  # g
        activeNum = nowCount.match(regexp);
        thisCount = $(this).attr("class");
        thisCount = thisCount.match(regexp);
        if (activeNum isnt undefined)
          console.info("reg", regexp, "active", activeNum,"click", thisCount[1], count(activeNum[1] | 0, thisCount[1] | 0));
        return false;
      );

    # タッチデバイスからのアクセス
    if (doc.ontouchstart isnt undefined) or (doc.createTouch isnt undefined) then SMPevt()

    initial()
    initialEvt()
    startTimeout()


###]]>###
