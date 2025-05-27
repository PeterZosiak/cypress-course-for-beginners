export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID parameter is required'
        })
    }

    const body = await readBody(event)
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Request body is required'
        })
    }

    // Simulate existing articles (in real app, this would come from database)
    const articles = [
        { id: 1, title: "Nuxt 3 Guide", content: "Learn Nuxt 3 step-by-step." },
        { id: 2, title: "Vue Tips", content: "Useful tips for Vue developers." },
        { id: 3, title: "Modern Web", content: "Trends in modern web development." }
    ]

    const articleIndex = articles.findIndex(article => article.id === parseInt(id))

    if (articleIndex === -1) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found'
        })
    }

    // Validate required fields
    if (!body.title || !body.content) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title and content are required'
        })
    }

    // Simulate updating the article
    const updatedArticle = {
        id: parseInt(id!),
        title: body.title,
        content: body.content,
        updatedAt: new Date().toISOString() // Add timestamp for demo
    }

    // Simulate a delay (like database operation)
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
        message: 'Article updated successfully',
        article: updatedArticle
    }
})