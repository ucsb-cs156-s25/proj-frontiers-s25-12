import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
  console.log(message);
  toast(message);
}

export function cellToAxiosParamsDelete(cell) {
  return {
    url: "/api/instructors",
    method: "DELETE",
    params: {
      email: cell.row.values.email,
    },
  };
}
