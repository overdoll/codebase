/**
 * @generated SignedSource<<99ed5992c18226d28f3e168fe1ff0e12>>
 * @relayHash 143fca0b864e232366970873ee14a9ad
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 143fca0b864e232366970873ee14a9ad

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModerationPostQuery$variables = {
  reference: string;
};
export type ModerationPostQueryVariables = ModerationPostQuery$variables;
export type ModerationPostQuery$data = {
  readonly post: {
    readonly __typename: string;
    readonly reference: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment" | "PostHeaderContributorFragment">;
  };
};
export type ModerationPostQueryResponse = ModerationPostQuery$data;
export type ModerationPostQuery = {
  variables: ModerationPostQueryVariables;
  response: ModerationPostQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "urls",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mimeType",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ModerationPostQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "post",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostHeaderClubFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostHeaderContributorFragment"
            }
          ],
          "storageKey": null
        },
        "action": "THROW",
        "path": "post"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModerationPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Club",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "contributor",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "143fca0b864e232366970873ee14a9ad",
    "metadata": {},
    "name": "ModerationPostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fa1af3b0e89d8a3a24603fb9af05bcb2";

export default node;
