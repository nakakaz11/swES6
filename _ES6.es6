/* ES6

let exportObj = swns;
export { exportObj };
*/
"use strict";

//import { exportObj } from '_ES6.oreSilder.es6';

(($, win, doc)=> {    // JQ ES6 sw Pack

  let $win = $(win),
      $doc = $(doc),
      swns = {
        theDate() {
          let H, M, S, d, day, m, today, w, y;
          today = new Date();
          day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          y = today.getFullYear();
          m = today.getMonth() + 1;
          d = today.getDate();
          w = today.getDay();
          H = today.getHours();
          M = today.getMinutes();
          S = today.getSeconds();
          if (m < 10) { m = "0" + m; }
          if (d < 10) { d = "0" + d; }
          if (H < 10) { H = "0" + H; }
          if (M < 10) { M = "0" + M; }
          if (S < 10) { S = "0" + S; }
          return `${day[w]}:` + m + "/" + d + "/" + H + ":" + M + "." + S;
        },
        /**
         *
         * @param url
         * @param dataType
         * @returns {*}
         */
        defAjax(url, dataType) {
          let dfr; dfr = $.Deferred();
          $.ajax({
            url: url,
            dataType: "json",
            success: dfr.resolve
          });
          return dfr.promise();
        }
      }; // swns

  // do it DRF
  $(()=> {

    $.when(swns.defAjax("/_jsFiddle_/swJSON/json.php"))
      .done((data, status, jqXHR)=>{
        let strJSON = JSON.stringify(data);
        //console.info("DeferredGet\n", strJSON);
        let insertJSONbyMax = JSON.parse(strJSON);
        insertJSONbyMax = _.max(insertJSONbyMax, (obj)=>{ return (obj.cid) | 0; });
        console.info("PickByMaxjson_col\n", JSON.parse(insertJSONbyMax.json_col));
        insertJSONbyMax = _.omit(insertJSONbyMax, "json_col");
        insertJSONbyMax = JSON.stringify(insertJSONbyMax);

        $.ajax({
          url    : "/_jsFiddle_/swJSON/json.php",
          type   : "POST",
          data   : {
            action   : "new",
            tillday  : swns.theDate(),
            ctype    : "asdf",
            json_col : insertJSONbyMax,
            price1   : 100 + Math.floor(Math.random() * 123),
            price2   : 100 + Math.floor(Math.random() * 4567)
            //price3 : "",
            //price4 : "",
            //price5 : "",
            //price6 : "",
            //price7 : ""
          }
        }).done((data, status, jqXHR)=> {});

    }).fail((jqXHR, status, error)=>{}); // when

    console.info("exportObj", win.__SWNS);


    $.ajax({
      // Header set Access-Control-Allow-Origin "http://www.samuraiworks.org"
      url     : "http://data.samuraiworks.org/swOreParallaxScaffold/simpleFiddle.html",
      type    : "GET",
      timeout : 1000,
      cache   : false,
      datatype: "html"
    }).done((data)=> {
      let _res = $($.parseHTML(data));
      _res = _res.filter("div.getAjax");
      console.info("$_resData", $(_res)[0] );
    }).fail((jqXHR, status, error)=> { console.info("$.ajax:fail"); });


  }); // DRF }
})(jQuery, window, document);






// Expression bodies
//var odds = evens.map(v => v + 1);
//var nums = evens.map((v, i) => v + i);
//var pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
/*nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});*/


/*let MYAPP = MYAPP || {};
MYAPP.name = "My First SPA";
MYAPP.data = "2015/06/25";
MYAPP.Update = function(a){
  return a;
};
MYAPP.Delete = function(b){
  return b;
};

// オブジェクトのコンテナ
MYAPP.modules = {};
MYAPP.modules.name = "My First SPA's first module";
MYAPP.modules.data = {
  1 : "test",
  2 : "test2",
  3 : "test3"
};*/
//console.info("MYAPP", MYAPP);



// () => {}で関数を記述。thisにバインドされる。
/**
 *
 * @type {string[]}
 */
var a1 = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl lium"
];

// http://qiita.com/KENJU/items/c7fad62a12cc2809b507
// sw itar ita
function forFor(){
  for (var i = 0, _l = a1.length; i < _l; i++) {
    var obj = a1[i];
    console.info(obj);
  }
}
//forFor();

//var a2 = a1.map(function(s){ return s.length });
var a3 = a1.map( s => s.length );
console.info( //"a2", a2,
  "a3", a3);

// objectリテラルを返すためには括弧で囲むことを覚えてください。
//var func = () => {  foo: 1  };               // Calling func() returns undefined!
var func = () => ({ foo: 1 });


// http://gao-tec.seesaa.net/article/420477038.html

class Square {
  constructor(x, y, size, v) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.v = v;
    this.angle = -v;
  }
  rotate() {
    this.angle += this.v;
  }
}

function *SquareAnim(ctx, x, y, size, v, color) {
  var square = new Square(x, y, size, v);

  while (true) {
    ctx.fillStyle = color;
    square.rotate();

    ctx.save();
    ctx.translate(square.x + square.size / 2, square.y + square.size / 2);
    ctx.rotate(square.angle);
    ctx.translate(-(square.x + square.size / 2), -(square.y + square.size / 2));
    ctx.fillRect(square.x, square.y, square.size, square.size);
    ctx.restore();
    yield;
  }

}
 
jQuery(function ($) {
  var canv = $("#field");
  var ctx = canv[0].getContext("2d");

  var sqAnims = [
    SquareAnim(ctx, 30, 50, 50, (2 * Math.PI) / 600, "#ff0000"),
    SquareAnim(ctx, 120, 50, 50, -(2 * Math.PI) / 1200, "#0000ff")
  ];
  var loop = ()=> {
    ctx.clearRect(0, 0, canv[0].width, canv[0].height);
    sqAnims.forEach((e, i)=> {
      e.next();
    });
    requestAnimationFrame(loop);
  };
  // fixme とめておく
  //loop();
});

// ジェネレータ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function *gen() {
  yield 1;
  yield 1;
  yield 4;
  yield 5;
  yield 1;
  yield 4;
}

var output = "";
for (let v of gen()) {
  output += v;
}
//console.log(output); // "114514"


// https://1000ch.net/posts/2013/es6-features-1.html

const fib = function* () {
  let prev = 0;
  let curr = 1;
  while (true) {
    prev = curr;
    curr = prev + curr;
    yield curr;
  }
};
var seq = fib();
//console.log(seq.next()); // {value: 1, done: false}
//console.log(seq.next()); // {value: 2, done: false}
//console.log(seq.next()); // {value: 3, done: false}
//console.log(seq.next()); // {value: 5, done: false}
//console.log(seq.next()); // {value: 8, done: false}

for (var seq2 of fib()) {
  if (seq2 > 1000) {
    break;
  }
  //console.info(seq2);
}
var array = [1, 10, 100, 1000, 10000];
var data = {
  a: 10,
  b: 20,
  c: 30
};
const entries = function* (obj) {
  var keys = Object.keys(obj);
  for (let i = 0, len = keys.length; i < len; i++) {
    yield  [obj[keys[i]], keys[i]];
  }
};
for (let item of entries(data)) {  // obj
  console.info("OBJ,KEY", item);
}
_.each(data, (v,k,l)=> console.info(v, k));

function swTest2(){
  for (var item of array) {  //array
    console.info(item);
  }
}
//swTest2();




// class
class Foo {
  constructor(bazz) {
    this.bazz = bazz;
  }

  getBazz() {
    return this.bazz;
  }

  static hello(word = "hello") {
    return word;
  }
}

let foo = new Foo("getBazz");
//console.debug(foo.getBazz());
//console.debug(Foo.hello("nakakazChan"));