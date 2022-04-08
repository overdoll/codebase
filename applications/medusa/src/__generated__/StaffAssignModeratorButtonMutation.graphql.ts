/**
 * @generated SignedSource<<3ad0682e9190b3931b4d1124dc4661ba>>
 * @relayHash 5e4909112d401af1c4567842a0637254
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5e4909112d401af1c4567842a0637254

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AssignAccountModeratorRole = {
  accountId: string;
};
export type StaffAssignModeratorButtonMutation$variables = {
  input: AssignAccountModeratorRole;
};
export type StaffAssignModeratorButtonMutationVariables = StaffAssignModeratorButtonMutation$variables;
export type StaffAssignModeratorButtonMutation$data = {
  readonly assignAccountModeratorRole: {
    readonly account: {
      readonly id: string;
      readonly isModerator: boolean;
    } | null;
  } | null;
};
export type StaffAssignModeratorButtonMutationResponse = StaffAssignModeratorButtonMutation$data;
export type StaffAssignModeratorButtonMutation = {
  variables: StaffAssignModeratorButtonMutationVariables;
  response: StaffAssignModeratorButtonMutation$data;
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
    "concreteType": "AssignAccountModeratorRolePayload",
    "kind": "LinkedField",
    "name": "assignAccountModeratorRole",
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
            "name": "isModerator",
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
    "name": "StaffAssignModeratorButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffAssignModeratorButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "5e4909112d401af1c4567842a0637254",
    "metadata": {},
    "name": "StaffAssignModeratorButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "923c2ccd25098eab9b3d4b80fc03aa1a";

export default node;
