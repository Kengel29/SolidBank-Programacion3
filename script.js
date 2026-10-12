const $=id=>document.getElementById(id);
// Menú móvil
const burger=document.querySelector('.burger'),menu=$('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
// Simulador
if($('monto')){const rd=n=>'RD$ '+Math.round(n).toLocaleString('es-DO');
 const calc=()=>{const m=+$('monto').value,n=+$('plazo').value,t=+$('tasa').value/100/12,c=t?m*t/(1-Math.pow(1+t,-n)):m/n;
  $('o-monto').textContent=rd(m);$('o-plazo').textContent=n;$('o-tasa').textContent=$('tasa').value+'%';
  $('cuota').textContent=rd(c);$('total').textContent=rd(c*n);$('interes').textContent=rd(c*n-m)};
 ['monto','plazo','tasa'].forEach(i=>$(i).addEventListener('input',calc));calc();}
// Sucursales
if($('ciudad')){const d={sd:[['Sede Principal','Av. Winston Churchill #100, Piantini','Lun–Vie 8:30–5:00'],['Agora Mall','Av. John F. Kennedy, Local 2-14','Lun–Dom 10:00–8:00'],['Zona Colonial','Calle Las Damas #45','Lun–Vie 8:30–4:30']],st:[['Santiago Centro','Av. 27 de Febrero #210','Lun–Vie 8:30–5:00'],['Cerro Alto','Autopista Duarte Km 2','Lun–Sáb 9:00–6:00']],pp:[['Puerto Plata Malecón','Av. Manolo Tavárez Justo #12','Lun–Vie 8:30–4:30']],lr:[['La Romana Centro','Calle Duarte #58','Lun–Vie 8:30–4:30']]};
 const l=()=>$('lista').innerHTML=d[$('ciudad').value].map(s=>`<li><b>${s[0]}</b><span>${s[1]}</span><span>${s[2]}</span></li>`).join('');
 $('ciudad').addEventListener('change',l);l();}
// Formularios de demostración
if($('login'))$('login').addEventListener('submit',e=>{e.preventDefault();$('login-msg').textContent='Demostración: no hay servidor conectado, no se inició sesión.'});
if($('contact'))$('contact').addEventListener('submit',e=>{e.preventDefault();$('contact-msg').textContent='Mensaje recibido. Un asesor te contactará pronto.';e.target.reset()});
// Calculadora de divisas
if($('fx-monto')){
 const f=(n,c)=>n.toLocaleString('es-DO',{minimumFractionDigits:2,maximumFractionDigits:2})+' '+c;
 const compra=c=>c==='DOP'?1:+$(c.toLowerCase()+'-c').value, venta=c=>c==='DOP'?1:+$(c.toLowerCase()+'-v').value;
 const fx=()=>{const m=+$('fx-monto').value||0,de=$('fx-de').value,a=$('fx-a').value;
  if(de===a){$('fx-res').textContent=f(m,a);$('fx-info').textContent='Misma moneda, sin conversión.';return}
  const dop=m*compra(de);              // lo que el banco te paga por tu divisa
  const r=dop/venta(a);                // lo que el banco te cobra por la divisa destino
  $('fx-res').textContent=f(r,a);$('fx-info').textContent='Tasa aplicada: 1 '+de+' ≈ '+(r/(m||1)).toFixed(4)+' '+a};
 document.querySelectorAll('.fx input,.fx select').forEach(e=>e.addEventListener('input',fx));
 $('fx-swap').addEventListener('click',()=>{const t=$('fx-de').value;$('fx-de').value=$('fx-a').value;$('fx-a').value=t;fx()});
 fx();}
