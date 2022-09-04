function solution() {
  class Post {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }
    toString() {
      return `Post: ${this.title}\nContent: ${this.content}`;
    }
  }

  class SocialMediaPost extends Post {
    constructor(title, content, likes, dislikes) {
      super(title, content);
      this.likes = likes;
      this.dislikes = dislikes;
      this.comments = [];
    }
    addComment(comment) {
      return this.comments.push(comment);
    }

    toString() {
      let superRating = super.toString();
      let rating = this.likes - this.dislikes;
      if (this.comments.length > 0) {
        let commentsText = "";
        for (let comment of this.comments) {
          commentsText += `\n * ${comment}`;
        }
        return superRating + `\nRating: ${rating}\nComments:${commentsText}`;
      } else {
        return superRating + `\nRating: ${rating}`;
      }
    }
  }

  class BlogPost extends Post {
    constructor(title, content, views) {
      super(title, content);
      this.views = views;
    }

    view() {
      return ++this.views;
    }

    toString() {
      return super.toString() + `\nViews: ${this.views}`;
    }
  }

  return { Post, SocialMediaPost, BlogPost };
}
let classes = solution();
let viewPost = new classes.BlogPost("Title", "Content", 3);
console.log(viewPost);
console.log(viewPost.view());
console.log(viewPost.view());
console.log(viewPost.toString());
