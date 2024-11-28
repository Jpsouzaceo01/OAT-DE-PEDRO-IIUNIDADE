// Função para carregar os ingredientes salvos
function loadIngredients() {
    const ingredientList = document.getElementById('ingredientList');
    ingredientList.innerHTML = '';

    const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients.forEach((ingredient, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${ingredient}
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="editIngredient(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteIngredient(${index})">Excluir</button>
            </div>
        `;
        ingredientList.appendChild(li);
    });
}

// Função para adicionar um ingrediente
document.getElementById('ingredientForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const ingredientName = document.getElementById('ingredientName').value.trim();
    if (ingredientName) {
        const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
        ingredients.push(ingredientName);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));

        document.getElementById('ingredientForm').reset();
        loadIngredients();
    }
});

// Função para editar um ingrediente
function editIngredient(index) {
    const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const newIngredient = prompt('Editar ingrediente:', ingredients[index]);
    if (newIngredient !== null && newIngredient.trim() !== '') {
        ingredients[index] = newIngredient.trim();
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        loadIngredients();
    }
}

// Função para excluir um ingrediente
function deleteIngredient(index) {
    const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients.splice(index, 1);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    loadIngredients();
}

// Carregar os ingredientes ao carregar a página
document.addEventListener('DOMContentLoaded', loadIngredients);

