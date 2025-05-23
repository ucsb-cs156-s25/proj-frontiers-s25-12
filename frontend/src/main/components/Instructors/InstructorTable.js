import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { hasRole } from "main/utils/currentUser";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
} from "main/utils/InstructorUtils";

export default function InstructorTable({
  data,
  currentUser,
  testIdPrefix = "InstructorTable",
}) {
  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/instructors/all"]
  );

  const deleteCallback = (cell) => {
    deleteMutation.mutate(cell);
  };

  const columns = [
    {
      Header: "Email",
      accessor: "email",
    },
  ];

  if (hasRole(currentUser, "ROLE_ADMIN")) {
    columns.push(
      ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix)
    );
  }

  return (
    <OurTable
      data={data}
      columns={columns}
      testid={testIdPrefix}
    />
  );
}
