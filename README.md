# Happy Birthday website 🎂

An interactive birthday page with three surprises: a letter in an envelope, a photo album, and a cake with candles to blow out. Colours: pastel pink, teal, pastel yellow.

## Files

| File | What it does |
|---|---|
| `config.js` | **Edit this.** Her name, the letter text and the album photos/captions |
| `photos/` | **Put your pictures here** |
| `index.html` | Page structure |
| `style.css` | Colours and styling (the colour variables are at the top) |
| `script.js` | The interactions |

## Add your photos and letter

1. Copy your pictures into the `photos/` folder. Smaller files load faster, so aim for under 500 KB each.
2. Open `config.js` and set each `file`, e.g. `file: "photos/beach.jpg"`.
3. Change `caption` to whatever you like.
4. Rewrite the `letter` lines. Each line is one paragraph.
5. Change `name`.

To preview, open `index.html` in your browser (double-click it).

## Put it on GitHub and make it a live website

1. Create a new repository on github.com (for example `birthday`).
2. Upload everything in this folder (the "Add file → Upload files" button works, or use git).
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then Save.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

Send her that link. Whenever you change a file and commit, the site updates.

### With git instead

```bash
git init
git add .
git commit -m "Birthday site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Tips

- The repo can be public or private. GitHub Pages on a private repo needs a paid plan, so if you want the page private, keep the link to yourself rather than the repo.
- Photo file names are case-sensitive on GitHub Pages: `Beach.JPG` is not `beach.jpg`.
- Change the colours in the `:root` block at the top of `style.css`.
