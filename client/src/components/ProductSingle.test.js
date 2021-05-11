import React from "react";
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ProductSingle from "./ProductSingle";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeProduct = {
    category: 2,
    company: "Macrohard Corporation",
    creator: "Johnny Cash",
    description: "Three CD anthology of Johnnys recordings for the legendary Sun Records label. Filled with finished masters, alternate takes, demos and more rarities, this is the absolute finest collection of Johnnys early recordings available.",
    image: "brett-jordan-U-pM7rAwDzo-unsplash.webp",
    name: "The Complete Sun Masters",
    price: "29.99",
    product_id: 18,
    ratings: 3312,
    score: 45,
    stock_amount: 9,
    year: 2018
  };
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeProduct)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
        <MemoryRouter initialEntries={["/products/18"]}>
    <ProductSingle id="123" />
    </MemoryRouter>, container);
  });

  expect(container.getElementsByClassName("ProductName").textContent).toBe(fakeProduct.name);
  expect(container.getElementsByClassName("ProductDescription").textContent).toBe(fakeProduct.description);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
  global.fetch.mockClear();
  delete global.fetch;
});
