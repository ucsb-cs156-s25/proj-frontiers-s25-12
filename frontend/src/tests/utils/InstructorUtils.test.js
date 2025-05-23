import {
  onDeleteSuccess,
  cellToAxiosParamsDelete,
} from "main/utils/InstructorUtils";
import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const original = jest.requireActual("react-toastify");
  return { __esModule: true, ...original, toast: (x) => mockToast(x) };
});

describe("InstructorUtils", () => {
  test("onDeleteSuccess logs and toasts", () => {
    const restore = mockConsole();
    onDeleteSuccess("woo");
    expect(mockToast).toHaveBeenCalledWith("woo");
    expect(console.log).toHaveBeenCalled();
    restore();
  });

  test("cellToAxiosParamsDelete returns correct config", () => {
    const cell = { row: { values: { email: "jettkim@ucsb.edu" } } };
    const result = cellToAxiosParamsDelete(cell);
    expect(result).toEqual({
      url: "/api/instructors",
      method: "DELETE",
      params: { email: "jettkim@ucsb.edu" },
    });
  });
});
