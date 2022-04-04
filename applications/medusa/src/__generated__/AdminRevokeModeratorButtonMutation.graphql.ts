/**
 * @generated SignedSource<<90ff7297212fdd40fda565ec99804c33>>
 * @relayHash ba609ba69eb2ccfcde1394c38a8d5a09
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ba609ba69eb2ccfcde1394c38a8d5a09

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAccountModeratorRole = {
  accountId: string;
};
export type StaffRevokeModeratorButtonMutation$variables = {
  input: RevokeAccountModeratorRole;
};
export type StaffRevokeModeratorButtonMutationVariables = StaffRevokeModeratorButtonMutation$variables;
export type StaffRevokeModeratorButtonMutation$data = {
  readonly revokeAccountModeratorRole: {
    readonly account: {
      readonly id: string;
      readonly isModerator: boolean;
    } | null;
  } | null;
};
export type StaffRevokeModeratorButtonMutationResponse = StaffRevokeModeratorButtonMutation$data;
export type StaffRevokeModeratorButtonMutation = {
  variables: StaffRevokeModeratorButtonMutationVariables;
  response: StaffRevokeModeratorButtonMutation$data;
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
    "concreteType": "RevokeAccountModeratorRolePayload",
    "kind": "LinkedField",
    "name": "revokeAccountModeratorRole",
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
    "name": "StaffRevokeModeratorButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffRevokeModeratorButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "ba609ba69eb2ccfcde1394c38a8d5a09",
    "metadata": {},
    "name": "StaffRevokeModeratorButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "91b80e0f2ec8ef9977ce90b21f5af9da";

export default node;
