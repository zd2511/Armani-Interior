const A='assets/';
const img=(n)=>A+n;

// Header / mobile navigation
const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>30),{passive:true});
const menuBtn=document.querySelector('.menu-btn'), mobileMenu=document.querySelector('.mobile-menu');
menuBtn?.addEventListener('click',()=>{mobileMenu?.classList.toggle('open'); menuBtn.setAttribute('aria-expanded',mobileMenu?.classList.contains('open')?'true':'false')});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

// Smooth page transitions
for(const a of document.querySelectorAll('a[href]')){
  const url=new URL(a.href,location.href);
  if(url.origin===location.origin && !a.target && !a.href.includes('#')) a.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('page-leave');setTimeout(()=>location.href=a.href,260)});
}

// Scroll reveals
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// WhatsApp helpers
const wa='https://wa.me/27633141801?text='+encodeURIComponent('Hello Armani Interiors, I would like to enquire about an interior design project.');
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=wa);
document.querySelectorAll('[data-phone]').forEach(a=>a.href='tel:+27633141801');

// Portfolio filtering
const filters=document.querySelectorAll('.filter[data-filter]');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.portfolio-card').forEach(card=>card.classList.toggle('hidden',f!=='all' && !card.dataset.category.split(' ').includes(f)));
}));

// Mood / sample boards — one photographed material study per board.
// Palettes are visual swatches only; descriptions are written to match the image itself.
const boards=[
 {title:"Midnight Stone & Brass",desc:"Dark stone, brass-toned details and a small touch of greenery give this board a moody, dramatic feel.",image:'assets/moodboards/board-01.jpg',colors:["#232222", "#0a090a", "#5a5a58", "#3e3a38", "#85745f"]},
 {title:"Charcoal Layers & Soft Texture",desc:"Charcoal, soft taupe and woven textures make a calm, understated combination.",image:'assets/moodboards/board-02.jpg',colors:["#393632", "#292723", "#625b54", "#4d4741", "#8a837c"]},
 {title:"Forest Marble & Mineral Neutrals",desc:"Veined stone sits alongside matte dark finishes and lighter samples for contrast.",image:'assets/moodboards/board-03.jpg',colors:["#181812", "#28271f", "#0b0a06", "#696257", "#544e43"]},
 {title:"Walnut, Taupe & Marble",desc:"Walnut tones, taupe fabric and pale marble work well together in a warm home.",image:'assets/moodboards/board-04.jpg',colors:["#1e1913", "#8f7c6a", "#bba590", "#a8917c", "#786554"]},
 {title:"Muted Blue & Natural Stone",desc:"Dusty blue, timber and pale stone bring a relaxed feel without leaning too heavily into a coastal look.",image:'assets/moodboards/board-05.jpg',colors:["#8d8a81", "#a3a098", "#6a706e", "#ece2d5", "#525551"]},
 {title:"Walnut & Burgundy Texture",desc:"Burgundy and rich timber add depth, while the stone and softer details keep the palette balanced.",image:'assets/moodboards/board-06.jpg',colors:["#3e271e", "#ccbdaf", "#ded2c8", "#644930", "#b2a090"]},
 {title:"Ivory Marble & Layered Stone",desc:"Pale marble, timber and woven textures make a light, natural combination.",image:'assets/moodboards/board-07.jpg',colors:["#c6c0b4", "#9f9382", "#8b7a66", "#b3ab9d", "#dcd9ce"]},
 {title:"Travertine, Cocoa & Linen",desc:"Cream stone, cocoa shades and soft fabric create a warm palette that feels easy to live with.",image:'assets/moodboards/board-08.jpg',colors:["#dbd0c9", "#cabbb0", "#f0e9e5", "#523425", "#af9d8e"]},
 {title:"Black Stone & Antique Gold",desc:"Black stone and gold details create contrast, with olive tones softening the overall look.",image:'assets/moodboards/board-09.jpg',colors:["#38322c", "#4d473e", "#25211c", "#120f0c", "#685e4d"]},
 {title:"Crisp White & Graphic Red",desc:"White, red, coral and blue make this the boldest, most graphic palette in the set.",image:'assets/moodboards/board-10.jpg',colors:["#d6d7d7", "#cdcdca", "#b0b0af", "#4b3033", "#975d57"]},
 {title:"Layered Greys & Mineral Texture",desc:"Different shades of grey, stone-like finishes and soft textiles keep this palette simple but not flat.",image:'assets/moodboards/board-11.jpg',colors:["#625752", "#766b67", "#8c7f79", "#49413d", "#a3948e"]},
 {title:"Walnut, Charcoal & Organic Stone",desc:"Dark timber and black stone are balanced by warmer wood grain and natural-looking textures.",image:'assets/moodboards/board-12.jpg',colors:["#3a2d25", "#5b4235", "#785444", "#976d59", "#1f1611"]},
 {title:"Terracotta & Burnished Metal",desc:"Rust, terracotta and copper tones bring warmth and a bit of drama.",image:'assets/moodboards/board-13.jpg',colors:["#a73e1c", "#8f2309", "#5f1605", "#cc6137", "#d94723"]},
 {title:"Cobalt Blue & Porcelain",desc:"Cobalt and navy stand out against pale stone and porcelain for a clean, confident colour mix.",image:'assets/moodboards/board-14.jpg',colors:["#131e30", "#1d3257", "#7c796d", "#355280", "#514f44"]},
 {title:"Black Stone & Gold Veining",desc:"Black stone with olive-gold veining pairs well with dark timber, brass details and pale stone.",image:'assets/moodboards/board-15.jpg',colors:["#101311", "#262b24", "#424231", "#6c5e30", "#8d7c4e"]},
];

function renderPalette(colors,cls='palette-swatches'){return `<div class="${cls}" aria-label="Colour palette">${colors.map(c=>`<span class="palette-swatch" style="background:${c}" aria-label="Colour swatch"></span>`).join('')}</div>`}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>`<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="board-single-image"><img class="board-photo" src="${b.image}" alt="${b.title}: material sample board" loading="lazy"><span class="board-open">View board</span></div>
   <div class="board-meta-single"><h3>${b.title}</h3><p>${b.desc}</p>${renderPalette(b.colors)}</div>
 </article>`).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b.title;
 modal.querySelector('.modal-desc').textContent=b.desc;
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${b.image}" alt="${b.title} material sample board"></div>`;
 modal.querySelector('.modal-palette').innerHTML=renderPalette(b.colors,'modal-palette-swatches');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

// Micro-interactions: subtle pointer tilt on desktop cards, with no layout changes.
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.portfolio-card, .service-card, .board-card').forEach(card => {
    let raf = 0;
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.2).toFixed(2)}deg) translateY(-5px)`;
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      card.style.transform = '';
    });
  });
}

// Gentle section-heading drift as the user scrolls through the page.
const motionHeadings = document.querySelectorAll('.section-head .display, .boards-intro h2');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && motionHeadings.length) {
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [{transform:'translateY(10px)',opacity:.65},{transform:'translateY(0)',opacity:1}],
          {duration:800,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'}
        );
        headingObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.35});
  motionHeadings.forEach(el => headingObserver.observe(el));
}
