/**
 * @generated SignedSource<<b3fd14babae7b044ab792a7efeff9f9b>>
 * @relayHash 9f011425d5ff494fadf6e1bd56b23790
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9f011425d5ff494fadf6e1bd56b23790

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AssignAccountStaffRole = {
  accountId: string;
};
export type StaffAssignStaffButtonMutation$variables = {
  input: AssignAccountStaffRole;
};
export type StaffAssignStaffButtonMutationVariables = StaffAssignStaffButtonMutation$variables;
export type StaffAssignStaffButtonMutation$data = {
  readonly assignAccountStaffRole: {
    readonly account: {
      readonly id: string;
      readonly isStaff: boolean;
    } | null;
  } | null;
};
export type StaffAssignStaffButtonMutationResponse = StaffAssignStaffButtonMutation$data;
export type StaffAssignStaffButtonMutation = {
  variables: StaffAssignStaffButtonMutationVariables;
  response: StaffAssignStaffButtonMutation$data;
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
    "name": "StaffAssignStaffButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffAssignStaffButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "9f011425d5ff494fadf6e1bd56b23790",
    "metadata": {},
    "name": "StaffAssignStaffButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "dbe37adb988ca4cd65b46e1a72c64405";

export default node;
