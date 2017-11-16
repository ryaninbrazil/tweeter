$(function() {
    
    var tweetData = [
        {
            "user": {
            "name": "Newton",
            "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
        },
        {
        "user": {
            "name": "Descartes",
            "avatars": {
            "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
            "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
            "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
        },
        {
        "user": {
            "name": "Johann von Goethe",
            "avatars": {
            "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
            "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
            "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
        },
        "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368        
        }
    ];

   
    
    // going to take data, and return a jQuery element
    function createTweetElement(tweet) {
        return `
        <article class="tweet">
            <header>
                <img class="profile-picture" src="${tweet.user.avatars.regular}" />
                <span class="name">${tweet.user.name}</span>
                <span class="userName">${tweet.user.handle}</span>
            </header>
            <div>
                <p class="user-tweet">${tweet.content.text}</p>
            </div>
            <footer>
               <span class="posted-on">${tweet.created_at}</span>
                <div class="icons">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
            </footer>
        </article>`;
    }
    
function renderTweets(tweets) { // tweets is an Array if Tweet Objects       
    for (var i = 0; i < tweets.length; i++) {
     // console.log(i);
    var tweet = tweets[i]; // Gets i-th tweet from tweets
    var renderedTweet = createTweetElement(tweet); // tweet is a Tweet Object
            // rendered Tweet will contain whatever createTweetElement returned
            // renderedTweet will contain some string
            
     var tweetsContainer = $('#posted-tweets');
            // tweetsContainer will store a reference to a DOM element
            
    tweetsContainer.prepend(renderedTweet);
            // This function takes our HTML and puts it into the page
        }
    }

let loadTweets = function() {
    $.ajax({
        url: '/tweets'
      }).done(function (tweets) {
          console.log(tweets);
        renderTweets(tweets);
      });
};

loadTweets();
 
  $('#tweet-form').on('submit', function (event) {
    // TODO 1. prevent the default behaviour that you are hijacking
    event.preventDefault();
    // TODO 2. perform the hijacked behaviour programmatically
    var theForm = this;
    var data = $(this).serialize();
    let tweetContent = $("#tweet-content").val();
    console.log('helloooooo', tweetContent);
    if (tweetContent == "" || tweetContent == null) {
        alert("Hey your tweet is empty, please insert a message!");
    } else if (tweetContent.length > 140) {
        alert("Hey you have exceeded the maximum characters allowed, please use less than 140!");
    } else {
    $.ajax({
      method: 'post',
      url: '/tweets',
      data: data
    }).done(function () {
      // TODO 3. manipulate the DOM to indicate to the user that the action was *completed*
      // What is `this` in this function?
      theForm.reset();
      loadTweets();
    });

    return false;
    }
  })
})