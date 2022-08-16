import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "../src/features/customCounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";

const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ username: "Bret dummy" }));
    })
);

beforeAll(() => server.listen());
afterAll(() => {
    server.close();
});

describe("Redux Async API Mocking", () => {
    // test用のstoreを用意する
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                customCounter: customCounterReducer,
            },
        });
    });
    it("[Fetch success] Should display username in h1 tag", async () => {
        render(
            <Provider store={store}>
                <ReduxAsync />
            </Provider>
        );
        expect(screen.queryByRole("heading")).toBeNull();
        await userEvent.click(screen.getByText("FetchJSON"));
        expect(await screen.findByText("Bret dummy")).toBeInTheDocument();
    });

    it("[Fetch failed] Should display anonymous in h1 tag", async () => {
        server.use(
            rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
                return res(ctx.status(404));
            })
        );
        render(
            <Provider store={store}>
                <ReduxAsync />
            </Provider>
        );
        expect(screen.queryByRole("heading")).toBeNull();
        await userEvent.click(screen.getByText("FetchJSON"));
        expect(await screen.findByText("anonymous")).toBeInTheDocument();
    });
});
