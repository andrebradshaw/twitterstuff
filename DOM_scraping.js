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

function scrollDown(){
  var currentCards = getCurrentCards();
  currentCards[currentCards.length-1].scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
}

function scrollUp(){
  var currentCards = getCurrentCards();
  var scroll_middle = Math.round(currentCards.length * .8);
  currentCards[scroll_middle].scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
}

async function scrollLooper(){
  for(var i=0; i<50; i++){
    scrollDown();
    var tweets = getTweets();
    tweetContainer.push(tweets);
    await delay(666);
//     scrollUp();
    await delay(555);
  }
  return true;
}

function parseTweetDate(s){
  var time = reg(/.+?(AM|PM)(?=\W+)/.exec(s),0);
  var date = reg(/(?<=.+?(AM|PM)\W+)\b.+/.exec(s),0);
  return new Date(`${date} ${time}`);
}

function parseTweetCard(card,article){
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
    actor_link: action ? action.href : link, 
    display_name: display_name,
    at_name: at_name,
    orinal_tweeter_link: link,
    time: timeElm.getAttribute('title') ? parseTweetDate(timeElm.getAttribute('title')) : null,
    tweet_text: article.innerText,
    tweet_link: timeElm.href,
  };
  return obj;
}
function getTweets(){
  var tweets = Array.from(tn(document,'article')).map(article=> {
    if(tn(article,'time').length){
      return parseTweetCard(tn(article,'time')[0].parentElement.parentElement,article);
    }else{
      return null;
    }
  }).filter(r=> r);
  return tweets;
}

function unqTweets(tweets_cont){
  var containArr = [];
  for(var i=0; i<tweets_cont.length; i++){
    if(containArr.every(r=> r.tweet_link != tweets_cont[i].tweet_link)) containArr.push(tweets_cont[i])
   }
  return containArr;
}

async function initApplication(){
  for(var i = 0; i<5; i++){
    await scrollLooper();
    var tweets = getTweets();
    if( new Date(tweets[tweets.length-1].time).getTime() > (new Date().getTime() - (8.64e+7)) ){
      await scrollLooper();
      var tweets = getTweets();
    }else{
      console.log(tweets);
      break;
    }
  }
  var unq_tweets = unqTweets(tweetContainer.flat())
  console.log(unq_tweets);
}
initApplication()
