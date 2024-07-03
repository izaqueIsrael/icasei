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
