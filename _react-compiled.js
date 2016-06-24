/* react ES6 */

"use strict";

var dx = 0;
var dy = 0;
var data = [{
  "id": 1388534400000,
  "author": null,
  "text": null
}, {
  "id": 1420070400000,
  "author": "Paul O’Shannessy",
  "text": "React is *great*! \n ###This is *another* comment"
}];

var CommentBox = React.createClass({
  displayName: "CommentBox",

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  getMouseMove: function getMouseMove() {
    $("body").mousemove(function (e) {
      dx = e.clientX;
      dy = e.clientY;
    });
    data[0].author = "dx=" + dx;
    data[0].text = "dy=" + dy;
    //console.info(data[0].author);
    this.setState({ data: data });
  },
  componentDidMount: function componentDidMount() {
    this.getMouseMove();
    setInterval(this.getMouseMove, this.props.pollInterval);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "commentBox" },
      React.createElement(
        "h1",
        null,
        "Comments"
      ),
      React.createElement(CommentList, { data: this.state.data })
    );
  }
});

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.author, key: comment.id },
        comment.text
      );
    });
    return React.createElement(
      "div",
      { className: "commentList" },
      commentNodes
    );
  }
});

var Comment = React.createClass({
  displayName: "Comment",

  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "h2",
        { className: "commentAuthor" },
        this.props.author
      ),
      React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
    );
  }
});

ReactDOM.render(React.createElement(CommentBox, { data: data, pollInterval: 777 }), document.getElementById("content"));

// EOF

//# sourceMappingURL=_react-compiled.js.map