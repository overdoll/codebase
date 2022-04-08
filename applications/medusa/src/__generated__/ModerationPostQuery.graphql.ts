/**
 * @generated SignedSource<<194babb89bffd04b125f1ef923de8cef>>
 * @relayHash 57a7b74d9ce240bc7c914e30ce591359
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 57a7b74d9ce240bc7c914e30ce591359

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
export type ModerationPostQuery$variables = {
  reference: string;
};
export type ModerationPostQueryVariables = ModerationPostQuery$variables;
export type ModerationPostQuery$data = {
  readonly post: {
    readonly __typename: string;
    readonly reference: string;
    readonly state: PostState;
    readonly contributor: {
      readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
    };
    readonly club: {
      readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment" | "ClubStaffButtonFragment" | "ClubPageButtonFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostPreviewFragment" | "PostTagsPreviewFragment" | "ModerationPostActionsFragment">;
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
  "name": "state",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    (v5/*: any*/),
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "videoThumbnail",
    "plural": false,
    "selections": [
      (v5/*: any*/)
    ],
    "storageKey": null
  },
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
  (v8/*: any*/)
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
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Account",
              "kind": "LinkedField",
              "name": "contributor",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LargeAccountHeaderFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ProfilePageButtonFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ProfileStaffButtonFragment"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Club",
              "kind": "LinkedField",
              "name": "club",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LargeClubHeaderFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubStaffButtonFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubPageButtonFragment"
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostPreviewFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostTagsPreviewFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ModerationPostActionsFragment"
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
          (v4/*: any*/),
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
                "selections": (v9/*: any*/),
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Club",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v9/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PostContent",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "resource",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v6/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "viewerCanViewSupporterOnlyContent",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isSupporterOnly",
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": (v11/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "characters",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": (v11/*: any*/),
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "categories",
            "plural": true,
            "selections": (v11/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "57a7b74d9ce240bc7c914e30ce591359",
    "metadata": {},
    "name": "ModerationPostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "397d5133f183cbf9dd7091ad2f3c9bf1";

export default node;
