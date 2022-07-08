/**
 * @generated SignedSource<<84b0a53ee9a4eeaae082e04875fb3f8e>>
 * @relayHash 93388e99f09efae4f0702c8708e40a1c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 93388e99f09efae4f0702c8708e40a1c

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAccountModeratorRole = {
  accountId: string;
};
export type StaffRevokeModeratorButtonMutation$variables = {
  input: RevokeAccountModeratorRole;
};
export type StaffRevokeModeratorButtonMutation$data = {
  readonly revokeAccountModeratorRole: {
    readonly account: {
      readonly id: string;
      readonly isModerator: boolean;
    } | null;
  } | null;
};
export type StaffRevokeModeratorButtonMutation = {
  response: StaffRevokeModeratorButtonMutation$data;
  variables: StaffRevokeModeratorButtonMutation$variables;
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
    "id": "93388e99f09efae4f0702c8708e40a1c",
    "metadata": {},
    "name": "StaffRevokeModeratorButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "412ec4776bbd63eb5915b025a0ffeafe";

export default node;
