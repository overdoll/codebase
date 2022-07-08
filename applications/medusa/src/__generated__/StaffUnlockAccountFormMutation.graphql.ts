/**
 * @generated SignedSource<<63a5b1d7edc6dc6e249aad8b18cbbbbb>>
 * @relayHash e0c974d97985c686e636a3f8bd6a56e5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e0c974d97985c686e636a3f8bd6a56e5

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnlockAccountInput = {
  accountID: string;
};
export type StaffUnlockAccountFormMutation$variables = {
  input: UnlockAccountInput;
};
export type StaffUnlockAccountFormMutation$data = {
  readonly unlockAccount: {
    readonly account: {
      readonly id: string;
      readonly lock: {
        readonly expires: any;
      } | null;
    } | null;
  } | null;
};
export type StaffUnlockAccountFormMutation = {
  response: StaffUnlockAccountFormMutation$data;
  variables: StaffUnlockAccountFormMutation$variables;
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
    "concreteType": "UnlockAccountPayload",
    "kind": "LinkedField",
    "name": "unlockAccount",
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
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
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
    "name": "StaffUnlockAccountFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffUnlockAccountFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "e0c974d97985c686e636a3f8bd6a56e5",
    "metadata": {},
    "name": "StaffUnlockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "26391dbb4d824ac9390c2d980e109818";

export default node;
