# A birthday surprise for Swara ♡

A mobile-friendly, static birthday gift website made with plain HTML, CSS and JavaScript. Ready to publish on GitHub Pages.

## Preview locally

Open `index.html` in a browser, or run a local static server from this folder (for example `python3 -m http.server 8000`) and visit `http://localhost:8000`.

## Add your own assets

- **Background music:** place an audio file you are allowed to use at `assets/until-i-found-you.mp3`. The page does not include the copyrighted recording. The music button stays user-controlled; browsers generally require a tap before audio can play.
- **Photo:** place your photo at `assets/our-photo.jpg`. The placeholder automatically gives way to the image when it exists.
- The cat's meow is synthesized with the Web Audio API, so no cat sound file is needed.

You can replace the letter text in `index.html` and customize colors near the top of `style.css`.

## Publish with GitHub Pages

1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose your main branch and `/ (root)`, then save.
4. Wait for GitHub Pages to publish the site. No build step or framework is required.

All asset paths are relative, so the site works from a GitHub Pages project URL as well as a custom domain.
