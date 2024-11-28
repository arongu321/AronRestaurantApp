// MenuItem class that stores item for each class
class menuItem {
    
    // Initialize private attributes
    #id;
    #name;
    #price;
    #ingredients;
    #emoji;
    
    // menuItem constructor
    constructor(id, name, price, ingredients=[], emoji="") {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#ingredients = ingredients;
        this.#emoji = emoji;
    }
    
    
    // ### Getter Functions ###
    getName() {
        return this.#name;
    }
    
    getEmoji() {
        return this.#emoji;
    }
    
    getID() {
        return this.#id;
    }
    
    getIngredients() {
        return this.#ingredients;
    }

    getPrice() {
        return this.#price;
    }
    
    // ### Setter Functions ###
    setName(name) {
        this.#name = name;
    }

    setPrice(price) {
        this.#price = price;
    }
    
    // ### Ingredient Modifier Functions ###
    addIngredient(ingredient) {
        this.#ingredients.push(ingredient);
    }

    removeIngredient(ingredient) {
        this.#ingredients = this.#ingredients.filter(
            arrIngredient => arrIngredient !== ingredient
        );
    }

}

export {menuItem}