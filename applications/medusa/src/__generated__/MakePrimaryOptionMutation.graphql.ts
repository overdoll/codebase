/**
 * @generated SignedSource<<314f85075dd664b680c445aae823f75f>>
 * @relayHash 06a6bef9081d887fba03239a6c25e315
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 06a6bef9081d887fba03239a6c25e315

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "UNCONFIRMED" | "PRIMARY" | "%future added value";
export type UpdateAccountEmailStatusToPrimaryInput = {
  accountEmailId: string;
};
export type MakePrimaryOptionMutation$variables = {
  input: UpdateAccountEmailStatusToPrimaryInput;
};
export type MakePrimaryOptionMutationVariables = MakePrimaryOptionMutation$variables;
export type MakePrimaryOptionMutation$data = {
  readonly updateAccountEmailStatusToPrimary: {
    readonly primaryAccountEmail: {
      readonly id: string;
      readonly email: string;
      readonly status: AccountEmailStatus;
    } | null;
    readonly updatedAccountEmail: {
      readonly id: string;
      readonly email: string;
      readonly status: AccountEmailStatus;
    } | null;
  } | null;
};
export type MakePrimaryOptionMutationResponse = MakePrimaryOptionMutation$data;
export type MakePrimaryOptionMutation = {
  variables: MakePrimaryOptionMutationVariables;
  response: MakePrimaryOptionMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateAccountEmailStatusToPrimaryPayload",
    "kind": "LinkedField",
    "name": "updateAccountEmailStatusToPrimary",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "primaryAccountEmail",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "updatedAccountEmail",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MakePrimaryOptionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MakePrimaryOptionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "06a6bef9081d887fba03239a6c25e315",
    "metadata": {},
    "name": "MakePrimaryOptionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "327834a60836a375a6732b56496bcd46";

export default node;
