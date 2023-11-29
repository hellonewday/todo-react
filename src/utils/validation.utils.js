/* eslint-disable no-useless-escape */
export const validateTodo = (value) => {
  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

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

export const validateLabel = (label_name) => {
  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (label_name.length === 0) {
    return { name: "Title length must not be empty" };
  }
  if (label_name.length < 3) {
    return { name: "Title length must be above 3 characters" };
  }
  if (format.test(label_name)) {
    return { name: "Title must not contain special characters" };
  }
  if (label_name.length > 250) {
    return { name: "Title length must be below 250 characters" };
  } else return {};
};
