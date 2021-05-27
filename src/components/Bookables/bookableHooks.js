import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import getData, { deleteItem, editItem } from "../../utils/api";

export function useBookable(id) {
  const queryClient = useQueryClient();
  return useQuery(["bookable", id], () => getData(`http://localhost:3001/bookables/${id}`), {
    // Refetching causes a problem after deleting a bookable
    refetchOnWindowFocus: false,
    initialData: queryClient.getQueryData("bookables")?.find((b) => b.id === parseInt(id, 10)),
  });
}

function getIdForFirstInGroup(bookables, excludedBookable) {
  // Get the id and group of the deleted bookable
  const { id, group } = excludedBookable;

  // Find the first other bookable in the same group as the deleted one
  const bookableInGroup = bookables.find((b) => b.group === group && b.id !== id);

  // Return its id or undefined
  return bookableInGroup?.id;
}

function updateBookablesCache(bookable, queryClient) {
  // Get all bookables from the cache
  const bookables = queryClient.getQueryData("bookables") || [];

  // Find the index of the cache of the bookable that has been updated
  const bookableIndex = bookables.find((b) => b.id === bookable.id);

  // If found, replace the pre-edited version with the edited one
  if (bookableIndex !== -1) {
    bookables[bookableIndex] = bookable;
    queryClient.setQueryData("bookables", bookables);
  }
}

export function useUpdateBookable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (item) => editItem(`http://localhost:3001/bookables/${item.id}`, item),
    {
      onSuccess: (bookable) => {
        // Replace the pre-edited version in the bookables cache
        // with the edited bookable
        updateBookablesCache(bookable, queryClient);

        // do the same with the individual bookable cache
        queryClient.setQueryData(["bookable", String(bookable.id)], bookable);

        // show the updated bookable
        navigate(`/bookables/${bookable.id}`);
      },
    },
  );

  return {
    updateBookable: mutation.mutate,
    isUpdating: mutation.isLoading,
    isUpdateError: mutation.isError,
    updateError: mutation.error,
  };
}

export function useDeleteBookable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (bookable) => deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
    {
      // On success receives the original item as the second argument
      onSuccess: (response, bookable) => {
        // Get all the bookables from the cache
        const bookables = queryClient.getQueryData("bookables") || [];
        // Set the bookables cache without the deleted one
        queryClient.setQueryData(
          "bookables",
          bookables.filter((b) => b.id !== bookable.id),
        );

        // If there are no other bookables in the same group as the deleted one,
        // navigate to the first
        navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`);
      },
    },
  );

  return {
    deleteBookable: mutation.mutate,
    isDelete: mutation.isLoading,
    isDeleteError: mutation.isError,
    deleteError: mutation.error,
  };
}
