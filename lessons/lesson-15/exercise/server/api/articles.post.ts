export default defineEventHandler(async (event) => {
  const body = await readBody(event); 
  const { title, content } = body;

  if (!title || !content) {
    return {
      statusCode: 400,
      body: { message: 'Title and content are required.' }
    }
  }

  const newArticle = {
    id: Math.floor(Math.random() * 1000),
    title,
    content
  };

  return newArticle;
});