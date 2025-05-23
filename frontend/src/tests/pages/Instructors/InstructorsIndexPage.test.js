import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InstructorsIndexPage from "main/pages/Instructors/InstructorsIndexPage";
import { instructorsFixtures } from "fixtures/instructorsFixtures";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const axiosMock = new AxiosMockAdapter(axios);

describe("InstructorsIndexPage", () => {
  beforeEach(() => {
    axiosMock.reset();
    axiosMock
      .onGet("/api/instructors/all")
      .reply(200, instructorsFixtures.threeInstructors);
  });

  test("renders table and New button", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <InstructorsIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText("jettkim@ucsb.edu");

    expect(
      screen.getByTestId("InstructorTable-cell-row-0-col-email"),
    ).toHaveTextContent("jettkim@ucsb.edu");

    expect(
      screen.getByTestId("InstructorsIndexPage-newInstructor"),
    ).toBeInTheDocument();
  });
});
