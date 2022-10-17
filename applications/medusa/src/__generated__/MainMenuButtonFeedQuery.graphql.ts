/**
 * @generated SignedSource<<e07f38a7aacb093a57370cc9d7c6b4cc>>
 * @relayHash d262cfc378c76a97881da217374cd438
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d262cfc378c76a97881da217374cd438

import { ConcreteRequest, Query } from 'relay-runtime';
export type MainMenuButtonFeedQuery$variables = {};
export type MainMenuButtonFeedQuery$data = {
  readonly viewer: {
    readonly clubMembershipsCount: number;
    readonly curatedPostsFeedData: {
      readonly generatedAt: any | null;
      readonly nextRegenerationTime: any | null;
      readonly viewedAt: any | null;
    };
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
  "concreteType": "CuratedPostsFeedData",
  "kind": "LinkedField",
  "name": "curatedPostsFeedData",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextRegenerationTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "generatedAt",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
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
          },
          (v2/*: any*/)
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "d262cfc378c76a97881da217374cd438",
    "metadata": {},
    "name": "MainMenuButtonFeedQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "d86c0c5a8af9d5aeba1e9d88c5d4c220";

export default node;
