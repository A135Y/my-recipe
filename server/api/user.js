//create the server file for all the recipe routes


// Path: server/api/recipe.js
// import express from 'express';
// import { Recipe } from '../models/recipe.js';
//
// const router = express.Router();
//
// router.get('/', async (req, res) => {
//     try {
//         const recipes = await Recipe.find();
//         res.json(recipes);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const recipe = await Recipe.findById(req.params.id);
//         res.json(recipe);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
//
// router.post('/', async (req, res) => {
//     try {
//         const newRecipe = await Recipe.create(req.body);
//         res.json(newRecipe);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
//
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedRecipe = await Recipe.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.json(updatedRecipe);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
//         res.json(deletedRecipe);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
//
// export const recipeRoutes = router;
