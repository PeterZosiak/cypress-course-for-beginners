export default defineEventHandler((event) => {
  const query = getQuery(event);
  const articles = [
    { id: 1, title: "Nuxt 3 Guide", content: "Learn Nuxt 3 step-by-step." },
    { id: 2, title: "Vue Tips", content: "Useful tips for Vue developers." },
    { id: 3, title: "Modern Web", content: "Trends in modern web development." }
  ];
  if (query.search) {
    return articles.filter(article =>
      article.title.toLowerCase().includes(query.search.toLowerCase())
    );
  }
  return articles;
});
