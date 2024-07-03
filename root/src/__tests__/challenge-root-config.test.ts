import { registerApplication, start } from "single-spa";
import "../challenge-root-config";

jest.mock("single-spa", () => ({
  registerApplication: jest.fn(),
  start: jest.fn(),
}));

describe("challenge-root-config", () => {
  it("should register the @challenge/videos application", () => {
    expect(registerApplication).toHaveBeenCalledWith({
      name: "@challenge/videos",
      app: expect.any(Function),
      activeWhen: expect.any(Function),
      customProps: {
        domElementGetter: expect.any(Function),
      },
    });
  });

  it("should register the @challenge/drawer application", () => {
    expect(registerApplication).toHaveBeenCalledWith({
      name: "@challenge/drawer",
      app: expect.any(Function),
      activeWhen: expect.any(Function),
      customProps: {
        domElementGetter: expect.any(Function),
      },
    });
  });

  it("should register the @challenge/404 application for unknown routes", () => {
    expect(registerApplication).toHaveBeenCalledWith({
      name: "@challenge/404",
      app: expect.any(Function),
      activeWhen: expect.any(Function),
      customProps: {
        domElementGetter: expect.any(Function),
      },
    });
  });

  it("should start single-spa", () => {
    expect(start).toHaveBeenCalledWith({
      urlRerouteOnly: true,
    });
  });
});
