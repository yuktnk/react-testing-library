import React from "react";
import { render, screen, claenup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// test用のRedux store作成用
import { Provider } from "react-redux";
import Redux from "./Redux";
import { configureStore } from "@reduxjs/toolkit";

import customCounterReducer from "./features/customCounter/customCounterSlice";

describe("Redux Integration Test", () => {
    // test用のstoreを用意する
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                customCounter: customCounterReducer,
            },
        });
    });

    it("Should display value with increment by 1 per click", async () => {
        render(
            <Provider store={store}>
                <Redux />
            </Provider>
        );
        await userEvent.click(screen.getByText("+"));
        await userEvent.click(screen.getByText("+"));
        await userEvent.click(screen.getByText("+"));
        expect(screen.getByTestId("count-value")).toHaveTextContent("3");
    });

    it("Should display value with decrement by 1 per click", async () => {
        render(
            <Provider store={store}>
                <Redux />
            </Provider>
        );
        await userEvent.click(screen.getByText("-"));
        await userEvent.click(screen.getByText("-"));
        expect(screen.getByTestId("count-value")).toHaveTextContent("-2");
    });

    it("Should display value with incrementByAmount", async () => {
        render(
            <Provider store={store}>
                <Redux />
            </Provider>
        );
        await userEvent.type(screen.getByPlaceholderText("Enter"), "30");
        await userEvent.click(screen.getByText("incrementByAmount"));
        expect(screen.getByTestId("count-value")).toHaveTextContent("30");
    });
});
