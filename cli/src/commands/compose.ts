import fs from "fs"
const conf = new (require('conf'))();

const compose = () => {
    // read all .resource.json files in the project
    const files = fs.readdirSync(process.cwd()).filter(file => file.endsWith('.resources.json'));



}