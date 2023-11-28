export const validateTodo = (value) => {
  let format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (value.title.length === 0) {
    return { title: "Title length must not be empty" };
  }
  if (value.title.length < 3) {
    return { title: "Title length must be above 3 characters" };
  }
  if (format.test(value.title)) {
    return { title: "Title must not contain special characters" };
  }
  if (value.title.length > 250) {
    return { title: "Title length must be below 250 characters" };
  }
  if (value.category.length === 0) {
    return { category: "Category must not be empty" };
  } else return {};
};
