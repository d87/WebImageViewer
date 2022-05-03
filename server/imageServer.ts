import * as fs from "fs";

const entries = fs.readdirSync('./',  { withFileTypes: true })
const files = entries.filter(ent => ent.isFile())
const files2 = files.map(ent => ent.name)

console.log(files2)