/* Comportamento do cabeçalho e dos botões nas páginas internas (mesmo padrão do index.html). */
(()=>{
'use strict';
const WA='5581991980000';
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const safe=(n,f)=>{try{f()}catch(e){console.warn('['+n+']',e)}};
const hd=$('#hd'),mb=$('#mb');
const setMenu=o=>{if(!hd||!mb)return;hd.classList.toggle('o',o);mb.setAttribute('aria-expanded',String(o))};

safe('whatsapp',()=>{
  $$('[data-msg]').forEach(a=>{a.href=`https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.msg)}`});
  const y=$('#yr');if(y)y.textContent=new Date().getFullYear();
});
safe('scroll',()=>{
  if(!hd)return;let q=false;
  const upd=()=>{q=false;hd.classList.toggle('s',scrollY>40)};
  addEventListener('scroll',()=>{if(!q){q=true;requestAnimationFrame(upd)}},{passive:true});
  addEventListener('resize',()=>{upd();if(innerWidth>860)setMenu(false)});
  upd();
});
safe('menu',()=>{
  if(!hd||!mb)return;
  mb.addEventListener('click',()=>setMenu(!hd.classList.contains('o')));
  $('#mnav').addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&hd.classList.contains('o')){setMenu(false);mb.focus()}});
  document.addEventListener('click',e=>{if(!hd.contains(e.target))setMenu(false)});
});
})();
