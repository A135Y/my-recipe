//create a model for the recipes that a particular user has liked

const UserRecipeLikes = sequelize.define('userRecipeLikes', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export { UserRecipeLikes };

