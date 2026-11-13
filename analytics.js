/* Medição de audiência (Google Analytics 4), carregada SOMENTE após o aceite do visitante.
   1) Cole abaixo o ID de medição do GA4 (formato G-XXXXXXXXXX).
   2) Enquanto o ID for o de exemplo, este arquivo não faz nada (nem exibe aviso). */
(()=>{
'use strict';
const ID='G-XXXXXXXXXX';
if(!/^G-[A-Z0-9]{6,}$/.test(ID)||ID==='G-XXXXXXXXXX')return;

const KEY='cb_consent';
const get=()=>{try{return localStorage.getItem(KEY)}catch(e){return null}};
const set=v=>{try{localStorage.setItem(KEY,v)}catch(e){}};
let on=false;

function load(){
  if(on)return;on=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){dataLayer.push(arguments)};
  gtag('js',new Date());
  gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  const s=document.createElement('script');
  s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
  document.head.appendChild(s);
}

/* Cliques: WhatsApp, e-mail, mapa e Instagram (links criados depois também são captados) */
document.addEventListener('click',e=>{
  if(!on)return;
  const a=e.target.closest&&e.target.closest('a[href]');
  if(!a)return;
  const h=a.href;let n=null;
  if(h.startsWith('https://wa.me/'))n='whatsapp_click';
  else if(h.startsWith('mailto:'))n='email_click';
  else if(h.includes('google.com/maps'))n='maps_click';
  else if(h.includes('instagram.com'))n='instagram_click';
  if(!n)return;
  const sec=a.closest('section[id],header,footer,.wf');
  gtag('event',n,{
    link_text:(a.getAttribute('aria-label')||a.textContent||'').replace(/ \(abre em nova janela\)$/,'').trim().slice(0,80),
    link_section:sec?(sec.id||sec.className||sec.tagName.toLowerCase()).toString().slice(0,40):'',
    transport_type:'beacon'
  });
});

/* Aviso de cookies */
function banner(){
  if(document.getElementById('cb-ck'))return;
  const st=document.createElement('style');
  st.textContent='#cb-ck{position:fixed;left:max(1rem,env(safe-area-inset-left,0px));right:max(1rem,env(safe-area-inset-right,0px));bottom:max(1rem,env(safe-area-inset-bottom,0px));max-width:30rem;z-index:99999;background:#111;color:#e9e6df;border:1px solid rgba(201,164,92,.45);border-radius:10px;padding:1rem 1.1rem;font:400 .875rem/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.6)}#cb-ck p{margin:0 0 .75rem}#cb-ck a{color:#c9a45c}#cb-ck div{display:flex;gap:.5rem;flex-wrap:wrap}#cb-ck button{font:600 .85rem system-ui,sans-serif;padding:.55rem 1rem;border-radius:6px;cursor:pointer;border:1px solid #c9a45c;background:transparent;color:#c9a45c}#cb-ck button.y{background:#c9a45c;color:#070707}';
  document.head.appendChild(st);
  const d=document.createElement('div');
  d.id='cb-ck';d.setAttribute('role','dialog');d.setAttribute('aria-label','Aviso de cookies');
  d.innerHTML='<p>Usamos o Google Analytics para entender quantas pessoas visitam o site e quais botões são mais usados. Nada é coletado sem a sua permissão. <a href="/politica-de-privacidade.html">Saiba mais</a>.</p><div><button type="button" class="y">Aceitar</button><button type="button" class="n">Recusar</button></div>';
  d.querySelector('.y').onclick=()=>{set('granted');d.remove();load()};
  d.querySelector('.n').onclick=()=>{set('denied');window['ga-disable-'+ID]=true;d.remove()};
  document.body.appendChild(d);
}

/* Link "Preferências de cookies" (usado na política de privacidade) */
const pref=document.getElementById('cookie-prefs');
if(pref)pref.addEventListener('click',e=>{e.preventDefault();set('');banner()});

const c=get();
if(c==='granted')load();
else if(c!=='denied')banner();
})();
