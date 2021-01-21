# Reaktor preassignment

This is the preassignment for Reaktor. The application can be accessed on [Heroku](https://warehouse-stock-app.herokuapp.com/).

## Notes

- Pagination was not necessary but it speeded up the page loading times by a huge margin. Filtering became a necessity with pagination.
- Currently the application stores the data received from the API in memory for reuse to allow instant page changing. This would become a problem with more products or categories. The solution is storing them in memory altogether or to assign a limit of how much memory can be used.