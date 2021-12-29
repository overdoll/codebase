/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 6be0469a447b5ccc4e9fe393299b575f */

import { ConcreteRequest } from "relay-runtime";
export type AccountLockReason = "POST_INFRACTION" | "%future added value";
export type UnlockAccountFormMutationVariables = {};
export type UnlockAccountFormMutationResponse = {
    readonly unlockAccount: {
        readonly account: {
            readonly id: string;
            readonly lock: {
                readonly expires: unknown;
                readonly reason: AccountLockReason;
            } | null;
            readonly isModerator: boolean;
            readonly isStaff: boolean;
        } | null;
    } | null;
};
export type UnlockAccountFormMutation = {
    readonly response: UnlockAccountFormMutationResponse;
    readonly variables: UnlockAccountFormMutationVariables;
};



/*
mutation UnlockAccountFormMutation {
  unlockAccount {
    account {
      id
      lock {
        expires
        reason
      }
      isModerator
      isStaff
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reason",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isModerator",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UnlockAccountFormMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UnlockAccountFormMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "6be0469a447b5ccc4e9fe393299b575f",
    "metadata": {},
    "name": "UnlockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '2b1e34faa7765c18d83d65740c329a09';
export default node;
