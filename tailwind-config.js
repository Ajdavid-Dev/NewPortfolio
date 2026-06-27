/* Tailwind (CDN) settings — shared by every page.
   Loaded right after the Tailwind CDN <script>. */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['"General Sans"', 'system-ui', 'sans-serif'] },
      colors: { accent: '#FF5A1F' },
    },
  },
};
