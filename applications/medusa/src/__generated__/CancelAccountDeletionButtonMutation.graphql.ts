/**
 * @generated SignedSource<<cada1b5c7074b6c94f19b3771b4fe04f>>
 * @relayHash c0d52519d8fefa19cc4e764af0ccccbd
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c0d52519d8fefa19cc4e764af0ccccbd

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CancelAccountDeletionInput = {
  accountID: string;
};
export type CancelAccountDeletionButtonMutation$variables = {
  input: CancelAccountDeletionInput;
};
export type CancelAccountDeletionButtonMutation$data = {
  readonly cancelAccountDeletion: {
    readonly account: {
      readonly deleting: {
        readonly scheduledDeletion: any;
      } | null;
      readonly id: string;
      readonly isDeleted: boolean;
    } | null;
  } | null;
};
export type CancelAccountDeletionButtonMutation = {
  response: CancelAccountDeletionButtonMutation$data;
  variables: CancelAccountDeletionButtonMutation$variables;
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
    "concreteType": "CancelAccountDeletionPayload",
    "kind": "LinkedField",
    "name": "cancelAccountDeletion",
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
    "name": "CancelAccountDeletionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CancelAccountDeletionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c0d52519d8fefa19cc4e764af0ccccbd",
    "metadata": {},
    "name": "CancelAccountDeletionButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "839413176b7ce473cd9bf769f16124a3";

export default node;
