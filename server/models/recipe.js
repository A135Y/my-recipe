const Recipe = sequelize.define('recipe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    steps: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { Recipe };
// Compare this snippet from src/pages/RecipeDetail.js:
