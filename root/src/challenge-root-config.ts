import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@challenge/videos",
  app: () => System.import<LifeCycles>("@challenge/videos"),
  activeWhen: ["/", "/favorites"],
  customProps: {
    domElementGetter: () => document.getElementById("videos-container")
  }
});

registerApplication({
  name: "@challenge/drawer",
  app: () => System.import<LifeCycles>("@challenge/drawer"),
  activeWhen: ["/", "/favorites"],
  customProps: {
    domElementGetter: () => document.getElementById("drawer-container")
  }
});

registerApplication({
  name: "@challenge/404",
  app: () => System.import<LifeCycles>("@challenge/404"),
  activeWhen: (location) => {
    return !["/", "/favorites"].includes(location.pathname);
  },
  customProps: {
    domElementGetter: () => document.getElementById("videos-container") // Or another container for 404 content
  }
});

start({
  urlRerouteOnly: true,
});
