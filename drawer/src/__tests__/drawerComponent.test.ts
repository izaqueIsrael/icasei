import { DrawerComponent } from '../components/DrawerComponent';
import { getFavoriteCount } from '../utils/api';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { updateFavoriteCountElement } from '../utils/dom';

jest.mock('../utils/api');
jest.mock('../utils/dom', () => ({
  setupToggleColorButton: jest.fn(),
  updateFavoriteCountElement: jest.fn()
}));

describe('DrawerComponent', () => {
  let drawerComponent: DrawerComponent;
  let mockAxios: MockAdapter;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="single-spa-application:@challenge/drawer">
        <div class="border-[0.1rem] border-[#7b36e2] rounded-xl p-4 bg-black">
          <ul class="flex xl:flex-col gap-5 justify-center">
            <li class="text-xl font-mono text-[#7a7378] transition duration-300 transform hover:text-[#0babd4] cursor-pointer" data-id="videos">
              <a href="/">Videos</a>
            </li>
            <li class="text-xl font-mono text-[#7a7378] transition duration-300 transform hover:text-[#0babd4] cursor-pointer" data-id="bookmarks">
              <a href="/favorites">Favorites</a>
              <span class="text-yellow-200 favorite-count">(0)</span>
            </li>
          </ul>
        </div>
      </div>`;
    drawerComponent = new DrawerComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  it('should initialize and update favorite count', async () => {
    (getFavoriteCount as jest.Mock).mockResolvedValue(5);

    await drawerComponent.initialize();

    expect(updateFavoriteCountElement).toHaveBeenCalledWith(5);
  });

  it('should handle API error gracefully', async () => {
    (getFavoriteCount as jest.Mock).mockRejectedValue(new Error('API Error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await drawerComponent.initialize();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching favorite count:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
