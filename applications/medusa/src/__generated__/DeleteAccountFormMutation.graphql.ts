/**
 * @generated SignedSource<<fe9a3bc76b9927bb797d16adb70a97a6>>
 * @relayHash a4731ccb30824fd550281621068a0e11
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a4731ccb30824fd550281621068a0e11

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteAccountInput = {
  accountID: string;
};
export type DeleteAccountFormMutation$variables = {
  input: DeleteAccountInput;
};
export type DeleteAccountFormMutation$data = {
  readonly deleteAccount: {
    readonly account: {
      readonly deleting: {
        readonly scheduledDeletion: any;
      } | null;
      readonly id: string;
      readonly isDeleted: boolean;
    } | null;
  } | null;
};
export type DeleteAccountFormMutation = {
  response: DeleteAccountFormMutation$data;
  variables: DeleteAccountFormMutation$variables;
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
    "concreteType": "DeleteAccountPayload",
    "kind": "LinkedField",
    "name": "deleteAccount",
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
            "name": "isDeleted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountDeleting",
            "kind": "LinkedField",
            "name": "deleting",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledDeletion",
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
    "name": "DeleteAccountFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteAccountFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a4731ccb30824fd550281621068a0e11",
    "metadata": {},
    "name": "DeleteAccountFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "93eb3edde6e9eccb9eef23e30c8bf97d";

export default node;
