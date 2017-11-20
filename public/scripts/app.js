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
		let theForm = this;
		let data = $(this).serialize();
		let tweetContent = $("#tweet-content").val();
			if (tweetContent === "" || tweetContent === null) {
				$('.empty-tweet').css( { display: 'block' } );
				$('.too-many-chars').css( { display: 'none' } );
			} else if (tweetContent.length > 140) {
				$('.empty-tweet').css( { display: 'none' } );
				$('.too-many-chars').css( { display: 'block' } );
			} else {
			$.ajax({
				method: 'post',
				url: '/tweets',
				data: data
			}).done(function (data) {
				theForm.reset();
				loadTweets();
				$('#tweet-form p').css({ display: "none" });
			});
			return false;
		}
	})
})