/**
 * @generated SignedSource<<4b9dfc54f2edbff2af2ef9111bd3b6c2>>
 * @relayHash ae09ad848f04439a37da94e88c6e732d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ae09ad848f04439a37da94e88c6e732d

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteAccountSettingsQuery$variables = {};
export type DeleteAccountSettingsQuery$data = {
  readonly viewer: {
    readonly deleting: {
      readonly scheduledDeletion: any;
    } | null;
    readonly hasActiveOrCancelledAccountClubSupporterSubscriptions: boolean;
    readonly hasNonTerminatedClubs: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"CancelAccountDeletionButtonFragment" | "DeleteAccountFormFragment">;
  };
};
export type DeleteAccountSettingsQuery = {
  response: DeleteAccountSettingsQuery$data;
  variables: DeleteAccountSettingsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasActiveOrCancelledAccountClubSupporterSubscriptions",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNonTerminatedClubs",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteAccountSettingsQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "viewer",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DeleteAccountFormFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CancelAccountDeletionButtonFragment"
            }
          ],
          "storageKey": null
        },
        "action": "THROW",
        "path": "viewer"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DeleteAccountSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
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
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ae09ad848f04439a37da94e88c6e732d",
    "metadata": {},
    "name": "DeleteAccountSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "0cfb980f7f9fdc7cf70df0d4b5a8df47";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
