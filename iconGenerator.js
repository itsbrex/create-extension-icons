#!/usr/bin/env node

/**
 * Generates a uniform set of size-labeled placeholder icons to help you get started with your new chrome/web-extension.
 * @summary Usage:
 * - `npx icons` generates all sizes of the same color and outputs them to the assets/icons folder
 * - `npx icons --sizes 16 48 128 --random` generates only the specified sizes with random colors
 * @description Size of the icon is overlaid on top of the icon to help you debug when working with multiple icons in the browser that use different sizes.
 */

const fs = require("fs");
const { createCanvas } = require("canvas");

class IconGenerator {
  constructor() {
    // Default sizes for the icons
    this.defaultSizes = [16, 32, 48, 64, 128, 256, 512];

    // Check if the user has specified custom sizes using the --sizes flag
    const flagIndex = process.argv.indexOf("--sizes");

    // If custom sizes are specified, use them, otherwise use the default sizes
    this.sizes =
      flagIndex === -1
        ? this.defaultSizes
        : process.argv.slice(flagIndex + 1).map(Number);

    // Check if the user has specified the --random flag to generate random colors
    this.randomFlag = process.argv.includes("--random");

    // Generate random RGB values if the --random flag is specified, otherwise use default values
    this.defaultR = Math.floor(Math.random() * 128) + 127;
    this.defaultG = Math.floor(Math.random() * 128) + 127;
    this.defaultB = Math.floor(Math.random() * 128) + 127;

    // Create the icons directory if it doesn't exist
    fs.mkdirSync("assets/icons", { recursive: true });

    // Create an icon for each specified size
    this.sizes.forEach((size) => this.createImage(size));
  }

  createImage(size) {
    // Create a canvas with the specified size
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Generate random RGB values if the --random flag is specified, otherwise use default values
    const r = this.randomFlag
      ? Math.floor(Math.random() * 128) + 127
      : this.defaultR;
    const g = this.randomFlag
      ? Math.floor(Math.random() * 128) + 127
      : this.defaultG;
    const b = this.randomFlag
      ? Math.floor(Math.random() * 128) + 127
      : this.defaultB;

    // Fill the canvas with the generated color
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, size);

    // Determine the text color based on the brightness of the background color
    ctx.fillStyle = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";

    // Add the size of the icon to the center of the canvas
    ctx.font = `${Math.round(size * 0.55)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(size.toString(), size / 2, size / 2);

    // Convert the canvas to a PNG buffer and write it to a file
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`assets/icons/icon_${size}.png`, buffer);
  }
}

// If this file is run directly, create a new IconGenerator instance
if (require.main === module) {
  new IconGenerator();
}

// Export the IconGenerator class for use in other files
module.exports = IconGenerator;
