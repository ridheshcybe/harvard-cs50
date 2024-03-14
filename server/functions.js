import { resolve, join, basename } from "path";
import { readdirSync, readFileSync, existsSync } from "fs";
export function fetch(dirtoread) {
    const normal = readdirSync(dirtoread).filter((e) => e !== ".DS_Store");
    const normalresolved = normal.map((e) => resolve(dirtoread, e));
    return [normal, normalresolved];
}
function notes(e) {
    let note = "";
    const notes = join(e, "notes");
    const resolved = readdirSync(notes)
        .filter((e) => e !== ".DS_Store")
        .map((e) => resolve(notes, e));
    return new Promise((r, j) => {
        const renderthese = resolved.map((e) => {
            const data = readFileSync(e);
            if (e.endsWith(".txt"))
                return render(data);
            return new Promise((r, j) => r(data));
        });
        Promise.all(renderthese).then((done) => {
            for (let i = 0; i < done.length; i++) {
                note += "<br>\n" + done[i];
            }
            r(note);
        });
    });
}
function getimports(imports) {
    return new Promise((r, j) => {
        const data = {};
        if (existsSync(imports)) {
            const [files, resolved] = fetch(imports);
            for (let c = 0; c < resolved.length; c++) {
                data[files[c]] = readFileSync(resolved[c]);
            }
            r(data);
        }
        else
            r({});
    });
}
function getvidfile(e) {
    return new Promise((r, j) => {
        const embeds = {};
        if (existsSync(e)) {
            const [files, resolved] = fetch(e);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filetag = basename(file).split(".");
                if (!filetag[1])
                    continue;
                // read file and escape the import tags
                embeds[file] = readFileSync(resolved[i])
                    .toString()
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;");
            }
            r(embeds);
        }
        else
            r({});
    });
}
export function runfiles(dirtoread) {
    const data = {};
    const [weeks, weeksresolved] = fetch(dirtoread);
    return new Promise((r, j) => {
        for (let i = 0; i < weeksresolved.length; i++) {
            const e = weeksresolved[i];
            const import_path = join(e, "imports");
            const videofiles = join(e, "video-files");
            const promises = [
                notes(e),
                getvidfile(videofiles),
                getimports(import_path),
            ];
            Promise.all(promises).then((e) => {
                const notes = e[0];
                const embeds = e[1];
                const imports = e[2];
                const assemble = { notes: "", imports: {}, embeds: {} };
                if (typeof notes == "string")
                    assemble.notes = notes;
                if (typeof embeds == "object")
                    assemble.embeds = embeds;
                if (typeof imports == "object")
                    assemble.imports = imports;
                data[weeks[i]] = assemble;
                r(data);
            });
        }
    });
}
/**
 * Render file
 * @param {Buffer} data
 */
export async function render(data) {
    const LINES = data.toString().split("\n");
    const parsed = ["<pre>"];
    for (let i = 0; i < LINES.length; i++) {
        const element = LINES[i];
        if (!(element.includes("🟩") && element.includes("🟥"))) {
            parsed.push(element);
            continue;
        }
        const regexp = RegExp("(?<=🟩)(.*?)(?=🟥)", "g");
        const commands = regexp.exec(element)[0].split("_");
        const command = commands.shift();
        const rest = element.substring(regexp.lastIndex + 2, element.length);
        switch (command) {
            case "h1":
                parsed.push(`<h1>${rest}</h1>`);
                break;
            case "h2":
                parsed.push(`<h2>${rest}</h2>`);
                break;
            case "h3":
                parsed.push(`<h3>${rest}</h3>`);
                break;
            case "h4":
                parsed.push(`<h4>${rest}</h4>`);
                break;
            case "h5":
                parsed.push(`<h5>${rest}</h5>`);
                break;
            case "IMG":
                parsed.push(`<img src="./${commands.join("/")}" />`);
                break;
            case "CODE":
                parsed.push(`<c src="/embed/${commands.join("/")}.c"></c>`);
                break;
            default:
                console.error(`${command} ERROR`);
                break;
        }
    }
    parsed.push("</pre>");
    return parsed.join("\n");
}
