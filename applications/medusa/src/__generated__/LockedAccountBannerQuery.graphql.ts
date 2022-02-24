/**
 * @generated SignedSource<<9bf9d426f24b1c5826311cb852b1a88f>>
 * @relayHash b106dbb972f51f8cb08ca95e859296f7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b106dbb972f51f8cb08ca95e859296f7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LockedAccountBannerQuery$variables = {};
export type LockedAccountBannerQueryVariables = LockedAccountBannerQuery$variables;
export type LockedAccountBannerQuery$data = {
  readonly viewer: {
    readonly lock: {
      readonly __typename: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"LockedAccountModalFragment">;
  } | null;
};
export type LockedAccountBannerQueryResponse = LockedAccountBannerQuery$data;
export type LockedAccountBannerQuery = {
  variables: LockedAccountBannerQueryVariables;
  response: LockedAccountBannerQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LockedAccountBannerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LockedAccountModalFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LockedAccountBannerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b106dbb972f51f8cb08ca95e859296f7",
    "metadata": {},
    "name": "LockedAccountBannerQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "8ff5895a537e5949096214cf9355b0dc";

export default node;
