var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));

function getCurrentCards(){
  return Array.from(tn(document,'article')).map(el=> el.parentElement.parentElement);
}

function scrollDown(){
  var currentCards = getCurrentCards();
  currentCards[currentCards.length-1].scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
}

async function scrollLooper(){
  for(var i=0; i<50; i++){
    scrollDown();
    await delay(1111);
  }
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
console.log(tweets);
}
// Array.from(tn(document,'time')).map(el=> el.parentElement.parentElement).forEach(card=> parseTweetCard(card))

getTweets()
