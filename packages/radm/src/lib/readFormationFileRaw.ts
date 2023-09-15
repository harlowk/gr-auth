import yaml from 'yaml';
import { Namespace, FormationFileRaw, ResourceStruct, StatementStruct } from "../types";

export const assertValidFormationFileRaw = (apif: FormationFileRaw): apif is FormationFileRaw => {

    const namespace = apif.namespace;
    const resources = apif.resources;
    const statements = apif.statements;

    // namespace is a string
    if (typeof namespace !== 'string') {
        throw new Error(`Namespace must be a string`);
    }

    // resources is an array
    if (!Array.isArray(resources)) {
        throw new Error(`Resources must be an array`);
    }

    // statements is an array
    if (!Array.isArray(statements)) {
        throw new Error(`Statements must be an array`);
    }

    // all resources have a name
    const allResourceHaveCorrectFormat = resources.every(r => r.split(':').length === 2);
    if (!allResourceHaveCorrectFormat) {
        throw new Error(`All resources must have a name`);
    }

    // all statements have a path
    const allStatementsHaveCorrectFormat = statements.every(s => s.split('::').length === 3);
    if (!allStatementsHaveCorrectFormat) {
        throw new Error(`All statements must have a path`);
    }

    // all resources have the same namespace
    const allResourcesHaveSameNamespace = resources.every(r => r.startsWith(`${namespace}:`));
    if (!allResourcesHaveSameNamespace) {
        throw new Error(`All resources must have the same namespace: ${namespace}`);
    }

    // all statements have the same namespace
    const allStatementsHaveSameNamespace = statements.every(s => s.startsWith(`${namespace}::`));
    if (!allStatementsHaveSameNamespace) {
        throw new Error(`All statements must have the same namespace: ${namespace}`);
    }

    // all statements end with a resource
    const allStatementsEndWithResource = statements.every(s => resources.some(r => s.endsWith(`::${r}`)));
    if (!allStatementsEndWithResource) {
        throw new Error(`All statements must end with a defined resource`);
    }

    return true;

}


export const readFormationFileRaw = (formationFileUtf8: string): FormationFileRaw => {
    const formation = yaml.parse(formationFileUtf8) as FormationFileRaw;
    assertValidFormationFileRaw(formation);
    return formation;
}

