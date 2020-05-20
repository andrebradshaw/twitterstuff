var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

function hideads(){
  Array.from(tn(document,'article')).forEach(el=> {
    if(Array.from(tn(el,'span')).some(ii=> ii.innerText == 'Promoted')) {
      var elem = el.parentElement.parentElement.parentElement;
      elem.style.visibility = 'hidden';
      elem.style.height = '1px';
    }
  });
}
var svgs = {
    right_arrow: `<svg style="width: 18px; height: 18px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path clip-rule="evenodd" d="M31.7,15.219L16.756,0.275  c-0.202-0.202-0.467-0.301-0.731-0.299c-0.008,0-0.014-0.004-0.022-0.004h-15c-0.552,0-1,0.448-1,1c0,0.008,0.004,0.014,0.004,0.022  C0.006,1.258,0.105,1.523,0.306,1.725l14.246,14.246L0.276,30.247c-0.401,0.401-0.401,1.051,0,1.452  c0.238,0.238,0.561,0.317,0.87,0.273h14.711c0.309,0.044,0.632-0.035,0.87-0.273l14.972-14.972c0.208-0.208,0.303-0.482,0.295-0.755  C32.002,15.701,31.907,15.427,31.7,15.219z M15.551,29.972H3.455l13.244-13.244c0.208-0.208,0.303-0.482,0.295-0.755  c0.008-0.272-0.087-0.546-0.295-0.754L3.453,1.972h12.101l13.999,13.999L15.551,29.972z" fill="#ffffff" fill-rule="evenodd" /><g/><g/><g/><g/><g/><g/></svg>`,
    left_arrow: `<svg style="width: 18px; height: 18px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path clip-rule="evenodd" d="M0.291,16.749l14.944,14.944  c0.202,0.202,0.467,0.301,0.731,0.299c0.008,0,0.014,0.004,0.022,0.004h15c0.552,0,1-0.448,1-1c0-0.008-0.004-0.014-0.004-0.022  c0.002-0.264-0.097-0.529-0.299-0.731L17.438,15.997L31.715,1.721c0.401-0.401,0.401-1.051,0-1.452  c-0.238-0.238-0.561-0.317-0.87-0.273l-14.711,0c-0.309-0.044-0.632,0.035-0.87,0.273L0.292,15.24  c-0.208,0.208-0.303,0.482-0.295,0.755C-0.011,16.267,0.083,16.541,0.291,16.749z M16.44,1.996h12.096L15.292,15.24  c-0.208,0.208-0.303,0.482-0.295,0.755c-0.008,0.272,0.087,0.546,0.295,0.754l13.247,13.247H16.437L2.438,15.997L16.44,1.996z" fill="#ffffff" fill-rule="evenodd"/><g/><g/><g/><g/><g/><g/></svg>`,
    storage: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 20" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-920, -1794)"><g transform="translate(100, 1650)"><g transform="translate(816, 142)"><g><polygon points="0 0 24 0 24 24 0 24"/><path d="M18,2 L10.83,2 C10.3,2 9.79,2.21 9.41,2.59 L4.6,7.42 C4.23,7.79 4,8.3 4,8.82 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,4 C20,2.9 19.1,2 18,2 Z M11,8 C10.45,8 10,7.55 10,7 L10,5 C10,4.45 10.45,4 11,4 C11.55,4 12,4.45 12,5 L12,7 C12,7.55 11.55,8 11,8 Z M14,8 C13.45,8 13,7.55 13,7 L13,5 C13,4.45 13.45,4 14,4 C14.55,4 15,4.45 15,5 L15,7 C15,7.55 14.55,8 14,8 Z M17,8 C16.45,8 16,7.55 16,7 L16,5 C16,4.45 16.45,4 17,4 C17.55,4 18,4.45 18,5 L18,7 C18,7.55 17.55,8 17,8 Z" fill="#e21212"/></g></g></g></g></g><path xmlns="http://www.w3.org/2000/svg" style="transform: scale(0.5, 0.5) translate(0%, 39%);" d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z" fill="#000000"/><g/><g/><g/><g/><g/><g/></svg>`,
    dlbtn: `<svg x="0px" y="0px" stroke-width="4" stroke="#07ba5b" viewBox="0 0 101.026 101.026"><g><path d="M83.388,63.888c-0.829,0-1.5,0.671-1.5,1.5v18.5h-63v-18.5c0-0.829-0.671-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v20   c0,0.829,0.671,1.5,1.5,1.5h66c0.829,0,1.5-0.671,1.5-1.5v-20C84.888,64.56,84.217,63.888,83.388,63.888z"/><path d="M49.328,69.449c0.293,0.293,0.677,0.439,1.061,0.439s0.768-0.146,1.061-0.439l13-13c0.586-0.585,0.586-1.536,0-2.121   c-0.586-0.586-1.535-0.586-2.121,0L51.89,64.767V8.388c0-0.829-0.671-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v56.379L38.451,54.328   c-0.586-0.586-1.535-0.586-2.121,0c-0.586,0.585-0.586,1.536,0,2.121L49.328,69.449z"/></g></svg>`,
  };


var tweetContainer = [];

const getStorageData = key => new Promise((resolve, reject) =>
  chrome.storage.local.get(key, result =>
    chrome.runtime.lastError ?
    reject(Error(chrome.runtime.lastError.message)) :
    resolve(result)
  )
)

async function clearTwitterLogStorage(){
  var target_key = 'twitter_log_storage';
  var jsonfile = {};
  jsonfile[target_key] = JSON.stringify([]);
  tweetContainer = [];
  if(gi(document,'twitter_log_count')) gi(document,'twitter_log_count').innerText = tweetContainer.length;
  chrome.storage.local.set( jsonfile );
}

async function getTwitterLogStorage(){
  var twitter_log_storage = await getStorageData('twitter_log_storage');
  if (twitter_log_storage == undefined || Object.getOwnPropertyNames(twitter_log_storage).length === 0) {
    var target_key = 'twitter_log_storage';
    var jsonfile = {};
    jsonfile[target_key] = JSON.stringify(tweetContainer);
    chrome.storage.local.set( jsonfile );
    return tweetContainer;
  }else{
    var output = JSON.parse(twitter_log_storage.twitter_log_storage);
    return output;
  }
}

async function updateTwitterLogStorage(arr){
  if(arr.length){
    var twitter_log_storage = await getStorageData('twitter_log_storage');
    if (twitter_log_storage == undefined || Object.getOwnPropertyNames(twitter_log_storage).length === 0) {
      var target_key = 'twitter_log_storage';
      var jsonfile = {};
      jsonfile[target_key] = JSON.stringify(arr);
      chrome.storage.local.set( jsonfile );
    }else{
      var target_key = 'twitter_log_storage';
      var jsonfile = {};
      var current_twitter_log_storage = JSON.parse(twitter_log_storage.twitter_log_storage);      
      arr.forEach(i=> {
        if(current_twitter_log_storage.every(r=> r.tweet_link != i.tweet_link)) current_twitter_log_storage.push(i)        
      });
      current_twitter_log_storage.forEach(i=>{
        if(tweetContainer.every(r=> r.tweet_link != i.tweet_link)) tweetContainer.push(i)
      });
      console.log(['current_twitter_log_storage',current_twitter_log_storage]);
      jsonfile[target_key] = JSON.stringify(current_twitter_log_storage);
      chrome.storage.local.set( jsonfile );
      if(gi(document,'twitter_log_count')) gi(document,'twitter_log_count').innerText = current_twitter_log_storage.length;
      
    }  
  }
}



function parseReadableDate(t) {
  var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var d = new Date(t);
  return `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()} ${(d.getHours() < 10 ? '0'+d.getHours() : d.getHours())}:${(d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes())}:00`;
}

function getCurrentCards(){
  return Array.from(tn(document,'article')).map(el=> el.parentElement.parentElement);
}


function parseTweetCard(card,article){
  var pathOnly = (s)=> s.replace(/https:\/\/twitter.com\//,'');
  var action = Array.from(tn(article,'span')).filter(sp=> sp.innerText && /retweeted|liked|commented/i.test(sp.innerText));
  var timeElm = tn(card,'time')[0].parentElement;
  var tweeter = tn(card,'a')[0];
  var display_name = tweeter ? reg(/(.+?)\s*@/.exec(tweeter.textContent),1) : '';
  var at_name = tweeter ? reg(/@.+/.exec(tweeter.textContent),0) : '';
  var link = tweeter ? tweeter.href : '';
  var action = action && action.length ? action[0].parentElement : null;
  var imgs = tn(article,'img') && tn(article,'img').length ? Array.from(tn(article,'img')).map(r=> r.getAttribute('src')).filter(r=> r && /twimg.com\/emoji/.test(r) != true) : []; 
  var action_type = action ? reg(/retweeted|liked|commented/i.exec(action.textContent),0) : 'Tweeted';
  var tweet_links = article.innerHTML.match(/http(s|):\/\/(www.|)\w+\.[a-z]{2,12}\S+/gi) ? article.innerHTML.match(/http(s|):\/\/(www.|)\w+\.[a-z]{2,12}\S+/gi).map(m=> m.replace(/".*|&quot.*/g, '')).filter(ii=> /\.png|twimg\.com|\.jpeg|.jpg/i.test(ii) != true) : [];
  var actor_link = action ? action.href : link;
  var actor_name = action ? action.textContent.replace(/\s*(retweeted|liked|commented)\s*/i, '').trim() : display_name;
  var obj = {
    action_type: action_type,
    actor_name:  actor_name,
    actor_link: actor_link, 
    display_name: display_name,
    orinal_tweeter_link: link,
    tweet_link: timeElm.href,
    tweet_date: tn(card,'time')[0] && tn(card,'time')[0].getAttribute('datetime') ? parseReadableDate(tn(card,'time')[0].getAttribute('datetime')) : null,
    tweet_timestamp: tn(card,'time')[0] && tn(card,'time')[0].getAttribute('datetime') ? new Date(tn(card,'time')[0].getAttribute('datetime')).getTime() : null,
    tweet_text: article.innerText,
    tweet_imgs: imgs,
    tweet_links: tweet_links,
    links_to_self: tweet_links.filter(ii=> new RegExp(display_name.replace(/.+\//,'')+'|'+actor_link.replace(/.+\//,'')+'|'+actor_name.replace(/.+\//,'')+'|'+link.replace(/.+\//,''), 'i').test(ii))
  };
  return obj;
}

function getTweets(){
console.log('scrolling');
  hideads();
  unqTweets(Array.from(tn(document,'article')).map(article=> {
    if(tn(article,'time').length){
      return parseTweetCard(tn(article,'time')[0].parentElement.parentElement,article);
    }else{
      return null;
    }
  }).filter(r=> r));
  gi(document,'twitter_log_count').innerText = tweetContainer.length; 
}


function unqTweets(tweets_cont){
  let start = tweetContainer.length;
  for(var i=0; i<tweets_cont.length; i++){
    if(tweetContainer.every(r=> r.tweet_link != tweets_cont[i].tweet_link)) tweetContainer.push(tweets_cont[i])
  }
  let end = tweetContainer.length;
  if (end > start) {
    console.log([start, end]);
    updateTwitterLogStorage(tweetContainer);
  }
  return tweetContainer;
}

if(/twitter.com/.test(window.location.href)){
  window.onscroll = getTweets;
}


function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function dragElement() {
  if(this.id == 'resume_head_dragable'){
    var el = this.parentElement.parentElement;
  }else{
    var el = this.parentElement;
  }
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.55";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

function createTwitterHTML(){
  if(gi(document,'twitter_log_container')) gi(document,'twitter_log_container').outerHTML = ''; 
  
  var cont = ele('div');
  a(cont, [['id', 'twitter_log_container'],['style', `position: fixed; top: 5px; left: 10px; z-index: ${new Date().getTime()}; border-radius: 0.22em; max-width: ${(40+24+160+18+22+28+22)}px;`]]);
  document.body.appendChild(cont);

  var head = ele('div'); 
  a(head, [['style', `border: 1px solid rgb(26,26,26); border-radius: 0.2em; display: grid; grid-template-columns: 40px 24px 160px 18px 22px 28px; grid-gap: 4px; background: rgba(26,26,26,0.8); color: #f1f1f1; padding 6px;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var search = ele('div');
  a(search,[['style',`padding: 4px; cursor: pointer;`]]);
  head.appendChild(search);
  search.innerHTML = `<svg style="width: 18px; height: 18px;" viewBox="0 0 24 24"><g><path fill="#ffffff" d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>`;
  search.onclick = createSearchHTML;

  var count = ele('div');
  a(count,[['id', 'twitter_log_count'],['style',`transform: translate(0px, 2px); padding: 4px;`]]);
  head.appendChild(count);

  var txt = ele('div');
  a(txt, [['style', `transform: translate(0px, 2px); color: #fff; font-size: 1em; border-radius: 0.5em; padding: 4px; cursor: move;`]]);
  head.appendChild(txt);
  txt.innerHTML = `Logged Tweets`;
  
  var stored = ele('div');
  a(stored, [['style', `transform: translate(0px, 4px); width: 18px; height: 18px; cursor: pointer;`]]);
  head.appendChild(stored);
  stored.innerHTML = svgs.storage;
  stored.onmouseenter = clearHover;
  stored.onmouseleave = clearHover;
  stored.onclick = clearTwitterLogStorage;

  var dlbtn = ele('div');
  a(dlbtn,[['status', 'up'],['style',`transform: translate(0px, 4px); width: 22px; height: 22px; cursor: pointer;`]]);//font-size: 0.9em; padding: 4px; border: 1px solid rgba(26,26,26,0.8); border-radius: 0.4em; background: #32a852; color: #f1f1f1; 
  head.appendChild(dlbtn);
  dlbtn.innerHTML = svgs.dlbtn; // 'Download';
  dlbtn.onmouseenter = saveHover;
  dlbtn.onmouseleave = saveHover;
  dlbtn.onclick = downloadTweets;

  var cls = ele('div');
  a(cls, [['id','show_hide_taleo_res_arrow'],['style', `transform: translate(0px, 1px); padding: 4px; cursor: pointer; width: 19px; height: 19px; `]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.left_arrow;
  cls.onclick = hideTwitterLogger;

}
function clearHover(){
  var xpath1 = tn(this,'path')[1];
  var xpath_fill1 = xpath1.getAttribute('fill');
  var xpath0 = tn(this,'path')[0];
  var xpath_fill0 = xpath0.getAttribute('fill');
  a(xpath0,[['fill',xpath_fill1]])
  a(xpath1,[['fill',xpath_fill0]])
}
function saveHover() {
  var arrow = Array.from(tn(this, 'path'));
  if (this.getAttribute('status') == 'up') {
  arrow[1].style.transform = 'translate(0px, 24px) scaleY(0.8)';
  arrow[1].style.transition = 'all 173ms cubic-bezier(0,.67,.43,1.95)';
  arrow[0].style.transform = 'translate(-11px, 0px) scaleX(1.2)';
  arrow[0].style.transition = 'all 173ms cubic-bezier(0,.67,.43,1.95)';
  this.setAttribute('status', 'down');
  } else {
  arrow[1].style.transform = 'translate(0px, 0px) scaleY(1)';
  arrow[1].style.transition = 'all 173ms cubic-bezier(0,.67,.43,1.95)';
  arrow[0].style.transform = 'translate(0px, 0px) scaleX(1)';
  arrow[0].style.transition = 'all 173ms cubic-bezier(0,.67,.43,1.95)';
  this.setAttribute('status', 'up');
  }
}

async function animateView(elm,startPosition,reduceAmnt){
  var increment = (reduceAmnt+24) / 50;
  for(var i=0; i<reduceAmnt; i=i+increment){
    elm.style.left = `${(startPosition-i)}px`;
    await delay(1);
  }
  elm.style.left = `${(startPosition-reduceAmnt)}px`;
}

function hideTwitterLogger(){
    var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
    var res_cont = gi(document,'twitter_log_container');
    var rect = res_cont.getBoundingClientRect();
    if(Math.sign(rect.left) == 1){
      animateView(res_cont,1,(rect.width-24));
      gi(document,'show_hide_taleo_res_arrow').innerHTML = svgs.right_arrow;
      if(gi(document,'twitter_search_container')) gi(document,'twitter_search_container').outerHTML = '';
    }else{
      res_cont.style.left = `1px`; 
      gi(document,'show_hide_taleo_res_arrow').innerHTML = svgs.left_arrow;
    }
}
  

async function downloadTweets(){
  var all_tweets = await getTwitterLogStorage();
  console.log(all_tweets);
  all_tweets.sort((a,b)=> a.tweet_timestamp - b.tweet_timestamp);
  all_tweets.reverse();
  convertToTSV(all_tweets,`tweets_${parseReadableDate(new Date().getTime())}.tsv`);
}

function convertToTSV(fileArray, named_file) {
  var tsvReady = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, '↵').replace(/"/g, "'") : s;
  var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
  var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
  var str = (o) => typeof o == 'object' ? tsvReady(JSON.stringify(o).replace(/\n|\r/g, ' ')) : tsvReady(o.toString().replace(/\n|\r/g, ' '));
  var firstLevel = fileArray.map(el => Object.entries(el));
  var header = unqHsh(firstLevel.map(el => el.map(itm => itm[0])).flat(),{});
  var table = [header];
  for (var i = 0; i < firstLevel.length; i++) {
    var arr = [];
    var row = [];
    var record = firstLevel[i];
    for (var s = 0; s < record.length; s++) {
      var record_kv = record[s];
      var col_key = record_kv[0];      
      var place = header.indexOf(col_key);
      arr[place] = record_kv[1];
    }
    for (var a = 0; a < arr.length; a++) {
      if (arr[a]) {
        row.push(arr[a]);
      } else {
        row.push('');
      }
    }
    table.push(row);
  }

  function downloadr(arr2D, filename) {
    var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el => el.reduce((a, b) => a + '\t' + b)).reduce((a, b) => a + '\r' + b);
    var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
    var file = new Blob([data], {
      type: type
    });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
      var a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 10);
    }
  }
  var output = table.map(el => el.map(itm => str(itm)));
  console.log(output);
  downloadr(output, named_file);
}

async function createSearchHTML(){
  if(gi(document,'twitter_search_container')) {
    gi(document,'twitter_search_container').outerHTML = ''; 
  }else{
    var storage = await getTwitterLogStorage();
    tweetContainer = storage;
    var cont = this.parentElement.parentElement;
    var rect = gi(document,'twitter_log_container').getBoundingClientRect();

    var cbod = ele('div');
    a(cbod, [['id','twitter_search_container'],['style', `border-bottom-left-radius: 0.2em; border-bottom-right-radius: 0.2em; padding: 4px; max-width: ${rect.width - 2}px;`]]);
    cont.appendChild(cbod);
    var searchCont = ele('div');
    cbod.appendChild(searchCont);
    var searchTweets = ele('input');
    a(searchTweets,[['placeholder','Search Tweets'],['style',`outline: none; border: 1px solid #2e2e2e; border-radius: 0.4em; background: #f1f1f1; color: #2e2e2e; padding: 4px; width: 96%;`]]);  
    searchCont.appendChild(searchTweets);
    // await delay(1);
    searchTweets.focus();
    searchTweets.onkeyup = searchUsers; 
  }
}


function searchUsers(){
  var regXready2 = (str) => str && typeof str == 'string' ? str.replace(/\[/g,'\\W').replace(/\]/g,'\\W').replace(/\{/g,'\\W').replace(/\}/g,'\\W').replace(/\\/g,'\\W').replace(/\//g,'\\W').replace(/\?/g,'\\W').replace(/\*/g,'.{0,8}') : '';
  if(this.value.trim().length > 3){
    var x = new RegExp(regXready2(this.value.trim()), 'i');
    var matches = tweetContainer.filter(r=>  x.test(r.actor_name) || x.test(r.display_name) || x.test(r.orinal_tweeter_link) || x.test(r.tweet_text));
    console.log(matches);
    buildSearchResultsHTML(matches);
  }
  if(this.value.trim().length == 0 ){
    if(gi(document,'search_results_data')) gi(document,'search_results_data').outerHTML = '';
  }
}

function openTweet(){
  var jdat = JSON.parse(this.getAttribute('jdat'));
  window.open(jdat.tweet_link);
}

function buildSearchResultsHTML(results){
  if(gi(document,'search_results_data')) gi(document,'search_results_data').outerHTML = '';
  var ref = gi(document,'twitter_search_container');
  
  var cbod = ele('div');
  a(cbod,[['id','search_results_data'],['style',`display: grid; grid-template-rows: auto; grid-gap: 22px; padding: 4px; background: rgba(66, 102, 245, 0.9); border: 1px solid rgb(26, 26, 26); border-radius: 0.3em; overflow-y: auto; max-height: 560px;`]]);
  ref.appendChild(cbod);
  results.forEach(r=> {
    var tweetBod = ele('div');
    a(tweetBod, [['style',`border: 1px solid rgba(66, 102, 245, 1); border-radius: 0.3em; padding: 8px; background: rgba(26, 26, 26, 1); width: ${ref.getBoundingClientRect().width - 52}px;`]]);
    cbod.appendChild(tweetBod);

    var actor = ele('div');
    a(actor,[['jdat',`${JSON.stringify(r)}`],['style',`font-size: 1.1em; color: #4266f5; cursor: pointer;`]]);
    actor.innerHTML = `<div style="display: grid; grid-template-columns: 50px 1fr; grid-gap: 6px;"><div><img style="border-radius: 50%; width: 48px; height: 48px;" src="${r.tweet_imgs[0]}"></img></div><div>${r.display_name}</div></div>`;
    tweetBod.appendChild(actor);
    actor.onclick = openTweet;

    var text = ele('div');
    a(text,[['style',`font-size: 0.9em; color: #f1f1f1;`]]);
    tweetBod.appendChild(text);
    text.innerText = r.tweet_text; 
    
    if(r.tweet_imgs && r.tweet_imgs.length){
      for(var ii=1; ii<r.tweet_imgs.length; ii++){
        var img = ele('img');
        a(img,[['style',`max-width: ${ref.getBoundingClientRect().width - 50}px; max-height: ${ref.getBoundingClientRect().width - 50}px; border-radius: 0.3em;`]]);
        a(img,[['src',r.tweet_imgs[ii]]]);
        tweetBod.appendChild(img);
      }
    }
  });
}

createTwitterHTML()
