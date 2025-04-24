let db = {}

function loadTable(name) {console.log(name)
    if (!localStorage.hasOwnProperty(name))
        fetch(`./data/${name}.data.json`)
            .then(x=>x.text())
            .then(x=>{
                localStorage.setItem(name, x)
                db[name] = JSON.parse(x)
            })
    else db[name] = JSON.parse(localStorage.getItem(name))
}

if (!db.sources) loadTable('sources')
if (!db.words) loadTable('words')

function search(table, predicate) {
    console.log(db[table].filter(predicate))
}

console.log(search('sources', x=>x.key == 'C'))
