const CACHE_NAME='tour-binh-thuan-v1';
const ASSETS=[
  '/',
  '/index.html','/tours.html','/about.html','/contact.html',
  '/blog/','/blog/index.html','/blog/post.html','/blog/posts.json',
  '/assets/css/style.css','/assets/js/main.js','/assets/js/blog.js'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.origin===location.origin){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));
      return res;
    })).catch(()=>caches.match('/index.html')));
  }
});


