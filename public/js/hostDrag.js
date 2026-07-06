document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("sortableListings");

    if (!container) return;

    new Sortable(container, {

        animation: 250,

        draggable: ".host-listing-card",

        ghostClass: "drag-ghost",

        chosenClass: "drag-chosen",

        dragClass: "dragging",

        onEnd: async function () {

    const order = [];

    container.querySelectorAll(".host-listing-card").forEach(card => {
        order.push(card.dataset.id);
    });

    try {

        const response = await fetch("/host/reorder", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ order })

        });

        const data = await response.json();

        if (data.success) {

            const toast = document.createElement("div");

            toast.innerText = "✓ Listing order saved";

            toast.className = "save-toast";

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 2000);

        }

    } catch (err) {

        console.log(err);

    }

}

    });

});