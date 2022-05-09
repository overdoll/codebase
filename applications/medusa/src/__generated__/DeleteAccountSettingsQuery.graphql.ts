/**
 * @generated SignedSource<<f9cf70e007eb0358127d56e1e92d11e1>>
 * @relayHash a393e49e1bb15c41e1510388e1148699
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a393e49e1bb15c41e1510388e1148699

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteAccountSettingsQuery$variables = {};
export type DeleteAccountSettingsQueryVariables = DeleteAccountSettingsQuery$variables;
export type DeleteAccountSettingsQuery$data = {
  readonly viewer: {
    readonly isDeleted: boolean;
    readonly deleting: {
      readonly scheduledDeletion: any;
    } | null;
    readonly hasActiveOrCancelledAccountClubSupporterSubscriptions: boolean;
    readonly hasNonTerminatedClubs: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"DeleteAccountFormFragment">;
  };
};
export type DeleteAccountSettingsQueryResponse = DeleteAccountSettingsQuery$data;
export type DeleteAccountSettingsQuery = {
  variables: DeleteAccountSettingsQueryVariables;
  response: DeleteAccountSettingsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v1 = {
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasActiveOrCancelledAccountClubSupporterSubscriptions",
  "storageKey": null
},
v3 = {
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
            (v3/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DeleteAccountFormFragment"
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
          (v3/*: any*/),
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
    "id": "a393e49e1bb15c41e1510388e1148699",
    "metadata": {},
    "name": "DeleteAccountSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "b0328f260fdfd14b7bac1737dd824cda";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
