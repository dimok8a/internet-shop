const {Router} = require("express");
const router = Router();
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
router.get('/:clotheType/:imageName/:size?', (req, res) => {
        const filePath = path.resolve(__dirname, "../", "images", req.params.clotheType ,req.params.imageName);
        const size = req.params.size;
        if (fs.existsSync(filePath)){
            if (size) {
                if (size === 'S')
                    sharp(filePath)
                        .resize(70, 100)
                        .toBuffer()
                        .then(data => res.send(data))
                else if (size === "M") {
                    sharp(filePath)
                        .resize(250, 375)
                        .toBuffer()
                        .then(data => res.send(data))
                }
            } else {
                return res.sendFile(filePath);
            }

        } else {
            return res.sendFile(path.resolve(__dirname, "../", "images", "error.jpg"));
        }
})

module.exports = router;