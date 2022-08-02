const path = require('path');
const router = require('express').Router();


// got this on top than the others routers
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
//no matching route is found will default to home page
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;