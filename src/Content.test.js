import React from "react";
import { unmountComponentAtNode } from "react-dom";
import moxios from "moxios";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Table, { normaliseDate, normalizeCurrency } from "./PageContent";

configure({ adapter: new Adapter() });

it("should return date formated dd.mm.yyyy", () => {
  expect(normaliseDate("2013-12-28T00:00:00+00:00")).toBe("28.12.2013");
});

it("should return empty string if NULL is passed", () => {
  expect(normalizeCurrency("NULL")).toBe("");
});

describe("<Table /> with no props", () => {
  let container = null;
  const data = [
    {
      "project": 2,
      "description": "Substitute Crème fraîche with evaporated milk in ice-cream products",
      "start date": "2013-12-28T00:00:00+00:00",
      "category": "Office supplies",
      "responsible": "Clark Kent",
      "savings amount": 3722.41684,
      "currency": "NULL",
      "complexity": "Moderate"
  },
  {
      "project": 1,
      "description": "Decrease production related non-categorized side costs",
      "start date": "2013-06-14T00:00:00+00:00",
      "category": "Dairy",
      "responsible": "Daisy Milks",
      "savings amount": 5583.62526,
      "currency": "USD",
      "complexity": "Hazardous"
  }
  ]
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
  var wrapper = shallow(<Table />);

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  var table = wrapper.find("table");
  it("should have one table element", () => {
    expect(table).toHaveLength(1);
  });

  it("should have one table element", () => {
    var table = wrapper.find("table");
    const thead = table.find("thead");
    const th = thead.find("th");
    expect(th).toEqual({});
    expect(th).toHaveLength(data.length);
  });
});

// describe("<Table />", () => {
// beforeEach(() => {
//   moxios.install();
//   moxios.stubRequest(
//     "https://sievo-react-assignment.azurewebsites.net/api/data",
//     {
//       status: 200,
//       response: [
//         {
//           project: 2,
//           description:
//             "Substitute Crème fraîche with evaporated milk in ice-cream products",
//           "start date": "2013-12-28T00:00:00+00:00",
//           category: "Office supplies",
//           responsible: "Clark Kent",
//           "savings amount": 3722.41684,
//           currency: "NULL",
//           complexity: "Moderate"
//         },
//         {
//           project: 1,
//           description: "Decrease production related non-categorized side costs",
//           "start date": "2013-06-14T00:00:00+00:00",
//           category: "Dairy",
//           responsible: "Daisy Milks",
//           "savings amount": 5583.62526,
//           currency: "USD",
//           complexity: "Hazardous"
//         }
//       ]
//     }
//   );
// });

// afterEach(() => {
//   moxios.uninstall();
// });

// it("can fetch data", () => {
//   const wrapped = mount(<Table />);
//   moxios.wait(() => {
//     expect(wrapped.find("").length).toEqual(8);
//     wrapped.unmount();
//   });
// });
// });
