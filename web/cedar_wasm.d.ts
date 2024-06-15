/* tslint:disable */
/* eslint-disable */
/**
* @param {string} json_str
* @returns {JsonToPolicyResult}
*/
export function policyTextFromJson(json_str: string): JsonToPolicyResult;
/**
* @param {string} cedar_str
* @returns {PolicyToJsonResult}
*/
export function policyTextToJson(cedar_str: string): PolicyToJsonResult;
/**
* @param {string} input_policies_str
* @returns {CheckParsePolicySetResult}
*/
export function checkParsePolicySet(input_policies_str: string): CheckParsePolicySetResult;
/**
* @param {string} template_str
* @returns {CheckParseTemplateResult}
*/
export function checkParseTemplate(template_str: string): CheckParseTemplateResult;
/**
* @param {string} policies_str
* @param {number} line_width
* @param {number} indent_width
* @returns {FormattingResult}
*/
export function formatPolicies(policies_str: string, line_width: number, indent_width: number): FormattingResult;
/**
* @param {string} input_schema
* @returns {CheckParseResult}
*/
export function checkParseSchema(input_schema: string): CheckParseResult;
/**
* @param {string} entities_str
* @param {string} schema_str
* @returns {CheckParseResult}
*/
export function checkParseEntities(entities_str: string, schema_str: string): CheckParseResult;
/**
* @param {string} context_str
* @param {string} action_str
* @param {string} schema_str
* @returns {CheckParseResult}
*/
export function checkParseContext(context_str: string, action_str: string, schema_str: string): CheckParseResult;
/**
* @param {AuthorizationCall} call
* @returns {AuthorizationAnswer}
*/
export function isAuthorized(call: AuthorizationCall): AuthorizationAnswer;
/**
* @param {ValidationCall} call
* @returns {ValidationAnswer}
*/
export function validate(call: ValidationCall): ValidationAnswer;
/**
* @returns {string}
*/
export function getCedarVersion(): string;
export type JsonToPolicyResult = { type: "success"; policyText: string } | { type: "error"; errors: string[] };

export type PolicyToJsonResult = { type: "success"; policy: Policy } | { type: "error"; errors: string[] };

export type CheckParsePolicySetResult = { type: "success"; policies: number; templates: number } | { type: "error"; errors: string[] };

export type CheckParseTemplateResult = { type: "success"; slots: string[] } | { type: "error"; errors: string[] };

export type FormattingResult = { type: "success"; formatted_policy: string } | { type: "error"; errors: string[] };

export type CheckParseResult = { type: "success" } | { type: "error"; errors: string[] };

export type ValidationAnswer = { type: "failure"; errors: DetailedError[]; warnings: DetailedError[] } | { type: "success"; validationErrors: ValidationError[]; validationWarnings: ValidationError[]; otherWarnings: DetailedError[] };

export interface ValidationError {
    policyId: SmolStr;
    error: DetailedError;
}

export type ValidationEnabled = "on" | "off";

export interface ValidationSettings {
    enabled: ValidationEnabled;
}

export interface ValidationCall {
    validationSettings?: ValidationSettings;
    schema: Schema;
    policySet: PolicySet;
}

export interface RecvdSlice {
    policies: PolicySet;
    entities: Array<EntityJson>;
    templates?: Record<string, string> | null;
    templateInstantiations: TemplateLink[] | null;
}

export type Links = Link[];

export interface TemplateLink {
    templateId: string;
    resultPolicyId: string;
    instantiations: Links;
}

export interface Link {
    slot: string;
    value: EntityUIDStrings;
}

export interface EntityUIDStrings {
    ty: string;
    eid: string;
}

export interface AuthorizationCall {
    principal: {type: string, id: string};
    action: {type: string, id: string};
    resource: {type: string, id: string};
    context: Record<string, CedarValueJson>;
    schema?: Schema;
    enableRequestValidation?: boolean;
    slice: RecvdSlice;
}

export type AuthorizationAnswer = { type: "failure"; errors: DetailedError[]; warnings: DetailedError[] } | { type: "success"; response: Response; warnings: DetailedError[] };

export interface AuthorizationError {
    policyId: SmolStr;
    error: DetailedError;
}

export interface Diagnostics {
    reason: Set<String>;
    errors: AuthorizationError[];
}

export interface Response {
    decision: Decision;
    diagnostics: Diagnostics;
}

export type Schema = { human: string } | { json: SchemaJson };

export type PolicySet = string | Record<string, string>;

export interface SourceLocation {
    start: number;
    end: number;
}

export interface SourceLabel extends SourceLocation {
    label: string | null;
}

export type Severity = "advice" | "warning" | "error";

export interface DetailedError {
    message: string;
    help: string | null;
    code: string | null;
    url: string | null;
    severity: Severity | null;
    sourceLocations?: SourceLabel[];
    related?: DetailedError[];
}

export type SchemaTypeVariant = { type: "String" } | { type: "Long" } | { type: "Boolean" } | { type: "Set"; element: SchemaType } | { type: "Record"; attributes: Record<SmolStr, TypeOfAttribute>; additionalAttributes: boolean } | { type: "Entity"; name: Name } | { type: "Extension"; name: Id };

export type SchemaType = SchemaTypeVariant | { type: Name };

export interface ActionEntityUID {
    id: SmolStr;
    type?: Name;
}

export interface ApplySpec {
    resourceTypes?: Name[];
    principalTypes?: Name[];
    context?: AttributesOrContext;
}

export interface ActionType {
    attributes?: Record<SmolStr, CedarValueJson>;
    appliesTo?: ApplySpec;
    memberOf?: ActionEntityUID[];
}

export type AttributesOrContext = SchemaType;

export interface EntityType {
    memberOfTypes?: Name[];
    shape?: AttributesOrContext;
}

export interface NamespaceDefinition {
    commonTypes?: Record<Id, SchemaType>;
    entityTypes: Record<Id, EntityType>;
    actions: Record<SmolStr, ActionType>;
}

export type SchemaJson = Record<string, NamespaceDefinition>;

export type ActionInConstraint = { entity: EntityUidJson } | { entities: EntityUidJson[] };

export interface PrincipalOrResourceIsConstraint {
    entity_type: string;
    in?: PrincipalOrResourceInConstraint;
}

export type PrincipalOrResourceInConstraint = { entity: EntityUidJson } | { slot: string };

export type EqConstraint = { entity: EntityUidJson } | { slot: string };

export type ResourceConstraint = { op: "All" } | ({ op: "==" } & EqConstraint) | ({ op: "in" } & PrincipalOrResourceInConstraint) | ({ op: "is" } & PrincipalOrResourceIsConstraint);

export type ActionConstraint = { op: "All" } | ({ op: "==" } & EqConstraint) | ({ op: "in" } & ActionInConstraint);

export type PrincipalConstraint = { op: "All" } | ({ op: "==" } & EqConstraint) | ({ op: "in" } & PrincipalOrResourceInConstraint) | ({ op: "is" } & PrincipalOrResourceIsConstraint);

export interface EntityJson {
    uid: EntityUidJson;
    attrs: Record<string, CedarValueJson>;
    parents: EntityUidJson[];
}

export type Clause = { kind: "when"; body: Expr } | { kind: "unless"; body: Expr };

export interface Policy {
    effect: Effect;
    principal: PrincipalConstraint;
    action: ActionConstraint;
    resource: ResourceConstraint;
    conditions: Clause[];
    annotations?: Record<string, string>;
}

export type Effect = "permit" | "forbid";

export type EntityUidJson = { __expr: string } | { __entity: TypeAndId } | TypeAndId;

export interface FnAndArg {
    fn: string;
    arg: CedarValueJson;
}

export interface TypeAndId {
    type: string;
    id: string;
}

export type CedarValueJson = { __expr: string } | { __entity: TypeAndId } | { __extn: FnAndArg } | boolean | number | string | CedarValueJson[] | { [key: string]: CedarValueJson } | null;

export type Decision = "Allow" | "Deny";

export type ExtFuncCall = {} & Record<string, Array<Expr>>;

export type ExprNoExt = { Value: CedarValueJson } | { Var: Var } | { Slot: string } | { Unknown: { name: string } } | { "!": { arg: Expr } } | { neg: { arg: Expr } } | { "==": { left: Expr; right: Expr } } | { "!=": { left: Expr; right: Expr } } | { in: { left: Expr; right: Expr } } | { "<": { left: Expr; right: Expr } } | { "<=": { left: Expr; right: Expr } } | { ">": { left: Expr; right: Expr } } | { ">=": { left: Expr; right: Expr } } | { "&&": { left: Expr; right: Expr } } | { "||": { left: Expr; right: Expr } } | { "+": { left: Expr; right: Expr } } | { "-": { left: Expr; right: Expr } } | { "*": { left: Expr; right: Expr } } | { contains: { left: Expr; right: Expr } } | { containsAll: { left: Expr; right: Expr } } | { containsAny: { left: Expr; right: Expr } } | { ".": { left: Expr; attr: SmolStr } } | { has: { left: Expr; attr: SmolStr } } | { like: { left: Expr; pattern: SmolStr } } | { is: { left: Expr; entity_type: SmolStr; in?: Expr } } | { "if-then-else": { if: Expr; then: Expr; else: Expr } } | { Set: Expr[] } | { Record: Record<string, Expr> };

export type Expr = ExprNoExt | ExtFuncCall;

export type Var = "principal" | "action" | "resource" | "context";


export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly policyTextFromJson: (a: number, b: number) => number;
  readonly policyTextToJson: (a: number, b: number) => number;
  readonly checkParsePolicySet: (a: number, b: number) => number;
  readonly checkParseTemplate: (a: number, b: number) => number;
  readonly formatPolicies: (a: number, b: number, c: number, d: number) => number;
  readonly checkParseSchema: (a: number, b: number) => number;
  readonly checkParseEntities: (a: number, b: number, c: number, d: number) => number;
  readonly checkParseContext: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly isAuthorized: (a: number) => number;
  readonly validate: (a: number) => number;
  readonly getCedarVersion: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
type SmolStr = string;
type Name = string;
type Id = string;
export type TypeOfAttribute = SchemaType & { required?: boolean };
export type Context = Record<string, CedarValueJson>;
