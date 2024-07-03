// import axios from 'axios';

// const BFF_URL = 'http://localhost:5000'; // URL do BFF

// export class DrawerComponent {
//   constructor() {}

//   public async initialize(): Promise<void> {
//     this.setupToggleColorButton();
//     await this.updateFavoriteCount();
//   }

//   private setupToggleColorButton(): void {
//     const button = document.querySelector('.toggle-color') as HTMLButtonElement | null;
//     if (button) {
//       button.addEventListener('click', () => {
//         if (button.classList.contains('bg-red-500')) {
//           button.classList.remove('bg-red-500');
//           button.classList.add('bg-green-500');
//         } else {
//           button.classList.remove('bg-green-500');
//           button.classList.add('bg-red-500');
//         }
//       });
//     }
//   }

//   private async updateFavoriteCount(): Promise<void> {
//     try {
//       const response = await axios.get(`${BFF_URL}/favorites/count`);
//       const count = response.data.count;
//       const countElement = document.querySelector('.favorite-count') as HTMLElement | null;
//       if (countElement) {
//         countElement.textContent = `(${count})`;
//       }
//     } catch (error) {
//       console.error('Error fetching favorite count:', error);
//     }
//   }
// }
import { getFavoriteCount } from '../utils/api';
import { setupToggleColorButton, updateFavoriteCountElement } from '../utils/dom';

export class DrawerComponent {
  constructor() {}

  public async initialize(): Promise<void> {
    setupToggleColorButton();
    await this.updateFavoriteCount();
  }

  private async updateFavoriteCount(): Promise<void> {
    try {
      const count = await getFavoriteCount();
      updateFavoriteCountElement(count);
    } catch (error) {
      console.error('Error fetching favorite count:', error);
    }
  }
}
