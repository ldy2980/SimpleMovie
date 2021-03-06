const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
  // mongoDB에서 favorite 수 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    // 그 후 프론트에 favorite 정보 보내기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post('/favorited', (req, res) => {
  // 현재 유저가 해당 영화를 favorite 리스트에 넣었는지 여부를 DB에서 확인

  Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    // 그 후 프론트에 favorite 정보 보내기
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec(
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, doc });
    }
  );
});

router.post('/addToFavorite', (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post('/getFavoredMovie', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec(
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
