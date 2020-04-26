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

var svgs = {
    right_arrow: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path clip-rule="evenodd" d="M31.7,15.219L16.756,0.275  c-0.202-0.202-0.467-0.301-0.731-0.299c-0.008,0-0.014-0.004-0.022-0.004h-15c-0.552,0-1,0.448-1,1c0,0.008,0.004,0.014,0.004,0.022  C0.006,1.258,0.105,1.523,0.306,1.725l14.246,14.246L0.276,30.247c-0.401,0.401-0.401,1.051,0,1.452  c0.238,0.238,0.561,0.317,0.87,0.273h14.711c0.309,0.044,0.632-0.035,0.87-0.273l14.972-14.972c0.208-0.208,0.303-0.482,0.295-0.755  C32.002,15.701,31.907,15.427,31.7,15.219z M15.551,29.972H3.455l13.244-13.244c0.208-0.208,0.303-0.482,0.295-0.755  c0.008-0.272-0.087-0.546-0.295-0.754L3.453,1.972h12.101l13.999,13.999L15.551,29.972z" fill="#ffffff" fill-rule="evenodd" /><g/><g/><g/><g/><g/><g/></svg>`,
    left_arrow: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path clip-rule="evenodd" d="M0.291,16.749l14.944,14.944  c0.202,0.202,0.467,0.301,0.731,0.299c0.008,0,0.014,0.004,0.022,0.004h15c0.552,0,1-0.448,1-1c0-0.008-0.004-0.014-0.004-0.022  c0.002-0.264-0.097-0.529-0.299-0.731L17.438,15.997L31.715,1.721c0.401-0.401,0.401-1.051,0-1.452  c-0.238-0.238-0.561-0.317-0.87-0.273l-14.711,0c-0.309-0.044-0.632,0.035-0.87,0.273L0.292,15.24  c-0.208,0.208-0.303,0.482-0.295,0.755C-0.011,16.267,0.083,16.541,0.291,16.749z M16.44,1.996h12.096L15.292,15.24  c-0.208,0.208-0.303,0.482-0.295,0.755c-0.008,0.272,0.087,0.546,0.295,0.754l13.247,13.247H16.437L2.438,15.997L16.44,1.996z" fill="#ffffff" fill-rule="evenodd"/><g/><g/><g/><g/><g/><g/></svg>`,
  };

var tweetContainer = [];

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
  var obj = {
    action_type: action_type,
    actor_name:  action ? action.textContent.replace(/\s*(retweeted|liked|commented)\s*/i, '').trim() : display_name,
    actor_link: action ? action.href : link, 
    display_name: display_name,
    orinal_tweeter_link: link,
    tweet_link: timeElm.href,
    tweet_date: tn(card,'time')[0] && tn(card,'time')[0].getAttribute('datetime') ? parseReadableDate(tn(card,'time')[0].getAttribute('datetime')) : null,
    tweet_timestamp: tn(card,'time')[0] && tn(card,'time')[0].getAttribute('datetime') ? new Date(tn(card,'time')[0].getAttribute('datetime')).getTime() : null,
    tweet_text: article.innerText,
    tweet_imgs: imgs,
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
  gi(document,'twitter_log_count').innerText = tweetContainer.length; 
}

function updateTable(){
  var sliced = tweetContainer.filter(tc=> tc.sent_to_sheets != true).slice(0,2); 
  sliced.forEach(t=> {
    var ii = tweetContainer.findIndex(tc=> tc.tweet_link == t.tweet_link);
    tweetContainer[ii]['sent_to_sheets'] = true;
  });
}


function unqTweets(tweets_cont){
  for(var i=0; i<tweets_cont.length; i++){
    if(tweetContainer.every(r=> r.tweet_link != tweets_cont[i].tweet_link)) tweetContainer.push(tweets_cont[i])
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
  a(cont, [['id', 'twitter_log_container'],['style', `position: fixed; top: 5px; left: 10px; z-index: ${new Date().getTime()}; border-radius: 0.22em; max-width: ${(40+24+160+90+28+15)}px;`]]);
  document.body.appendChild(cont);

  var head = ele('div'); 
  a(head, [['style', `border-radius: 0.2em; display: grid; grid-template-columns: 40px 24px 160px 90px 28px; grid-gap: 4px; background: #2e2e2e; color: #f1f1f1; padding 6px;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var search = ele('div');
  a(search,[['class','css-1dbjc4n'],['style',`padding: 4px; cursor: pointer`]]);
  head.appendChild(search);
  search.innerHTML = `<svg viewBox="0 0 24 24" class="r-jwli3a r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>`;
  search.onclick = createSearchHTML;

  var count = ele('div');
  a(count,[['id', 'twitter_log_count'],['style',`padding: 4px;`]]);
  head.appendChild(count);

  var txt = ele('div');
  a(txt, [['style', `color: #fff; font-size: 1em; border-radius: 0.5em; padding: 4px; cursor: move;`]]);
  head.appendChild(txt);
  txt.innerHTML = `Tweets Logged`;
  
  var dlbtn = ele('div');
  a(dlbtn,[['style',`padding: 4px; border: 2px solid #2e2e2e; border-radius: 0.4em; background: #32a852; color: #f1f1f1; cursor: pointer; text-align: center;`]]);
  head.appendChild(dlbtn);
  dlbtn.innerText = 'Download';
  dlbtn.onclick = downloadTweets;

  var cls = ele('div');
  a(cls, [['id','show_hide_taleo_res_arrow'],['style', `padding: 4px; cursor: pointer; width: 22px; height: 22px; `]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.left_arrow;
  cls.onclick = hideTwitterLogger;

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
  

function downloadTweets(){
  console.log(tweetContainer);
  tweetContainer.sort((a,b)=> a.tweet_timestamp - b.tweet_timestamp);
  tweetContainer.reverse();
  convertToTSV(tweetContainer,`tweets_${parseReadableDate(new Date().getTime())}.tsv`);
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

function createSearchHTML(){
  if(gi(document,'twitter_search_container')) gi(document,'twitter_search_container').outerHTML = ''; 

  var cont = this.parentElement.parentElement;

  var cbod = ele('div');
  a(cbod, [['id','twitter_search_container'],['style', `border-bottom-left-radius: 0.2em; border-bottom-right-radius: 0.2em; padding: 4px; max-width: ${(40+24+160+90+28)}px;`]]);
  cont.appendChild(cbod);
  
  var searchCont = ele('div');
  cbod.appendChild(searchCont);
  
  var searchTweets = ele('input');
  a(searchTweets,[['placeholder','Search Tweets'],['style',`border: 1px solid #2e2e2e; border-radius: 0.4em; background: #f1f1f1; color: #2e2e2e; padding: 4px; width: 96%;`]]);  
  searchCont.appendChild(searchTweets);
  searchTweets.onkeyup = searchUsers;

}


function searchUsers(){
  var regXready2 = (str) => str && typeof str == 'string' ? str.replace(/\[/g,'\\W').replace(/\]/g,'\\W').replace(/\{/g,'\\W').replace(/\}/g,'\\W').replace(/\\/g,'\\W').replace(/\//g,'\\W').replace(/\?/g,'\\W').replace(/\*/g,'.{0,8}') : '';
  if(this.value.trim().length > 3){
    var x = new RegExp(regXready2(this.value.trim()), 'i');
    var matches = tweetContainer.filter(r=>  x.test(r.actor_name) || x.test(r.display_name) || x.test(r.orinal_tweeter_link) || x.test(r.tweet_text));
    console.log(matches);
buildSearchResultsHTML(matches);
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
  a(cbod,[['id','search_results_data'],['style',`display: grid; grid-template-rows: auto; grid-gap: 22px; padding: 4px; background: #2e2e2e; overflow-y: auto; max-height: 500px; max-width: 98%;`]]);
  ref.appendChild(cbod);
  results.forEach(r=> {
    var tweetBod = ele('div');
    a(tweetBod, [['style',`border-bottom: 1px solid #4266f5;`]]);
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
        a(img,[['style',`max-width: 300px; max-height: 300px;`]]);
        a(img,[['src',r.tweet_imgs[ii]]]);
        tweetBod.appendChild(img);
      }
    }
  });
}

createTwitterHTML()
