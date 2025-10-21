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
      cover: "https://pystravel.vn/_next/image?url=https%3A%2F%2Fbooking.pystravel.vn%2Fuploads%2Fposts%2Falbums%2F17655%2F6ff8788bf078eb8e6f4ca147c39ab98e.jpg&w=1920&q=75"
    },
    {
      slug: "checklist-bau-trang-jeep-tour",
      title: "Checklist Bàu Trắng với xe Jeep: Chụp ảnh đẹp không khó",
      date: "2025-02-02",
      readingMinutes: 6,
      cover: "https://dulichchat.com/wp-content/uploads/2020/06/Tour-xe-jeep-bau-trang-phan-thiet-dulichchat.jpg"
    },
    {
      slug: "review-binh-thuan-tu-a-den-z",
      title: "Review Bình Thuận từ A-Z: Thiên nhiên, khí hậu và trải nghiệm",
      date: "2025-04-18",
      readingMinutes: 12,
      cover: "https://www.vietnamairlines.com/~/media/SEO-images/2025%20SEO/Traffic%20TV/du-lich-binh-thuan/du-lich-binh-thuan.jpg"
    },
    {
      slug: "review-mui-yen-binh-minh",
      title: "Review Mũi Yến: Bình minh đẹp nhất Bình Thuận",
      date: "2025-04-22",
      readingMinutes: 10,
      cover: "https://lalago.vn/wp-content/uploads/2025/05/mui-yen-2-1024x576.jpg"
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



