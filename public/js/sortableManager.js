document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("sortableListings");

    if (!container) return;

    const saveBtn = document.getElementById("saveOrderBtn");

    const saveUrl = container.dataset.saveUrl;

    new Sortable(container, {

        animation: 250,

        draggable: ".admin-listing-card",

        ghostClass: "drag-ghost",

        chosenClass: "drag-chosen",

        dragClass: "dragging",

        onEnd(evt) {

    if (evt.oldIndex === evt.newIndex) {
        return;
    }

    saveBtn.disabled = false;

    document
        .getElementById("changesBadge")
        .classList.remove("d-none");

}
    });

    saveBtn.addEventListener("click", async () => {

        const order = [];

        container
            .querySelectorAll(".admin-listing-card")
            .forEach(card => {

                order.push(card.dataset.id);

            });

        const response = await fetch(saveUrl, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                order

            })

        });

        const data = await response.json();

        if (data.success) {

            saveBtn.disabled = true;
            document
.getElementById("changesBadge")
.classList.add("d-none");

            const toast = document.createElement("div");

toast.className = "save-toast";

toast.innerHTML = `
<i class="fa-solid fa-check"></i>
Order Saved
`;

document.body.appendChild(toast);

setTimeout(() => {

    toast.remove();

},2000);

        }

    });

});