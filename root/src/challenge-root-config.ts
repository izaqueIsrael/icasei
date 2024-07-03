import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@challenge/videos",
  app: () => System.import<LifeCycles>("@challenge/videos"),
  activeWhen: (location) => ["/", "/favorites"].includes(location.pathname),
  customProps: {
    domElementGetter: () => document.getElementById("videos-container")
  }
});

registerApplication({
  name: "@challenge/drawer",
  app: () => System.import<LifeCycles>("@challenge/drawer"),
  activeWhen: () => true,
  customProps: {
    domElementGetter: () => document.getElementById("drawer-container")
  }
});

function isUnknownRoute(location) {
  return !["/", "/favorites"].includes(location.pathname);
}

registerApplication({
  name: "@challenge/404",
  app: () => System.import<LifeCycles>("@challenge/404"),
  activeWhen: isUnknownRoute,
  customProps: {
    domElementGetter: () => document.getElementById("videos-container")
  }
});

start({
  urlRerouteOnly: true,
});
