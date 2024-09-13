module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Specify the paths to all of your components
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add a new key '16' to specify 16 columns
        '20': 'repeat(20, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
