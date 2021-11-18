export async function getTestsJSON() {
  if (import.meta.env.SSR) {
    // SSR 渲染给爬虫。
    const { getTests } = await import("./test");
    return JSON.stringify(await getTests());
  }
  return null;
}
