var NAME = CONFIG.name;
var LETTER = CONFIG.letter;

var $ = function(s){return document.querySelector(s)};
$('#nm').textContent = NAME;
var LETTER_HTML = LETTER.map(function(l){return '<p>'+l+'</p>'}).join('');
$('#letter').innerHTML = LETTER_HTML;
$('#sheet').innerHTML = LETTER_HTML;
var seen = {};
function mark(id){
  seen[id]=1; document.querySelector('[data-m="'+id+'"]').classList.add('seen');
  if(Object.keys(seen).length===3){ $('#final').classList.add('on'); confetti(); }
}
document.querySelectorAll('.tile').forEach(function(t){
  t.onclick=function(){ $('#'+t.dataset.m).classList.add('on'); mark(t.dataset.m); };
});
document.querySelectorAll('.modal').forEach(function(m){
  m.onclick=function(e){ if(e.target===m||e.target.classList.contains('x')){ m.classList.remove('on'); if(m.id==='m1') fold(); } };
});
document.addEventListener('keydown',function(e){ if(e.key==='Escape') document.querySelectorAll('.modal').forEach(function(m){m.classList.remove('on')}); });

// envelope
var env=$('#env');
function openLetter(){
  env.classList.add('open'); $('#envhint').textContent='';
  setTimeout(function(){ env.style.display='none'; $('#sheet').classList.add('on'); $('#fold').style.display='inline-block'; },1100);
}
function fold(){
  $('#sheet').classList.remove('on'); $('#sheet').scrollTop=0; $('#fold').style.display='none';
  env.style.display=''; env.classList.remove('open'); $('#envhint').textContent='Tap the envelope';
}
env.onclick=function(){ if(!env.classList.contains('open')) openLetter(); };
env.onkeydown=function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); if(!env.classList.contains('open')) openLetter(); } };
$('#fold').onclick=fold;

// album
var cur=null, file=$('#file');
$('#album').innerHTML = CONFIG.photos.map(function(p,i){
  var inner = p.file ? '<img src="'+p.file+'" alt="'+p.caption+'">' : '+ Add photo';
  return '<button class="pol" data-i="'+i+'"><div class="ph">'+inner+'</div><div class="cap">'+p.caption+'</div></button>';
}).join('');
document.querySelectorAll('.pol img').forEach(function(im){
  im.onerror=function(){ im.parentNode.textContent='+ Add photo'; };
});
document.querySelectorAll('.pol').forEach(function(p){ p.onclick=function(){cur=p; file.click();}; });
file.onchange=function(){
  var f=file.files[0]; if(!f||!cur) return;
  var r=new FileReader();
  r.onload=function(){ var ph=cur.querySelector('.ph'); ph.innerHTML=''; var im=new Image(); im.src=r.result; im.alt=''; ph.appendChild(im); };
  r.readAsDataURL(f); file.value='';
};

// cake
var cs=[100,150,200], g=$('#candles'), out=0, NS='http://www.w3.org/2000/svg';
cs.forEach(function(x,i){
  var cc=['#5CC6BC','#E58DB2','#E8C94A'][i];
  g.insertAdjacentHTML('beforeend','<g><rect x="'+(x-5)+'" y="62" width="10" height="42" rx="3" fill="'+cc+'"/><g class="flame" data-i="'+i+'" role="button" aria-label="Flame '+(i+1)+'"><ellipse cx="'+x+'" cy="48" rx="10" ry="16" fill="#FFB02E"/><ellipse cx="'+x+'" cy="52" rx="5" ry="9" fill="#FFF0A6"/><rect x="'+(x-16)+'" y="26" width="32" height="40" fill="transparent"/></g><ellipse class="smoke" cx="'+x+'" cy="50" rx="5" ry="10" fill="#9aa"/></g>');
});
function snuff(f){
  if(f.classList.contains('out')) return;
  f.classList.add('out'); out++;
  if(out===3){ $('#wish').textContent='Happy birthday! Your wish is on its way ♥'; $('#blow').textContent='Light them again'; confetti(); mark('m3'); }
}
document.querySelectorAll('.flame').forEach(function(f){ f.onclick=function(){snuff(f)}; });
$('#blow').onclick=function(){
  var fl=document.querySelectorAll('.flame');
  if(out===3){ fl.forEach(function(f){f.classList.remove('out')}); out=0; $('#wish').textContent=''; $('#blow').textContent='Blow them out'; return; }
  fl.forEach(function(f,i){ setTimeout(function(){snuff(f)},i*350); });
};

function confetti(){
  var c=['#F8C8DC','#5CC6BC','#FFF0A6','#E58DB2'];
  for(var i=0;i<70;i++){
    var d=document.createElement('div'); d.className='conf';
    d.style.left=Math.random()*100+'vw'; d.style.background=c[i%4];
    d.style.animationDuration=(2+Math.random()*2.5)+'s'; d.style.animationDelay=Math.random()*.6+'s';
    document.body.appendChild(d); setTimeout(function(el){el.remove()},5500,d);
  }
}
