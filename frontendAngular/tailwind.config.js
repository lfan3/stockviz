module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@angular/material/**/*.{js,ts}", // Add this line
  ],
  important: true, // Add this to increase specificity
  // ... rest of your config
};
