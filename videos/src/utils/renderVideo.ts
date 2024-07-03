import { YouTubeVideo } from '../types'; // Certifique-se de que o tipo YouTubeVideo está corretamente definido
import { apiService } from './api';

export function renderVideos(
  videos: YouTubeVideo[],
  bookmarkedVideoIds: string[],
  updateFavoriteCount: () => void
) {
  const videoContainer = document.querySelector('.video-container') as HTMLElement;
  if (!videoContainer) return;

  while (videoContainer.firstChild) {
    videoContainer.removeChild(videoContainer.firstChild);
  }

  videos.forEach((video: YouTubeVideo) => {
    let videoId: string;
    if (typeof video.id === 'string') {
      videoId = video.id;
    } else if ('videoId' in video.id) {
      videoId = video.id.videoId;
    } else {
      return;
    }

    const { title, thumbnails } = video.snippet;
    let isBookmarked = bookmarkedVideoIds.includes(videoId);

    const videoBlock = document.createElement('div');
    videoBlock.className = 'video-block relative';
    videoBlock.dataset.id = videoId;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container relative';

    const img = document.createElement('img');
    img.src = thumbnails.medium.url;
    img.alt = title;
    img.className = 'w-full cursor-pointer';
    imgContainer.appendChild(img);

    const ballButton = document.createElement('button');
    ballButton.className = 'ball';
    ballButton.setAttribute('aria-label', isBookmarked ? 'desfavoritar' : 'favoritar');
    ballButton.style.backgroundColor = isBookmarked ? 'yellow' : 'gray';
    ballButton.addEventListener('click', async (event) => {
      event.stopPropagation();
      event.preventDefault();
      const newStatus = !isBookmarked;
      try {
        if (newStatus) {
          await apiService.addVideo(video);
          isBookmarked = true;
        } else {
          await apiService.removeVideo(videoId);
          isBookmarked = false;
        }
        ballButton.setAttribute('aria-label', isBookmarked ? 'desfavoritar' : 'favoritar');
        ballButton.style.backgroundColor = isBookmarked ? 'yellow' : 'gray';
        updateFavoriteCount();
      } catch (error) {
        console.error('Error updating favorite status:', error);
      }
    });
    imgContainer.appendChild(ballButton);

    videoBlock.appendChild(imgContainer);

    const p = document.createElement('p');
    p.className = 'font-mono text-[#7a7378] text-md mt-2';
    p.textContent = title;
    videoBlock.appendChild(p);

    videoBlock.addEventListener('click', () => openModal(videoId));
    videoContainer.appendChild(videoBlock);
  });
}

function openModal(videoId: string) {
  const modal = document.getElementById('video-modal') as HTMLDivElement;
  const iframe = modal.querySelector('iframe') as HTMLIFrameElement;
  const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
  iframe.src = iframeSrc;
  modal.classList.add('show');
  modal.classList.remove('hidden');
}
