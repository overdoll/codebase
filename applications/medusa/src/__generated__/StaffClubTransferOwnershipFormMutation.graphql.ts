/**
 * @generated SignedSource<<a785db0e9f4895fada9d623a5794ef8b>>
 * @relayHash b1f83d2cdd9632fa23b2ae04742ce737
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b1f83d2cdd9632fa23b2ae04742ce737

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TransferClubOwnershipInput = {
  accountId: string;
  clubId: string;
};
export type StaffClubTransferOwnershipFormMutation$variables = {
  input: TransferClubOwnershipInput;
};
export type StaffClubTransferOwnershipFormMutation$data = {
  readonly transferClubOwnership: {
    readonly club: {
      readonly id: string;
      readonly owner: {
        readonly id: string;
      };
    } | null;
  } | null;
};
export type StaffClubTransferOwnershipFormMutation = {
  response: StaffClubTransferOwnershipFormMutation$data;
  variables: StaffClubTransferOwnershipFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
    "concreteType": "TransferClubOwnershipPayload",
    "kind": "LinkedField",
    "name": "transferClubOwnership",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
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
    "name": "StaffClubTransferOwnershipFormMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffClubTransferOwnershipFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "b1f83d2cdd9632fa23b2ae04742ce737",
    "metadata": {},
    "name": "StaffClubTransferOwnershipFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "688023df01ea7ee59585c794a5ef1daf";

export default node;
