// Year
document.addEventListener('DOMContentLoaded',()=>{const y=document.getElementById('year');if(y)y.textContent=String(new Date().getFullYear());});

// Logo click handler - ensure it goes to homepage
document.addEventListener('DOMContentLoaded',()=>{
  const logos=document.querySelectorAll('.logo');
  logos.forEach(logo=>{
    logo.addEventListener('click',(e)=>{
      e.preventDefault();
      // Add click animation
      logo.style.transform='scale(0.95)';
      setTimeout(()=>{
        logo.style.transform='';
        // Navigate to homepage
        if(window.location.pathname.includes('blog')){
          window.location.href='../index.html';
        }else{
          window.location.href='./index.html';
        }
      },150);
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  console.log('Mobile toggle:', mobileToggle);
  console.log('Nav:', nav);
  
  if (mobileToggle && nav) {
    console.log('Adding click listener to mobile toggle');
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Mobile toggle clicked');
      
      const isActive = nav.classList.contains('active');
      console.log('Is active:', isActive);
      
      if (isActive) {
        nav.classList.remove('active');
        this.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
        console.log('Menu closed');
      } else {
        nav.classList.add('active');
        this.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        console.log('Menu opened');
      }
    });

    // Close menu when clicking on links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// Simple tilt and parallax
(function(){
  const tiltSelector='[data-tilt], .tilt';
  const maxTilt=12; // degrees
  function handleTilt(e){
    const rect=this.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width; // 0..1
    const y=(e.clientY-rect.top)/rect.height; // 0..1
    const rx=(.5-y)*maxTilt;
    const ry=(x-.5)*maxTilt;
    this.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function resetTilt(){this.style.transform='translateY(-2px)';}
  function initTilt(){
    document.querySelectorAll(tiltSelector).forEach(el=>{
      el.addEventListener('mousemove',handleTilt);
      el.addEventListener('mouseleave',resetTilt);
    });
  }
  function initParallax(){
    const layers=[...document.querySelectorAll('[data-parallax]')];
    if(!layers.length) return;
    window.addEventListener('scroll',()=>{
      const t=window.scrollY;
      layers.forEach(layer=>{
        const factor=parseFloat(layer.getAttribute('data-parallax')||'0.2');
        layer.style.transform=`translate3d(0, ${t*factor}px, 0)`;
      });
    },{passive:true});
  }
  window.addEventListener('DOMContentLoaded',()=>{initTilt();initParallax();});
})();

// Register service worker
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  });
}


