document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel__container');
  const videos = document.querySelectorAll('.carousel__item video');
  const items = document.querySelectorAll('.carousel__item');
  let currentIndex = 1; 
  let timeout;

  function updateCarousel(instant = false) {
    items.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add('center');
      } else {
        item.classList.remove('center');
      }
    });

    const offset = -(currentIndex -1) * 300; 
    if (instant) {
      carouselContainer.style.transition = 'none';
    } else {
      carouselContainer.style.transition = 'transform 1s ease';
    }
    carouselContainer.style.transform = `translateX(${offset}px)`;
  }

  function playVideo(index) {
    clearTimeout(timeout);
    videos.forEach((video, i) => {
      if (i === index) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0; 
      }
    });

    timeout = setTimeout(() => {
      currentIndex++;
      if (currentIndex === items.length - 1) {
        updateCarousel();
        setTimeout(() => {
          currentIndex = 1;
          updateCarousel(true); 
          playVideo(currentIndex);
        }, 1000); 
      } else {
        updateCarousel();
        playVideo(currentIndex);
      }
    }, 3000); 
  }

  videos.forEach((video, index) => {
    video.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      playVideo(currentIndex);
    });
  });

  
  updateCarousel();
  playVideo(currentIndex);
});