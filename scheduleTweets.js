// Function to read the contents of the post.txt file
function readPostFile(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("GET", "post.txt", true);
    xhttp.send();
}

// Function to post a tweet
function postTweet(tweet_text) {
    // Replace with your Twitter API credentials
    var consumerKey = 'ZRFPhUxedRr4taHizWW747WqL';
    var consumerSecret = 'Yif7mv46LTG4DUqlRPHoycdFWfUzfWq5NWt5oeHEu1GW2oujiZ';
    var accessToken = '1622829833746276352-zHZaln9YWiYVrpnQE7rFGku6l2rBpM';
    var accessTokenSecret = '0t6CJU3qW4LpoShDnId6rV5rVhbsNWgSUR4i7nQ1yWElD';

    // You can use OAuth1.0 or OAuth2.0 to authenticate with Twitter's API
    // Here, I'm using OAuth2.0 for simplicity

    // Construct your API endpoint for posting a tweet
    var url = 'https://api.twitter.com/1.1/statuses/update.json';

    // Construct your POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('Tweet posted successfully!');
        } else {
            console.error('Error posting tweet:', xhr.responseText);
        }
    };

    // Send the tweet
    xhr.send(encodeURI('status=' + tweet_text));
}

// Read the post.txt file and schedule posting tweets
readPostFile(function(posts) {
    var tweetList = posts.split('\n');

    // Schedule posting tweets at 5-second intervals from the current time
    var currentTime = Date.now();
    var delay = 5000; // 5 seconds

    for (var i = 0; i < tweetList.length; i++) {
        var scheduledTime = currentTime + (i * delay);
        setTimeout(postTweet, scheduledTime - currentTime, tweetList[i]);
    }
});
