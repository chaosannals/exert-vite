import App from "./App.vue";
import routes from "./routes";
import viteSSR from "vite-ssr/plugin";
import { createHead } from "@vueuse/head";

routes.forEach((route) => {
  route.props = (r) => ({
    ...(r.meta.state || {}),
    ...(r.props || {}),
  });
});

export default viteSSR(
  App,
  { routes },
  ({ app, router, isClient, url, initialState, initialRoute }) => {
    const head = createHead();
    app.use(head);

    app.component(ClientOnly.name, ClientOnly);

    app.provide("initialState", initialState);

    router.beforeEach(async (to, from, next) => {
      if (!!to.meta.state && (!import.meta.env.DEV || import.meta.env.SSR)) {
        return next();
      }

      const baseUrl = isClient ? "" : url.origin;

      try {
        const res = await fetch(
          `${baseUrl}/api/get_props?path=${
            encodeURIComponent(to.path)
          }&name=${to.name}&client=${isClient}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        to.meta.state = await res.json();
      } catch (error) {
        console.error(error);
      }

      next();
    });

    return { head };
  },
);
