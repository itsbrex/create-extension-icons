const fs = require('fs');
const { createCanvas } = require('canvas');

const defaultSizes = [16, 32, 48, 64, 128, 256, 512];
const flagIndex = process.argv.indexOf('--sizes');
const sizes = flagIndex === -1 ? defaultSizes : process.argv.slice(flagIndex+1).map(Number);

const randomFlag = process.argv.includes('--random');

// Generate random pastel color once
const defaultR = Math.floor(Math.random() * 128) + 127; // for red
const defaultG = Math.floor(Math.random() * 128) + 127; // for green
const defaultB = Math.floor(Math.random() * 128) + 127; // for blue

function createImage(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Generate individual random pastel colors if --random flag is enabled
  const r = randomFlag ? Math.floor(Math.random() * 128) + 127 : defaultR;
  const g = randomFlag ? Math.floor(Math.random() * 128) + 127 : defaultG;
  const b = randomFlag ? Math.floor(Math.random() * 128) + 127 : defaultB;

  // Fill the background with that color
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(0, 0, size, size);

  // Calculate contrast color based on brightness difference for the text color
  ctx.fillStyle = (r*0.299 + g*0.587 + b*0.114) > 186 ? 'black' : 'white';

  // Set the font size
  ctx.font = `${Math.round(size * 0.55)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw the text
  ctx.fillText(size.toString(), size / 2, size / 2);

  // Save the image as a PNG file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`assets/icons/icon_${size}.png`, buffer);
}

// Create the output folder if it doesn't exist
fs.mkdirSync('assets/icons', { recursive: true });

// Generate the images
sizes.forEach(createImage);



//   This line is computing the perceived brightness of a color and determining whether the color is "light" or "dark." Here are explanations for these hard-coded numbers:
//   1.  ﻿(r*0.299 + g*0.587 + b*0.114) > 186: This is a weighted average calculation to find the perceived brightness of a color, and it's based on the human eye's sensitivity to different colors. Our eyes are most sensitive to green, followed by red, and then blue, so each value is weighted differently—0.299 for red, 0.587 for green, and 0.114 for blue. The sum will be a value between 0 (darkest) and 255 (brightest).
//   2.  ﻿186: This is the brightness threshold used to distinguish between "light" colors and "dark" colors. Any color with brightness above this threshold is considered light, and a darker font color (﻿black) will be used for contrast. Any color with brightness below or equal to the threshold is considered dark, and a lighter font color (﻿white) will be used.
// These constants are used to ensure maximum contrast between the background color and text color for improved readability, based on established principles of human vision and color perception.
