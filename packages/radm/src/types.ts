
// Common
export type Namespace = string;
export type ResourceName = string;
export type RelativePath = string;

// Resource
export type ResourceString = `${Namespace}::${ResourceName}`;
export type ResourceStruct = {
    namespace: Namespace;
    name: ResourceName;
}

// Statement
export type StatementString = `${Namespace}::${RelativePath}::${ResourceString}`;
export type StatementStruct = {
    namespace: Namespace;
    path: RelativePath;
    resource: ResourceName;
}

// Api Formation (APIF)
export type FormationFileRaw = {
    readonly namespace: Namespace;
    readonly resources: ResourceString[];
    readonly statements: StatementString[];
}

