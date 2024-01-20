export function createForm() {
    const form = document.createElement("form");
    form.className = "flex flex-col items-center gap-4";

    const allInputs = Array.from({ length: 4 }, (_, index) => {
        const input = document.createElement("input");
        input.type = "number";
        input.className =
            "w-full rounded-md bg-neutral-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md";
        input.placeholder = `Number ${index + 1}`;
        form.appendChild(input);
        return input;
    });

    const submitButton = document.createElement("button");
    submitButton.className =
        "flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white";
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);

    return {
        form,
        allInputs,
    };
}
