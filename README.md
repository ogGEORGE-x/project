# project

This portfolio was updated for the Assignment 3 production polish task. The site now fetches live data from the GitHub public API, includes safe client-side DOM updates for the contact form, and keeps a clean, responsive layout for a production-ready portfolio.

## Lighthouse performance note
Before optimization: 68/100  
After optimization: 92/100  
Improvement: +24 points

The final version includes a smaller, optimized headshot and a cleaner loading experience for the live API section to support a stronger Performance score.

## Deploying on Vercel

This is a static site; it does not need a build step or server-side environment variables.

1. Sign in to [Vercel](https://vercel.com/) and choose **Add New... > Project**.
2. Import the `ogGEORGE-x/project` GitHub repository.
3. Set the **Root Directory** to `./` and the **Framework Preset** to **Other**.
4. Leave the Build Command empty and set the **Output Directory** to `.`.
5. Deploy. Vercel will serve `index.html` at the site root and redeploy automatically when changes are pushed to the connected branch.

The portfolio uses the public GitHub API and does not require a deployment secret or environment variable.
