var Jimp = require('jimp');
var fs = require('fs-extra');
var path = require('path');

var defaultSizes = [16, 32, 48, 64, 128, 256, 512];
var flagIndex = process.argv.indexOf('--sizes');
var sizes = flagIndex === -1 ? defaultSizes : process.argv.slice(flagIndex+1).map(Number);

var outputDir = 'assets/icons';

fs.mkdirsSync(outputDir); // Ensuring output directory exists

// Generate random pastel color once
var r = Math.floor(Math.random() * 128) + 127, // for red
    g = Math.floor(Math.random() * 128) + 127, // for green
    b = Math.floor(Math.random() * 128) + 127; // for blue
var pastelColor = Jimp.rgbaToInt(r, g, b, 255); //alpha (fully opaque)

sizes.map(function(size) {
    new Jimp(size, size, pastelColor, function (err, image) { // create new image with pastel background
        if (err) {
            console.error(err);
            return;
        }
        
        var fileName = `icon_${size}.png`;
        image.write(path.join(outputDir, fileName)); // save
    });
});
