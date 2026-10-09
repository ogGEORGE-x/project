const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const projectGrid = document.querySelector("#project-grid");
const apiStatus = document.querySelector("#api-status");

const githubUsername = "ogGEORGE-x";

function createProjectCard(repo) {
    const card = document.createElement("article");
    card.className = "project-card";

    const tag = document.createElement("span");
    tag.className = "project-tag";
    tag.textContent = repo.language ? repo.language : "Repository";

    const title = document.createElement("h3");
    title.textContent = repo.name;

    const meta = document.createElement("div");
    meta.className = "repo-meta";

    const stars = document.createElement("span");
    stars.textContent = `★ ${repo.stargazers_count}`;

    const forks = document.createElement("span");
    forks.textContent = `Forks ${repo.forks_count}`;

    const description = document.createElement("p");
    description.textContent = repo.description || "No description provided for this repository yet.";

    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "View on GitHub";

    meta.append(stars, forks);
    card.append(tag, title, meta, description, link);
    return card;
}

async function loadGitHubProjects() {
    if (!projectGrid || !apiStatus) {
        return;
    }

    projectGrid.textContent = "";
    const loadingCard = document.createElement("article");
    loadingCard.className = "project-card";
    const loadingTag = document.createElement("span");
    loadingTag.className = "project-tag";
    loadingTag.textContent = "Loading";
    const loadingTitle = document.createElement("h3");
    loadingTitle.textContent = "Fetching live repositories...";
    const loadingText = document.createElement("p");
    loadingText.textContent = "Your GitHub project list is loading from a live API.";
    loadingCard.append(loadingTag, loadingTitle, loadingText);
    projectGrid.appendChild(loadingCard);
    apiStatus.textContent = "Loading live project data...";

    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=6`, {
            headers: {
                Accept: "application/vnd.github+json"
            }
        });

        if (!response.ok) {
            throw new Error("The GitHub API request failed.");
        }

        const repos = await response.json();
        const featuredRepos = repos
            .filter((repo) => !repo.private)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 3);

        projectGrid.textContent = "";

        if (!featuredRepos.length) {
            throw new Error("No public repositories were returned.");
        }

        featuredRepos.forEach((repo) => {
            projectGrid.appendChild(createProjectCard(repo));
        });

        apiStatus.textContent = "Live GitHub data is loading successfully.";
    } catch (error) {
        projectGrid.textContent = "";
        const fallbackCard = document.createElement("article");
        fallbackCard.className = "project-card";
        const tag = document.createElement("span");
        tag.className = "project-tag";
        tag.textContent = "Notice";
        const title = document.createElement("h3");
        title.textContent = "Live data unavailable";
        const message = document.createElement("p");
        message.textContent = "The public repository feed could not be loaded right now. Please try again later.";
        fallbackCard.append(tag, title, message);
        projectGrid.appendChild(fallbackCard);
        apiStatus.textContent = "Unable to load the live project feed at the moment.";
    }
}

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const subject = String(formData.get("subject") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please complete all fields before sending your message.";
            return;
        }

        const body = `From: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoUrl = `mailto:georgenjoro@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        formStatus.textContent = "Your email app should open with your message ready to send.";
        window.location.href = mailtoUrl;
    });
}

loadGitHubProjects();