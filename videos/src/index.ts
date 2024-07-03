import singleSpaHtml from 'single-spa-html';
import template from './template.html';
import './styles.css';
import VideoComponent from './components/videoComponent';
import FavoriteComponent from './components/favoriteComponent';
import { setupModal } from './utils/modal';
import { AppProps } from './types';
import { apiService } from './utils/api';

class App {
  private videoComponent: VideoComponent;
  private favoriteComponent: FavoriteComponent;

  constructor() {
    this.videoComponent = new VideoComponent(this.updateFavoriteCount);
    this.favoriteComponent = new FavoriteComponent(this.updateFavoriteCount);
  }

  public async mount(props: AppProps): Promise<void> {
    const htmlLifecycles = singleSpaHtml({
      domElementGetter: (): HTMLElement => {
        const id = "single-spa-application:@challenge/videos";
        let container = document.getElementById(id) as HTMLElement | null;
        if (!container) {
          container = document.createElement("div");
          container.id = id;
          document.body.prepend(container);
        }
        return container;
      },
      template,
    });

    await (htmlLifecycles.mount as (props: AppProps) => Promise<void>)(props);

    setupModal();

    if (window.location.pathname === '/favorites') {
      await this.favoriteComponent.fetchAndDisplayFavorites();
    } else {
      await this.videoComponent.fetchAndDisplayVideos();
    }

    this.setupSearch();
    this.updateFavoriteCount();
  }

  private setupSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
  
    const performSearch = async () => {
      if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
          await this.videoComponent.fetchAndDisplaySearchedVideos(query);
        }
      }
    };
  
    if (searchButton) {
      searchButton.addEventListener('click', performSearch);
    }
  
    if (searchInput) {
      searchInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          await performSearch();
        }
      });
    }
  }  

  private async updateFavoriteCount() {
    try {
      const count = await apiService.getFavoriteCount();
      const countElement = document.querySelector('.favorite-count') as HTMLElement | null;
      if (countElement) {
        countElement.textContent = `(${count})`;
      }
    } catch (error) {
      console.error('Error fetching favorite count:', error);
    }
  }
}

const app = new App();

export const mount = (props: AppProps) => app.mount(props);
export const { bootstrap, unmount } = singleSpaHtml({
  domElementGetter: (): HTMLElement => {
    const id = "single-spa-application:@challenge/videos";
    let container = document.getElementById(id) as HTMLElement | null;
    if (!container) {
      container = document.createElement("div");
      container.id = id;
      document.body.prepend(container);
    }
    return container;
  },
  template,
});
