export default [
  {
    route: "/api/get_props",
    handler(req, res) {
      const url = new URL("http://e.c" + req.originalUrl);
      console.log("getProps", url.searchParams.toString());
      const routeName = url.searchParams.get("name") || "";
      res.end(
        JSON.stringify({
          name: routeName,
          server: true,
          msg: "This is page " + routeName.toUpperCase(),
        }),
      );
    },
  },
];
