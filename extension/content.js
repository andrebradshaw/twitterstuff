var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));

var tweetContainer = [];

function getCurrentCards(){
  return Array.from(tn(document,'article')).map(el=> el.parentElement.parentElement);
}

function parseTweetDate(s){
  var time = reg(/.+?(AM|PM)(?=\W+)/.exec(s),0);
  var date = reg(/(?<=.+?(AM|PM)\W+)\b.+/.exec(s),0);
  return new Date(`${date} ${time}`);
}

function parseTweetCard(card,article){
  var pathOnly = (s)=> s.replace(/https:\/\/twitter.com\//,'')
  var action = Array.from(tn(article,'span')).filter(sp=> sp.innerText && /retweeted|liked|commented/i.test(sp.innerText));
  var timeElm = tn(card,'time')[0].parentElement;
  var tweeter = tn(card,'a')[0];
  var display_name = tweeter ? reg(/(.+?)\s*@/.exec(tweeter.textContent),1) : '';
  var at_name = tweeter ? reg(/@.+/.exec(tweeter.textContent),0) : '';
  var link = tweeter ? tweeter.href : '';
  var action = action && action.length ? action[0].parentElement : null;
  var action_type = action ? reg(/retweeted|liked|commented/i.exec(action.textContent),0) : 'Tweeted';
  var obj = {
    action_type: action_type,
    actor_name:  action ? action.textContent.replace(/\s*(retweeted|liked|commented)\s*/i) : display_name,
    actor_link: action ? pathOnly(action.href) : pathOnly(link), 
    display_name: display_name,
    orinal_tweeter_link: pathOnly(link),
    time: timeElm.getAttribute('title') ? new Date(parseTweetDate(timeElm.getAttribute('title'))).getTime() : null,
    tweet_text: article.innerText,
    tweet_link: pathOnly(timeElm.href),
  };
  return obj;
}

function getTweets(){
  var tweets = unqTweets(Array.from(tn(document,'article')).map(article=> {
    if(tn(article,'time').length){
      return parseTweetCard(tn(article,'time')[0].parentElement.parentElement,article);
    }else{
      return null;
    }
  }).filter(r=> r));

  console.log(tweets);
  console.log(Object.entries(tweets[0]).map(r=> r[0]))
  console.log(JSON.stringify(tweets.slice(0,4)).length)
 //TODO need a limiter. cannot exceed 4k chars in the POST. on each POST, remove from the container,
 window.open(`https://script.google.com/a/quickli.io/macros/s/AKfycbxZLEa6Q1BI7PWhMT7AyRTkEQj1Q3w52E_VcNNVALE/dev?m=${encodeURIComponent(JSON.stringify(tweets))}`);
  return tweets;
}

function unqTweets(tweets_cont){
  for(var i=0; i<tweets_cont.length; i++){
    if(tweetContainer.every(r=> r.tweet_link != tweets_cont[i].tweet_link)) tweetContainer.push(tweets_cont[i])
  }
  return tweetContainer;
}

window.onscroll = getTweets;
