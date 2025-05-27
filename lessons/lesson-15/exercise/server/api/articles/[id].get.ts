export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID parameter is required'
        })
    }

    const articles = [
        { id: 1, title: "Nuxt 3 Guide", content: "Learn Nuxt 3 step-by-step." },
        { id: 2, title: "Vue Tips", content: "Useful tips for Vue developers." },
        { id: 3, title: "Modern Web", content: "Trends in modern web development." }
    ]

    const article = articles.find(article => article.id === parseInt(id))

    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found'
        })
    }

    return article
})