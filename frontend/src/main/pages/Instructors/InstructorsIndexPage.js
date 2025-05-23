import React from "react";
import { useBackend } from "main/utils/useBackend";
import InstructorTable from "main/components/Instructors/InstructorTable";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "main/utils/currentUser";

export default function InstructorsIndexPage() {

  const { data: currentUser } = useCurrentUser();

  const { data: instructors, error: _error, status: _status } =
      useBackend(
        ["/api/instructors/all"],
        { method: "GET", url: "/api/instructors/all" },
        []
      );

  const sorted = React.useMemo(
    () => [...instructors].sort((a, b) => a.email.localeCompare(b.email)),
    [instructors]
  );

  const navigate = useNavigate();

  return (
    <div className="pt-3">
      <h1 data-testid="InstructorsIndexPage-title">Instructors</h1>
      <Button
        variant="primary"
        onClick={() => navigate("/admin/instructors/create")}
        data-testid="InstructorsIndexPage-newInstructor"
      >
        New Instructor
      </Button>
      <InstructorTable
        data={sorted}
        currentUser={currentUser}
        testIdPrefix="InstructorTable"
      />
    </div>
  );
}
