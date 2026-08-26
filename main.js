
  (function closeSidebarOnLinkClick(){
    const sidebarEl = document.getElementById('sidebar');
    if (!sidebarEl || !window.bootstrap) return;
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebarEl);
    sidebarEl.querySelectorAll('.sb-link').forEach(a => {
      a.addEventListener('click', () => offcanvas.hide());
    });
  })();

  (function videosInit(){
    const grid = document.getElementById('videoGrid');
    const emptyHint = document.getElementById('videoEmptyHint');

    function youtubeId(url){
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
      return match ? match[1] : null;
    }
    function videoPlayer(url){
      const frame = document.createElement('div'); frame.className = 'video-frame';
      const yt = youtubeId(url);
      if (yt) {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + yt;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true; frame.appendChild(iframe);
      } else {
        const video = document.createElement('video'); video.src = url; video.controls = true; frame.appendChild(video);
      }
      return frame;
    }
    function render(){
      const videos = Array.isArray(trainingVideos) ? trainingVideos : [];
      grid.innerHTML = ''; emptyHint.hidden = videos.length > 0;
      emptyHint.textContent = 'لا توجد فيديوهات مضافة بعد.';
      videos.forEach(item => {
        const col = document.createElement('div'); col.className = 'col';
        const card = document.createElement('article'); card.className = 'video-card';
        const source = item.url;
        if (source) card.appendChild(videoPlayer(source));
        const meta = document.createElement('div'); meta.className = 'video-meta';
        const title = document.createElement('div'); title.className = 'vtitle'; title.textContent = item.title || ' ';
        meta.append(title);
        card.appendChild(meta);
        col.appendChild(card);
        grid.appendChild(col);
      });
    }
    render();
  })();
