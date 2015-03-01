/* The PostsDAO must be constructed with a connected database object */
function PostsDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof PostsDAO)) {
        console.log('Warning: PostsDAO constructor called without "new" operator');
        return new PostsDAO(db);
    }

    var posts = db.collection("posts");

    this.insertEntry = function (title, body, tags, author, fullauthor, callback) {
        "use strict";
        console.log("inserting blog entry: " + title + body);

        // fix up the permalink to not include whitespace
        var permalink = title.replace( /\s/g, '_' );
        permalink = permalink.replace( /\W/g, '' );

        // Build a new post
        var post = {"title": title,
                "author": author,
                "fullauthor" : fullauthor,
                "body": body,
                "permalink":permalink,
                "tags": tags,
                "comments": [],
                "date": new Date()};

        // now insert the post
        this.countPostByPermalink(permalink , function(err, count) {
            "use strict";

            if (err) return callback(err, null);

            if (count > 0) {
                return callback(new Error("PERMALINK_EXIST"), null);
            }

            posts.insert(post, function (err, result) {
                "use strict";

                if (err) return callback(err, null);

                console.log("Inserted new post");
                callback(err, permalink);
            });
        });
    };

    this.editEntry = function (permalink, title, body, tags, author, fullauthor, comments, date, callback) {
        "use strict";
        console.log("editing entry: " + title + body);

        // Build a new post
        var post = {
            "permalink": permalink,
            "title": title,
            "author": author,
            "fullauthor" : fullauthor,
            "body": body,
            "tags": tags,
            "comments": comments,
            "date": date
        };

        // now insert the post
        posts.update({permalink:permalink}, post, function (err, result) {
            "use strict";

            if (err) return callback(err, null);

            console.log("edit post with permalink " + permalink);
            callback(err, permalink);
        });
    };

    this.deleteEntry = function (permalink, author, callback) {
        "use strict";
        console.log("deleting entry: " + permalink);

        // now insert the post
        posts.remove({author: author, permalink:permalink}, function (err, result) {
            "use strict";

            if (err) return callback(err, null);

            console.log("delete post with permalink: " + permalink + ", by: " + author);
            callback(err, permalink);
        });
    };

    this.getPosts = function(num, callback) {
        "use strict";

        posts.find().sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    };

    this.countPostByPermalink = function(permalink, callback) {
        "use strict"

        posts.count({permalink: permalink}, function(err, count){
            "use strict"
            if (err) return callback(err, null);
            console.log("found " + count + " post");
            callback(null, count);
        });
    };

    this.getPostsByTag = function(tag, num, callback) {
        "use strict";

        posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    };

    this.getPostByPermalink = function(permalink, callback) {
        "use strict";
        posts.findOne({'permalink': permalink}, function(err, post) {
            "use strict";

            if (err) return callback(err, null);

            // XXX: Look here for final exam to see where we store "num_likes"

            // fix up likes values. set to zero if data is not present
            if (!post) {
                return callback(new Error("The permalink: " + permalink + " not exist"), null);
            }

            if (typeof post.comments === 'undefined') {
                post.comments = [];
            }

            // Each comment document in a post should have a "num_likes" entry, so we have to
            // iterate all the comments in the post to make sure that is the case
            for (var i = 0; i < post.comments.length; i++) {
                if (typeof post.comments[i].num_likes === 'undefined') {
                    post.comments[i].num_likes = 0;
                }
                post.comments[i].comment_ordinal = i;
            }
            callback(err, post);
        });
    };

    this.addComment = function(permalink, name, email, body, callback) {
        "use strict";

        var comment = {'author': name, 'body': body};

        if (email != "") {
            comment['email'] = email
        }

        posts.update({'permalink': permalink}, {'$push': {'comments': comment}}, function(err, numModified) {
            "use strict";

            if (err) return callback(err, null);

            callback(err, numModified);
        });
    };

    this.incrementLikes = function(permalink, comment_ordinal, callback) {
        "use strict";

        // The "comment_ordinal" argument specifies which comment in the post we are looking at
        // Here is an example of how to build a selector with the 'comment_ordinal' variable
        // We have to do it this way because a literal object with variables in field names such as:
        // { 'comments.' + comment_ordinal + '.author' : 'Frank' } is illegal Javascript.
        var selector = {};
        var comment_ordinal_example = 0;
        //selector_example['comments.' + comment_ordinal_example + '.author'] = 'Frank';
	      //selector.comments = { $slice: [comment_ordinal, 1] };
	      selector['comments.' + comment_ordinal + '.num_likes'] = 1;
        // Now selector_example = { 'comments.0.author' : 'Frank' } which is a selector for the
        // string 'Frank' in the 'author' field of the first element of the 'comments' array (which
        // is zero indexed).

        // TODO: Final exam question - Increment the number of likes
	      posts.update({permalink: permalink }, {$inc: selector}, function(err, updated){
		      if (err) return callback(err, null);
		      return callback(err, updated);
	      });
        //callback(Error("incrementLikes NYI"), null);
    }
}

module.exports.PostsDAO = PostsDAO;
