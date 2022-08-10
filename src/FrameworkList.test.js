import React from "react";
import { render, screen } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

describe("Rendering the list with props", () => {
    it("Should render No Data when no data propped", () => {
        render(<FrameworkList />);
        expect(screen.getByText("No Data")).toBeInTheDocument();
    });
    it("Should render list item correctly", () => {
        const dummyData = [
            { id: 1, item: "React dummy" },
            { id: 2, item: "Vue dummy" },
            { id: 3, item: "Angular dummy" },
        ];
        render(<FrameworkList frameworks={dummyData} />);
        const frameworkItems = screen.getAllByRole("listitem").map((ele) => ele.textContent);
        const dummyItems = dummyData.map((ele) => ele.item);
        expect(frameworkItems).toEqual(dummyItems);
        expect(screen.queryByText("No Data")).toBeNull();
    });
});
