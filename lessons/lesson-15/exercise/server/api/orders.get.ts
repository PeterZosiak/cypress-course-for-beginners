export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (authHeader !== 'Bearer my-secret-token') {
    event.res.statusCode = 401
    return { error: 'Unauthorized' }
  }

  // Wait for 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000))

  const query = getQuery(event)
  const orders = [
    { id: 1, item: "Order One", quantity: 2, status: "Shipped" },
    { id: 2, item: "Order Two", quantity: 1, status: "Pending" },
    { id: 3, item: "Order Three", quantity: 5, status: "Delivered" },
    { id: 4, item: "Another Item", quantity: 3, status: "Pending" },
    //{ id: 5, item: "Special Order", quantity: 1, status: "Shipped" }
  ]

  if (query.search) {
    const searchTerm = String(query.search).toLowerCase()
    return orders.filter(order =>
      order.item.toLowerCase().includes(searchTerm) ||
      String(order.id).includes(searchTerm)
    )
  }
  return orders
})
