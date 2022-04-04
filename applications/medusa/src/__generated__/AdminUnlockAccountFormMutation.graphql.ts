/**
 * @generated SignedSource<<05a991ff2df5b22b22328bb7a5e071e2>>
 * @relayHash b3892024ef1c87d52f35d6df5ca3bca9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b3892024ef1c87d52f35d6df5ca3bca9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnlockAccountInput = {
  accountID: string;
};
export type StaffUnlockAccountFormMutation$variables = {
  input: UnlockAccountInput;
};
export type StaffUnlockAccountFormMutationVariables = StaffUnlockAccountFormMutation$variables;
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
export type StaffUnlockAccountFormMutationResponse = StaffUnlockAccountFormMutation$data;
export type StaffUnlockAccountFormMutation = {
  variables: StaffUnlockAccountFormMutationVariables;
  response: StaffUnlockAccountFormMutation$data;
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
    "id": "b3892024ef1c87d52f35d6df5ca3bca9",
    "metadata": {},
    "name": "StaffUnlockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "7cf1cb69c1e8a8a82da48bb918b28465";

export default node;
