/**
 * @generated SignedSource<<4b198c588058777fef2afc107d1c2196>>
 * @relayHash a79f1c0558459bc05fce835276d72821
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a79f1c0558459bc05fce835276d72821

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnlockAccountInput = {
  accountID: string;
};
export type UnlockAccountFormMutation$variables = {
  input: UnlockAccountInput;
};
export type UnlockAccountFormMutation$data = {
  readonly unlockAccount: {
    readonly account: {
      readonly id: string;
      readonly isModerator: boolean;
      readonly isStaff: boolean;
      readonly lock: {
        readonly expires: any;
      } | null;
    } | null;
  } | null;
};
export type UnlockAccountFormMutation = {
  response: UnlockAccountFormMutation$data;
  variables: UnlockAccountFormMutation$variables;
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnlockAccountFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnlockAccountFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a79f1c0558459bc05fce835276d72821",
    "metadata": {},
    "name": "UnlockAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "35681dad4ffdc25551e0acf9ec09503a";

export default node;
