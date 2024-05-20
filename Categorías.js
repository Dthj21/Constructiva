// JavaScript para agregar categorías a la tabla
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addCategoryButton");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close");
    const form = document.getElementById("categoryForm");
    const tableBody = document.querySelector("#categoryTable tbody");

    // Mostrar modal al hacer clic en el botón "Agregar Categoría"
    addButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Ocultar modal al hacer clic en el botón de cerrar
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Ocultar modal al hacer clic fuera de él
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Agregar categoría al enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const categoryName = document.getElementById("categoryName").value;
        const categoryDescription = document.getElementById("categoryDescription").value;

        if (categoryName.trim() !== "" && categoryDescription.trim() !== "") {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${categoryName}</td>
                <td>${categoryDescription}</td>
            `;
            tableBody.appendChild(newRow);

            // Limpiar campos del formulario
            form.reset();
            modal.style.display = "none"; // Ocultar modal
        } else {
            alert("Por favor, complete ambos campos.");
        }
    });
});
