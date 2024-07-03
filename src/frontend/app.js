document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('.view');
    const homeView = document.getElementById('home-view');
    const signupView = document.getElementById('signup-view');
    const loginView = document.getElementById('login-view');
    const recipesView = document.getElementById('recipes-view');
    const recipeFormView = document.getElementById('recipe-form-view');
    const recipeDetailView = document.getElementById('recipe-detail-view');
    const recipeFormTitle = document.getElementById('recipe-form-title');
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const addRecipeButton = document.getElementById('add-recipe-button');
    const findRecipesButton = document.getElementById('find-recipes-button');
    const ingredientInput = document.getElementById('ingredient-input');

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    let currentUser = null;

    const showView = (view) => {
        views.forEach(v => v.classList.remove('active'));
        view.classList.add('active');
    };

    document.getElementById('home').addEventListener('click', () => showView(homeView));
    document.getElementById('signup').addEventListener('click', () => showView(signupView));
    document.getElementById('login').addEventListener('click', () => showView(loginView));
    document.getElementById('recipes').addEventListener('click', () => {
        showView(recipesView);
        loadRecipes();
    });

    const loadRecipes = async () => {
        recipeList.innerHTML = '';
        if (currentUser) {
            try {
                const response = await fetch(`/api/recipes?user=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Failed to load recipes');
                }
                const recipes = await response.json();
                recipes.forEach(recipe => {
                    const li = document.createElement('li');
                    li.textContent = recipe.title;
                    li.addEventListener('click', () => viewRecipe(recipe._id));
                    recipeList.appendChild(li);
                });
            } catch (error) {
                console.error('Error loading recipes:', error);
                alert('Error loading recipes. Please try again.');
            }
        }
    };

    const viewRecipe = async (id) => {
        try {
            const response = await fetch(`/api/recipes/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipe');
            }
            const recipe = await response.json();
            document.getElementById('recipe-detail-title').textContent = recipe.title;
            document.getElementById('recipe-detail-ingredients').textContent = recipe.ingredients;
            document.getElementById('recipe-detail-instructions').textContent = recipe.instructions;
            document.getElementById('recipe-detail-image').src = recipe.image || '';
            showView(recipeDetailView);
        } catch (error) {
            console.error('Error viewing recipe:', error);
            alert('Error viewing recipe. Please try again.');
        }
    };

    recipeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = recipeForm['recipe-title'].value;
        const ingredients = recipeForm['recipe-ingredients'].value;
        const instructions = recipeForm['recipe-instructions'].value;
        const image = recipeForm['recipe-image'].value;

        try {
            let response;
            if (recipeFormTitle.textContent === 'Add Recipe') {
                response = await fetch('/api/recipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, ingredients, instructions, image, user: currentUser._id })
                });
            } else {
                const id = recipeForm.dataset.recipeId;
                response = await fetch(`/api/recipes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, ingredients, instructions, image })
                });
            }

            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }

            recipeForm.reset();
            showView(recipesView);
            loadRecipes();
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Error saving recipe. Please try again.');
        }
    });

    addRecipeButton.addEventListener('click', () => {
        recipeFormTitle.textContent = 'Add Recipe';
        recipeForm.dataset.recipeId = '';
        showView(recipeFormView);
    });

    const deleteRecipe = async (id) => {
        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }

            loadRecipes();
            showView(recipesView);
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('Error deleting recipe. Please try again.');
        }
    };

    findRecipesButton.addEventListener('click', async () => {
        try {
            const ingredients = ingredientInput.value;
            const response = await fetch(`/api/recipes/search?ingredients=${ingredients}`);
            if (!response.ok) {
                throw new Error('Failed to find recipes');
            }
            const recipes = await response.json();

            recipeList.innerHTML = '';
            recipes.forEach(recipe => {
                const li = document.createElement('li');
                li.textContent = recipe.title;
                li.addEventListener('click', () => viewRecipe(recipe._id));
                recipeList.appendChild(li);
            });
        } catch (error) {
            console.error('Error finding recipes:', error);
            alert('Error finding recipes. Please try again.');
        }
    });

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = signupForm['signup-username'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            alert('Sign up successful. Please log in.');
            showView(loginView);
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Sign up failed. Please try again.');
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            currentUser = await response.json();
            showView(recipesView);
            loadRecipes();
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    });
});