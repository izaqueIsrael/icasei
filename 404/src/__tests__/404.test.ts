import { mount } from '../index';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

describe('404 Page', () => {
  beforeAll(async () => {
    document.body.innerHTML = '<div id="single-spa-application:@challenge/404"></div>';
    await mount({});
  });

  test('renders Error 404 text', () => {
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  test('renders Not Found! text', () => {
    expect(screen.getByText('Not Found!')).toBeInTheDocument();
  });
});
