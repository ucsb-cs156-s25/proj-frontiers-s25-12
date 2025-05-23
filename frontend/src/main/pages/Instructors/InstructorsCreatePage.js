import React from "react";
import RoleEmailForm from "main/components/Users/RoleEmailForm";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function InstructorsCreatePage() {

  const navigate = useNavigate();

  const objectToAxiosParams = (instructor) => ({
    url: "/api/instructors/post",
    method: "POST",
    params: { email: instructor.email },
  });

  const onSuccess = (instructor) => {
    toast(`New Instructor Created: ${instructor.email}`);
    navigate("/admin/instructors");
  };

  const mutation = useBackendMutation(objectToAxiosParams, { onSuccess });

  return (
    <div className="pt-3">
      <h1>Create Instructor</h1>
      <RoleEmailForm submitAction={mutation.mutate} buttonLabel="Create" />
    </div>
  );
}
