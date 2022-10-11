/**
 * @generated SignedSource<<d6997b8e651835b491c968fdee6b22df>>
 * @relayHash 3ca0d666d0a83c09d336a74dbd3edc28
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3ca0d666d0a83c09d336a74dbd3edc28

import { ConcreteRequest, Query } from 'relay-runtime';
export type MainMenuButtonFeedQuery$variables = {};
export type MainMenuButtonFeedQuery$data = {
  readonly viewer: {
    readonly clubMembershipsCount: number;
    readonly curationProfile: {
      readonly audience: {
        readonly completed: boolean;
      };
    };
  } | null;
};
export type MainMenuButtonFeedQuery = {
  response: MainMenuButtonFeedQuery$data;
  variables: MainMenuButtonFeedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clubMembershipsCount",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "AudienceCurationProfile",
  "kind": "LinkedField",
  "name": "audience",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completed",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainMenuButtonFeedQuery",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
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
    "name": "MainMenuButtonFeedQuery",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "3ca0d666d0a83c09d336a74dbd3edc28",
    "metadata": {},
    "name": "MainMenuButtonFeedQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4ad977f909e2426f3797202ead873c7d";

export default node;
