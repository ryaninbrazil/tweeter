$(function() {

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
    
	function renderTweets(tweets) {       
		for (var i = 0; i < tweets.length; i++) {
			let tweet = tweets[i]; 
			let renderedTweet = createTweetElement(tweet);      
			let tweetsContainer = $('#posted-tweets');        
			tweetsContainer.prepend(renderedTweet);
		}
	}

	let loadTweets = function() {
		$.ajax({url: '/tweets'}).done(function (tweets) {
			renderTweets(tweets);
		});
	};

	loadTweets();
 
	$('#tweet-form').on('submit', function (event) { 
		event.preventDefault();
		lettheForm = this;
		let data = $(this).serialize();
		let tweetContent = $("#tweet-content").val();
			if (tweetContent === "" || tweetContent === null) {
					alert("Hey your tweet is empty, please insert a message!");
			} else if (tweetContent.length > 140) {
					alert("Hey you have exceeded the maximum characters allowed, please use less than 140!");
			} else {
			$.ajax({
				method: 'post',
				url: '/tweets',
				data: data
			}).done(function () {
				theForm.reset();
				loadTweets();
			});
			return false;
		}
	})
})