// Mobile menu
const btn=document.getElementById('menuBtn'),list=document.getElementById('navList');
if(btn)btn.addEventListener('click',()=>list.classList.toggle('open'));

// Fee calculator (same rates as the mobile app)
const RATES={standard:120,ultimate:250,vip:500};
const MIN_HOURS={standard:1,ultimate:1,vip:3};
const EXTRAS={food:250,assistant:300};
const R=n=>'R'+n.toLocaleString('en-ZA');
function calc(){
  const pk=document.getElementById('pkg');if(!pk)return;
  const hrsEl=document.getElementById('hours');
  let h=Math.max(parseInt(hrsEl.value)||0,MIN_HOURS[pk.value]);
  if(parseInt(hrsEl.value)!==h&&hrsEl.value!=='')hrsEl.value=h;
  const base=RATES[pk.value]*h;
  const food=document.getElementById('food').checked?EXTRAS.food:0;
  const asst=document.getElementById('assistant').checked?EXTRAS.assistant:0;
  document.getElementById('rBase').textContent=R(base)+' ('+h+' h)';
  document.getElementById('rFood').textContent=R(food);
  document.getElementById('rAsst').textContent=R(asst);
  document.getElementById('rTotal').textContent=R(base+food+asst);
  document.getElementById('minNote').textContent=MIN_HOURS[pk.value]>1?'VIP sessions have a '+MIN_HOURS[pk.value]+'-hour minimum.':'';
}
['pkg','hours','food','assistant'].forEach(id=>{const e=document.getElementById(id);if(e)e.addEventListener('input',calc)});
const pre=new URLSearchParams(location.search).get('pkg');
if(pre&&document.getElementById('pkg'))document.getElementById('pkg').value=pre;
calc();

// Contact form validation
const cf=document.getElementById('contactForm');
if(cf)cf.addEventListener('submit',e=>{
  e.preventDefault();
  const m=document.getElementById('formMsg');
  const name=cf.name.value.trim(),email=cf.email.value.trim(),text=cf.message.value.trim();
  if(!name||!/^\S+@\S+\.\S+$/.test(email)||text.length<10){
    m.className='msg err';m.textContent='Please enter your name, a valid email and a message of at least 10 characters.';return;}
  m.className='msg ok';m.textContent='Thank you, '+name+'. Our concierge team will contact you shortly.';cf.reset();
});
