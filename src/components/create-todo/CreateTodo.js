import { useEffect, useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import { validateLabel } from "../../utils/validation.utils";
import InputText from "../common/InputText";
import Button from "../common/Button";
import {
  useAddLabelMutation,
  useGetLabelsQuery,
} from "../../redux/apis/labelApi";

const categoryTemplate = {
  name: "",
  color: "",
};

const todoTemplate = {
  title: "",
  completed: false,
  description: "",
  progress: 0,
  category: "",
};

export default function CreatePopup(prop) {
  const {
    showModal,
    onShowModal,
    modalName,
    onCreateSave,
    todo,
    isFormInvalid,
    saveButtonName,
  } = prop;

  const { data } = useGetLabelsQuery();
  const [addCategory] = useAddLabelMutation();

  const [category, setCategory] = useState(categoryTemplate);
  const [isCreate, setIsCreate] = useState(false);
  const [formValue, setFormValue] = useState(todo || todoTemplate);
  const [categoryMsg, setCategoryMsg] = useState("");

  const titleRef = useRef();
  const categoryRef = useRef();

  const onFormValueChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onFormValueSave = (event) => {
    event.preventDefault();

    onCreateSave(formValue);
  };

  const onCategoryChange = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const onCategorySave = (event) => {
    event.preventDefault();
    if (Object.keys(validateLabel(category.name)).length > 0) {
      categoryRef.current.focus();
      setCategoryMsg(validateLabel(category.name).name);
    } else {
      addCategory(category).then((response) => {
        console.log(response.data.data.id);
        setFormValue({ ...formValue, category: response.data.data.id });
        setCategory(categoryTemplate);
        setIsCreate(!isCreate);
        setCategoryMsg("");
      });
    }
  };

  const switchIsCreate = () => {
    setIsCreate(!isCreate);
  };

  const onColorChange = (color) => {
    setCategory({ ...category, color: color.hex });
  };

  const onCloseModal = () => {
    setCategoryMsg("");
    setIsCreate(false);
    onShowModal(false);
  };

  useEffect(() => {
    if (showModal && todo) {
      setFormValue(todo);
    } else {
      setFormValue(todoTemplate);
    }
  }, [showModal, todo]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalName}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <InputText
                      name="title"
                      labelName={"Task Name"}
                      inputRef={titleRef}
                      placeholder="Type task name"
                      isFormInvalid={isFormInvalid?.title}
                      onChange={onFormValueChange}
                      value={formValue.title}
                    />
                  </div>
                  <div className="col-span-2">
                    <InputText
                      name="description"
                      labelName={"Description"}
                      placeholder="Description..."
                      onChange={onFormValueChange}
                      value={formValue.description}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        onChange={onFormValueChange}
                        name="category"
                        value={formValue?.category}
                        className=" bg-gray-200 border border-gray-200 text-gray-700 focus:bg-white focus:border-gray-500
                        py-3 px-4 pr-8 rounded leading-tight focus:outline-none block appearance-none w-full"
                        id="grid-state"
                      >
                        <option value="">-- Choose a option</option>
                        {data.data.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {isFormInvalid?.category !== undefined && (
                      <p className="error-message text-sm py-1 text-red-500">
                        {isFormInvalid.category}
                      </p>
                    )}

                    {isCreate ? (
                      <div className="col-span-2">
                        <input
                          type="text"
                          style={{ color: category.color }}
                          className="w-80 md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Category name"
                          onChange={onCategoryChange}
                          name="name"
                          ref={categoryRef}
                          value={category.name || ""}
                        />

                        <TwitterPicker
                          width="350px"
                          color={category.color || "#fff"}
                          onChangeComplete={onColorChange}
                        />
                        {categoryMsg.length > 0 && (
                          <p className="error-message text-sm py-1 text-red-500">
                            {categoryMsg}
                          </p>
                        )}
                      </div>
                    ) : null}
                    {isCreate ? (
                      <div className="space-x-2">
                        <button
                          onClick={switchIsCreate}
                          className="text-sm text-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onCategorySave}
                          className="text-sm text-blue-500"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-sm text-orange-500"
                        onClick={switchIsCreate}
                      >
                        + Add new category
                      </button>
                    )}
                  </div>

                  <div className="col-span-2">
                    <p>Progress: {formValue.progress || 0}%</p>
                    <input
                      style={{ width: "100%" }}
                      type="range"
                      min="0"
                      max="100"
                      name="progress"
                      value={formValue.progress || 0}
                      onChange={onFormValueChange}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onCloseModal}
                  >
                    Close
                  </button>
                  <Button
                    theme="submit"
                    handleClick={onFormValueSave}
                    styles={"font-bold"}
                  >
                    <span>{saveButtonName}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
