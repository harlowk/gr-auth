import fs from 'fs';
import { FormationFile } from './FormationFile';


const main = () => {
    // read ex.apif.yaml
    const file = fs.readFileSync(`${__dirname}/ex.apif.yaml`, 'utf8');
    const apif = new FormationFile(file);

    apif.print();
}

main();