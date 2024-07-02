// src/types/single-spa-html.d.ts
declare module 'single-spa-html' {
    import { LifeCycles } from 'single-spa';
  
    type HtmlOptions = {
      template: string | HTMLElement | (() => string | HTMLElement);
      domElementGetter?: () => HTMLElement;
    };
  
    export default function html(options: HtmlOptions): LifeCycles;
  }
  