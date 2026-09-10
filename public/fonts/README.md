# "The Seasons" Font Directory

Place your "The Seasons" font files in this folder (`/public/fonts/`):

### Expected File Names (referenced by `layout.tsx` and `globals.css`):
- **Regular**: `theseasons-reg.otf`
- **Italic**: `theseasons-it.otf`
- **Bold**: `theseasons-bd.otf`
- **Bold Italic**: `theseasons-bdit.otf`
- **Light**: `theseasons-lt.otf`
- **Light Italic**: `theseasons-ltit.otf`

The website automatically checks:
1. Local system fonts (`local('The Seasons')`) if installed on your computer.
2. Webfont files placed in this `/public/fonts/` directory.
3. Fallback high-contrast Didone serifs (`Instrument Serif`, `Didot`, `Bodoni MT`).
