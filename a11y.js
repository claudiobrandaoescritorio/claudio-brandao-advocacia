/* Acessibilidade: avisa leitores de tela quando um link abre em nova janela.
   Usa aria-label (e não texto extra) para não alterar o layout dos links. */
(()=>{
'use strict';
document.querySelectorAll('a[target="_blank"]').forEach(a=>{
  const base=(a.getAttribute('aria-label')||a.textContent||'').replace(/\s+/g,' ').trim();
  if(base)a.setAttribute('aria-label',base+' (abre em nova janela)');
});
})();
