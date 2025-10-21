// Load blog teaser (latest 4 posts) from posts.json
async function loadBlogTeaser(){
  const container=document.getElementById('blog-teaser');
  if(!container) return;
  
  // Fallback blog posts data
  const fallbackPosts = [
    {
      slug: "kinh-nghiem-du-lich-mui-ne-2025",
      title: "Kinh nghiệm du lịch Mũi Né 2025: Ăn gì, chơi gì, ở đâu?",
      date: "2025-01-05",
      readingMinutes: 8,
      cover: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop"
    },
    {
      slug: "checklist-bau-trang-jeep-tour",
      title: "Checklist Bàu Trắng với xe Jeep: Chụp ảnh đẹp không khó",
      date: "2025-02-02",
      readingMinutes: 6,
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
    },
    {
      slug: "review-binh-thuan-tu-a-den-z",
      title: "Review Bình Thuận từ A-Z: Thiên nhiên, khí hậu và trải nghiệm",
      date: "2025-04-18",
      readingMinutes: 12,
      cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"
    },
    {
      slug: "review-mui-yen-binh-minh",
      title: "Review Mũi Yến: Bình minh đẹp nhất Bình Thuận",
      date: "2025-04-22",
      readingMinutes: 10,
      cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"
    }
  ];

  try{
    const res=await fetch('./blog/posts.json');
    const posts=await res.json();
    const displayPosts = posts.slice(0,4);
    displayPosts.forEach(p=>{
      const card=document.createElement('article');
      card.className='post-card';
      card.innerHTML=`
        <img src="${p.cover}" alt="${p.title}" loading="lazy">
        <div class="post-body">
          <h3 class="post-title"><a href="./blog/post.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h3>
          <div class="post-meta">${new Date(p.date).toLocaleDateString('vi-VN')} • ${p.readingMinutes} phút đọc</div>
          <p class="post-excerpt">${p.excerpt || 'Khám phá những điều thú vị về Bình Thuận...'}</p>
        </div>`;
      container.appendChild(card);
    });
  }catch(e){
    console.log('Using fallback blog data');
    fallbackPosts.forEach(p=>{
      const card=document.createElement('article');
      card.className='post-card';
      card.innerHTML=`
        <img src="${p.cover}" alt="${p.title}" loading="lazy">
        <div class="post-body">
          <h3 class="post-title"><a href="./blog/post.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h3>
          <div class="post-meta">${new Date(p.date).toLocaleDateString('vi-VN')} • ${p.readingMinutes} phút đọc</div>
          <p class="post-excerpt">Khám phá những điều thú vị về Bình Thuận qua các bài viết chuyên sâu...</p>
        </div>`;
      container.appendChild(card);
    });
  }
}

window.addEventListener('DOMContentLoaded',loadBlogTeaser);


