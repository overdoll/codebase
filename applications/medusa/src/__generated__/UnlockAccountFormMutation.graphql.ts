/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 2d5dc090d760ead7dda27050c889181d */

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
    "id": "2d5dc090d760ead7dda27050c889181d",
    "metadata": {},
    "name": "UnlockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '59101473432e48ad1039578aecf58083';
export default node;
