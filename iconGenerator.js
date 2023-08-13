#!/usr/bin/env node

// file: iconGenerator.js
// Generates a uniform set of size-labeled placeholder icons to help you get started with your new chrome/web-extension.
// Usage: 
// `npx icons` generates all sizes of the same color and outputs them to the assets/icons folder
// `npx icons --sizes 16 48 128 --random` generates only the specified sizes with random colors

// Size of the icon is overlaid on top of the icon to help you debug when working with multiple icons in the browser that use different sizes.


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