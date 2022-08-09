var express = require('express');
var router = express.Router();

var game_controller = require('../controllers/gameController.js');

router.get('/games', game_controller.search_games)
router.get('/game_titles', game_controller.game_titles)
router.post('/recommend', game_controller.recommend_games)

module.exports = router;