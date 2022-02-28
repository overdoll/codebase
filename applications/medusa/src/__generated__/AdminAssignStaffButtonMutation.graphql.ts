/**
 * @generated SignedSource<<675d7df75ef0bbf346d71370c07f9d43>>
 * @relayHash dd2475eb84ff662c1f332b12b742794b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID dd2475eb84ff662c1f332b12b742794b

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AssignAccountStaffRole = {
  accountId: string;
};
export type AdminAssignStaffButtonMutation$variables = {
  input: AssignAccountStaffRole;
};
export type AdminAssignStaffButtonMutationVariables = AdminAssignStaffButtonMutation$variables;
export type AdminAssignStaffButtonMutation$data = {
  readonly assignAccountStaffRole: {
    readonly account: {
      readonly id: string;
      readonly isStaff: boolean;
    } | null;
  } | null;
};
export type AdminAssignStaffButtonMutationResponse = AdminAssignStaffButtonMutation$data;
export type AdminAssignStaffButtonMutation = {
  variables: AdminAssignStaffButtonMutationVariables;
  response: AdminAssignStaffButtonMutation$data;
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
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AssignAccountStaffRolePayload",
    "kind": "LinkedField",
    "name": "assignAccountStaffRole",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
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
            "name": "isStaff",
            "storageKey": null
          }
        ],
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
    "name": "AdminAssignStaffButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminAssignStaffButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "dd2475eb84ff662c1f332b12b742794b",
    "metadata": {},
    "name": "AdminAssignStaffButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0f4e18e426aa9a55cbf6ed77051a13ae";

export default node;
