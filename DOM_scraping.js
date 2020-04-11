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

function parseTweetCard(card){
  var timeElm = tn(card,'time')[0].parentElement;
  var tweeter = tn(card,'a')[0];
  var obj = {
    tweeter: tweeter,
    time: timeElm.getAttribute('title') ? parseTweetDate(timeElm.getAttribute('title')) : null,
  };
  console.log(obj)
}

parseTweetCard(Array.from(tn(document,'time')).map(el=> el.parentElement.parentElement)[11])

