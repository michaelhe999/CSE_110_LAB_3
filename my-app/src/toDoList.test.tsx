import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constant";
import userEvent from "@testing-library/user-event";

describe("Read ToDoList", () => {
  test("renders default page content", () => {
    render(<ToDoList />);

    dummyGroceryList.forEach((item) => {
      const element = screen.getByText(item.name);
      expect(element).toBeInTheDocument();
    });
  });
});

describe("Check checked items", () => {
    test("checks an item", () => {
        render(<ToDoList />);

        const itemsBoughtText0 = screen.getByText(/Items bought: 0/i);
        expect(itemsBoughtText0).toBeInTheDocument();
    
        const itemToCheck1 = dummyGroceryList[0];
    
        const itemCheckbox = screen.getByTestId(`checkbox-${itemToCheck1.name}`);
        fireEvent.click(itemCheckbox);
    
        const itemsBoughtText = screen.getByText(/Items bought: 1/i);
        expect(itemsBoughtText).toBeInTheDocument();

        const itemToCheck2 = dummyGroceryList[1];
        const itemCheckbox2 = screen.getByTestId(`checkbox-${itemToCheck2.name}`);
        fireEvent.click(itemCheckbox2);

        const itemsBoughtText2 = screen.getByText(/Items bought: 2/i);
        expect(itemsBoughtText2).toBeInTheDocument();

    });
});

describe("Check if item order changes", () => {
    test("checks an item", () => {
        render(<ToDoList />);

        const itemToCheck1 = dummyGroceryList[1];
        const itemCheckbox = screen.getByTestId(`checkbox-${itemToCheck1.name}`);
        fireEvent.click(itemCheckbox);

        const itemsBought = screen.getAllByRole("checkbox");
        try {
            expect(itemsBought[0].nextSibling?.textContent).toBe(dummyGroceryList[0].name);
            expect(itemsBought[1].nextSibling?.textContent).toBe(dummyGroceryList[1].name);
        } catch (error) {
            fail("Item order did not change");
        }

    });
});