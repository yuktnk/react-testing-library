import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
    it("Shoud render all the elements correctly", () => {
        render(<Render />);
        // screen.debug();
        // screen.debug(screen.getByRole("heading"));
        expect(screen.getByRole("heading")).toBeTruthy();
        expect(screen.getByRole("textbox")).toBeTruthy();
        expect(screen.getAllByRole("button")[1]).toBeTruthy();
        expect(screen.getByText("Udemy")).toBeTruthy();
        expect(screen.queryByText("存在しないであろうテキスト")).toBeNull();
        expect(screen.getByTestId("copyright")).toBeTruthy();
    });
});
