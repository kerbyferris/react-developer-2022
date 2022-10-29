export const selectCategoriesMap = (state) => {
  const categories = state.categories.categories;

  const categoryMap = categories.reduce((acc, { title, items }) => {
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};
