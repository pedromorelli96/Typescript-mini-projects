import { createForm } from "./createForm";
import { elements } from "./elements";

const { form, allInputs } = createForm();

const lastChild = document.body.lastElementChild;
document.body.insertBefore(form, lastChild);

form.onsubmit = (event) => {
    event.preventDefault();
    // 1. Convert allInputs to an array and get the values of each input as numbers
    const numbers = [...allInputs].map((input) => input.valueAsNumber);

    // 2. validate that all inputs have a value and that the value is a number (!NaN)
    const isValid = numbers.every((number) => !Number.isNaN(number));
    if (!isValid) {
        console.error("Please enter a valid number!");
        return;
    }

    // 3. if all inputs are valid, get the max and min values
    const maxNumber = Math.max(...numbers);
    const minNumber = Math.min(...numbers);

    elements.message.textContent = numbers.join(", ");

    elements.max.classList.remove("text-neutral-200");
    elements.max.classList.add("text-red-500");
    elements.max.textContent = `Max: ${maxNumber}`;

    elements.min.classList.remove("text-neutral-200");
    elements.min.classList.add("text-green-500");
    elements.min.textContent = `Min: ${minNumber}`;
};
