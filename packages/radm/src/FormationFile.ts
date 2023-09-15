import { readFormationFileRaw } from "./lib/readFormationFileRaw";
import { FormationFileRaw, Namespace, ResourceStruct, StatementStruct } from "./types";

export class FormationFile {

    readonly raw: FormationFileRaw[] = [];
    readonly namespace: Namespace;
    readonly resources: ResourceStruct[];
    readonly statements: StatementStruct[];

    constructor(formationFileUtf8: string) {
        const form = readFormationFileRaw(formationFileUtf8);
        this.raw = this.raw.concat(form);
        this.namespace = form.namespace;
        this.resources = form.resources.map(r => {
            const [namespace, name] = r.split(':');
            return { namespace, name };
        });
        this.statements = form.statements.map(s => {
            const [namespace, path, resource] = s.split('::');
            return { namespace, path, resource };
        });
    }

    print() {
        console.log(this.raw);
        console.log(this.namespace);
        console.log(this.resources);
        console.log(this.statements);
    }

    append(formationFileUtf8: string) {
        const form = new FormationFile(formationFileUtf8);
        this.raw.push(...form.raw);
        this.resources.push(...form.resources);
        this.statements.push(...form.statements);
    }
}