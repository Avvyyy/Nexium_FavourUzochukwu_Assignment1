#  Welcome to Quote Generator

This tool was built with **Next.js** + **ShadCN UI** to help users generate motivational and themed quotes in an elegant UI.

---

##  Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.


## Modify the Code

* Edit components and logic as needed in the `app/` directory.
* All UI elements are styled using [ShadCN UI](https://ui.shadcn.com/).
* The quote data is located in the `public/data/quotes.json` file.

## Deployment

Push your changes to GitHub and deploy using Vercel, Netlify, or your preferred platform.

##  File Structure

```
app/
├── public/
│   └── data/
│       └── quotes.json           # Static quotes file
├── components/
│   ├── settings/
│   │   └── theme-toggler.tsx     # Theme toggle logic
│   └── ui/                       # UI components from ShadCN
├── layout.tsx                    # App layout
├── page.tsx                      # Form and quote generation logic
└── other components...           # Any additional components
```