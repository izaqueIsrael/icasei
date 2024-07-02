export function setupModal() {
    const closeModal = () => {
      const modal = document.getElementById('video-modal') as HTMLDivElement;
      modal.classList.remove('show');
      const iframe = modal.querySelector('iframe') as HTMLIFrameElement;
      iframe.src = '';
    };
  
    const closeModalButton = document.getElementById('close-modal');
    if (closeModalButton) {
      closeModalButton.addEventListener('click', closeModal);
    }
  
    document.addEventListener('click', (event) => {
      const modal = document.getElementById('video-modal') as HTMLDivElement;
      if (event.target === modal) {
        closeModal();
      }
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }
  