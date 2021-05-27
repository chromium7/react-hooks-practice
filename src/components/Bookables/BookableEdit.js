import { useParams } from "react-router-dom";
import useFormState from "./useFormState";
import BookableForm from "./BookableForm";
import PageSpinner from "../UI/PageSpinner";

import { useUpdateBookable, useDeleteBookable, useBookable } from "./bookableHooks";

export default function BookableEdit() {
  const { id } = useParams();
  const { data, isLoading } = useBookable(id);

  const formState = useFormState(data);

  const { updateBookable, isUpdate, isUpdateError, updateError } = useUpdateBookable();
  const { deleteBookable, isDelete, isDeleteError, deleteError } = useDeleteBookable();

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete the bookable?")) {
      deleteBookable(formState.state);
    }
  }
  function handleSubmit() {
    updateBookable(formState.state);
  }

  if (isUpdateError || isDeleteError) {
    return <p>{updateError?.message || deleteError.message}</p>;
  }

  if (isLoading || isUpdate || isDelete) {
    return <PageSpinner />;
  }

  return (
    <BookableForm formState={formState} handleSubmit={handleSubmit} handleDelete={handleDelete} />
  );
}
