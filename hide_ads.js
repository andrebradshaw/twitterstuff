var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
function hideads(){
  Array.from(tn(document,'article')).forEach(el=> {
    if(Array.from(tn(el,'span')).some(ii=> ii.innerText == 'Promoted')) {
      var elem = el.parentElement.parentElement.parentElement;
      elem.style.visibility = 'hidden';
      elem.style.height = '1px';
    }
  });
}
window.onscroll = hideads;
