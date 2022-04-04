/**
 * @generated SignedSource<<012cd16e48655c0316bca10917d2066f>>
 * @relayHash 03d1d7fe329888905f7063d96d6af97e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 03d1d7fe329888905f7063d96d6af97e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAccountStaffRole = {
  accountId: string;
};
export type StaffRevokeStaffButtonMutation$variables = {
  input: RevokeAccountStaffRole;
};
export type StaffRevokeStaffButtonMutationVariables = StaffRevokeStaffButtonMutation$variables;
export type StaffRevokeStaffButtonMutation$data = {
  readonly revokeAccountStaffRole: {
    readonly account: {
      readonly id: string;
      readonly isStaff: boolean;
    } | null;
  } | null;
};
export type StaffRevokeStaffButtonMutationResponse = StaffRevokeStaffButtonMutation$data;
export type StaffRevokeStaffButtonMutation = {
  variables: StaffRevokeStaffButtonMutationVariables;
  response: StaffRevokeStaffButtonMutation$data;
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
    "concreteType": "RevokeAccountStaffRolePayload",
    "kind": "LinkedField",
    "name": "revokeAccountStaffRole",
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
    "name": "StaffRevokeStaffButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffRevokeStaffButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "03d1d7fe329888905f7063d96d6af97e",
    "metadata": {},
    "name": "StaffRevokeStaffButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c16bc4e9dd35034723915a6b6f989a96";

export default node;
