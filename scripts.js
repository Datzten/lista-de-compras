// Find the elements used by the shopping list form.
const form = document.querySelector(".add-item");
const input = document.getElementById("input");
const list = document.querySelector(".shopping-list");
const notice = document.querySelector(".notice");
const closeNotice = document.querySelector(".notice-close");

// Keep the removal notification hidden when the page loads.
notice.hidden = true;

// Add a new item whenever the form is submitted.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Remove extra spaces and prevent empty items from being added.
    const item = input.value.trim();
    if (!item) return;

    // Create the list item container.
    const newItem = document.createElement("li");
    newItem.className = "shopping-item";

    // Create a label for the checkbox and the item name.
    const label = document.createElement("label");
    label.textContent = item;

    // Create an accessible checkbox for the new item.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item-${Date.now()}`;
    label.htmlFor = checkbox.id;

    // Create the remove button and the trash-can icon.
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", `Remover ${item}`);

    removeButton.innerHTML = `
        <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"></path>
        </svg>
    `;

    // Connect removal behavior to the button created with the item.
    activateRemove(removeButton);

    // Insert all of the new elements into the shopping list.
    newItem.append(label, checkbox, removeButton);
    list.appendChild(newItem);

    // Clear the text field so another item can be entered.
    input.value = "";
});

// Attach the removal behavior to an existing or newly created remove button.
function activateRemove(button) {
    button.addEventListener("click", () => {
        button.closest(".shopping-item").remove();
        notice.hidden = false;
    });
}

// Activate removal for the buttons that already exist in the HTML.
document.querySelectorAll(".remove-button").forEach(activateRemove);

// Close the removal notification with the close button.
closeNotice.addEventListener("click", () => {
    notice.hidden = true;
});


