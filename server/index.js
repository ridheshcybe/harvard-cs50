const fs = require("fs");
const path = require("path");
const express = require("express");

const port = 3000;
const app = express()

app.set('view engine', 'ejs');

function fetch(dirtoread) {
    const normal = fs.readdirSync(dirtoread).filter(e => e !== '.DS_Store')
    const normalresolved = normal.map(e => path.resolve(dirtoread, e));
    return [normal, normalresolved]
}

function fetchfiles(cb) {
    const data = {};
    const dirtoread = path.resolve(__dirname, '../introduction/lectures');
    const [weeks, weeksresolved] = fetch(dirtoread)
    for (let a = 0; a < weeksresolved.length; a++) {
        const e = weeksresolved[a];
        let note = '';
        const notes = path.join(e, 'notes');
        const [notesfiles, notesfilesresolved] = fetch(notes);
        for (let b = 0; b < notesfiles.length; b++) {
            const element = notesfilesresolved[b];
            note += '<br>\n' + fs.readFileSync(element)
        }
        data[weeks[a]] = { imports: {}, notes: note };

        const imports = path.join(e, 'imports');
        if (fs.existsSync(imports)) {
            const [importfiles, importfilesresolved] = fetch(imports);
            for (let c = 0; c < importfilesresolved.length; c++) {
                const f = importfilesresolved[c];
                const read = fs.readFileSync(f);
                data[weeks[a]].imports[importfiles[c]] = read;
            }
        }
    }
    cb(data)
}

function runserver(data) {
    app.get('/', (req, res) => {
        res.render('index', { options: Object.keys(data) });
    });

    app.get('/:lectureno', (req, res) => {
        const no = req.params.lectureno;
        if (!data[no]) return res.status(404).render('error')
        res.render('file', { options: data[no], name: no });
    })

    app.get('/:lectureno/:file', (req, res) => {
        const no = req.params.lectureno;
        const file = req.params.file;
        const n = data[no]
        if (!n) return res.status(404).render('error');
        if (!n.imports[file]) return res.status(404).render('error');

        const [fileName, fileExtension] = file.split('.');
        res.contentType(`.${fileExtension}`);
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.${fileExtension}`);
        res.send(n.imports[file]);
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

function run() {
    fetchfiles(runserver);
}

run();