export const setupToggleColorButton = (): void => {
    const button = document.querySelector('.toggle-color') as HTMLButtonElement | null;
    if (button) {
      button.addEventListener('click', () => {
        if (button.classList.contains('bg-red-500')) {
          button.classList.remove('bg-red-500');
          button.classList.add('bg-green-500');
        } else {
          button.classList.remove('bg-green-500');
          button.classList.add('bg-red-500');
        }
      });
    }
  };
  
  export const updateFavoriteCountElement = (count: number): void => {
    const countElement = document.querySelector('.favorite-count') as HTMLElement | null;
    if (countElement) {
      countElement.textContent = `(${count})`;
    }
  };
  