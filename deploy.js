const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const projectRoot = __dirname;
const tempRoot = process.env.TEMP || process.env.TMP || projectRoot;
const stagePath = path.join(tempRoot, "parallax_effect_html_css-pages");

fs.mkdirSync(stagePath, { recursive: true });

for (const fileName of ["index.html", "style.css", "script.js"]) {
    fs.copyFileSync(path.join(projectRoot, fileName), path.join(stagePath, fileName));
}

const publicSource = path.join(projectRoot, "public");
const publicTarget = path.join(stagePath, "public");
fs.mkdirSync(publicTarget, { recursive: true });

for (const fileName of fs.readdirSync(publicSource)) {
    const sourcePath = path.join(publicSource, fileName);
    if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, path.join(publicTarget, fileName));
    }
}

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npxCommand, ["--yes", "gh-pages", "-d", stagePath, "-b", "gh-pages"], {
    cwd: projectRoot,
    stdio: "inherit",
    shell: true,
});
