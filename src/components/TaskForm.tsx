import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import * as yup from "yup";
import { ReactElement, ReactNode } from "react";
import { Task } from "../type";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import categories from "../categories";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title should be at least 3 characters.")
    .required("Task is required"),
  dueDate: yup.date().required("Due date is required"),
  category: yup.string().required("Category is required"),
});

const renderError = (touched: any, error: any): ReactNode => {
  if (touched && error) {
    return <div style={{ color: "#c5832b", fontWeight: 400 }}>{error}</div>;
  }
  return null;
};

const TaskForm = ({
  onSaveTask,
}: {
  onSaveTask: (task: Task) => void;
}): ReactElement => {
  const selectDate = (
    date: Date | null,
    setFieldValue: {
      (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ): Promise<void | FormikErrors<{
        id: string;
        title: string;
        dueDate: Date;
        category: string;
      }>>;
      (arg0: string, arg1: Date | null): void;
    }
  ) => {
    setFieldValue("dueDate", date);
  };

  return (
    <div
      style={{
        padding: "10vh",
        textAlign: "left",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <Formik
        initialValues={{
          id: "",
          title: "",
          dueDate: new Date(),
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values: Task, { setSubmitting }: FormikHelpers<Task>) => {
          setTimeout(() => {
            setSubmitting(false);
            onSaveTask(values);
          }, 500);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form style={{ fontSize: "1.2em", fontWeight: 600 }}>
            <div>
              <label htmlFor="title">Title</label>
            </div>
            <Field
              id="title"
              name="title"
              style={{
                width: "100%",
                height: "2em",
                border: "solid",
                borderColor: "transparent",
              }}
            />
            {errors.title && touched.title ? (
              <div style={{ color: "#c5832b", fontWeight: 400 }}>
                {errors.title}
              </div>
            ) : null}

            <div>
              <div>
                <label htmlFor="dueDate">Due Date</label>
              </div>
              <ReactDatePicker
                showIcon
                selected={new Date()}
                onChange={(date) => selectDate(date, setFieldValue)}
                name="dueDate"
                className="custom-datepicker"
              />
              {renderError(touched.dueDate, errors.dueDate)}
            </div>

            <label htmlFor="category">Category</label>
            <div>
              <Field
                name="category"
                as="select"
                style={{
                  width: "100%",
                  height: "2em",
                  border: "solid",
                  borderColor: "transparent",
                }}
              >
                <option>Select category</option>

                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </Field>
            </div>
            {errors.category && touched.category ? (
              <div style={{ color: "#c5832b", fontWeight: 400 }}>
                {errors.category}
              </div>
            ) : null}
            <button
              type="submit"
              style={{
                marginTop: "2%",
                backgroundColor: "#562c2c",
                color: "#f9ebe0",
              }}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
