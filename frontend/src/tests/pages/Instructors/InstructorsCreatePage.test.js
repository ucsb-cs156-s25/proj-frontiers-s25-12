import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InstructorsCreatePage from "main/pages/Instructors/InstructorsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const axiosMock = new AxiosMockAdapter(axios);

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("InstructorsCreatePage", () => {
  beforeEach(() => {
    axiosMock.reset();
    axiosMock.onPost("/api/instructors/post").reply(200, {
      email: "new@ucsb.edu",
    });
  });

  test("submits and navigates", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <InstructorsCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByTestId("RoleEmailForm-email"), {
      target: { value: "new@ucsb.edu" },
    });

    fireEvent.click(screen.getByTestId("RoleEmailForm-submit"));

    await waitFor(() =>
      expect(axiosMock.history.post.length).toBe(1),
    );

    expect(axiosMock.history.post[0].params).toEqual({
      email: "new@ucsb.edu",
    });

    await waitFor(() =>
      expect(mockedNavigate).toHaveBeenCalledWith("/admin/instructors"),
    );
  });
});
