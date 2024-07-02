import singleSpaHtml from 'single-spa-html';
import template from './template.html';
import './styles.css';
import { DrawerComponent } from './components/DrawerComponent';

const htmlLifecycles = singleSpaHtml({
  domElementGetter: (): HTMLElement => {
    const id = "single-spa-application:@challenge/drawer";
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

const drawerComponent = new DrawerComponent();

export const mount = async (props: any): Promise<void> => {
  await (htmlLifecycles.mount as (props: any) => Promise<void>)(props);
  await drawerComponent.initialize();
};

export const { bootstrap, unmount } = htmlLifecycles;
