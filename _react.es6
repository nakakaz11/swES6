/* react ES6 */

let dx = 0;
let dy = 0;
let data = [
  {
    "id"    : 1388534400000,
    "author": null,
    "text"  : null
  },
  {
    "id"    : 1420070400000,
    "author": "Paul O’Shannessy",
    "text"  : "React is *great*! \n ###This is *another* comment"
  }];

var CommentBox = React.createClass({
  getInitialState() {
      return {data: []};
  },
  getMouseMove() {
    $("body").mousemove(function (e) {
      dx = e.clientX;
      dy = e.clientY;
    });
    data[0].author = `dx=${dx}`;
    data[0].text   = `dy=${dy}`;
    //console.info(data[0].author);
    this.setState({data: data});
  },
  componentDidMount() {
    this.getMouseMove();
    setInterval(this.getMouseMove, this.props.pollInterval);
  },
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render() {
    var commentNodes = this.props.data.map((comment)=> {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data={data} pollInterval={777} />,
  document.getElementById("content")
);



// EOF