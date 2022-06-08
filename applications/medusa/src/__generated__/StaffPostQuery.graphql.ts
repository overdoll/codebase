/**
 * @generated SignedSource<<cae6de6bb3723b79c2e7da2042a4c13c>>
 * @relayHash 4aa6fc0d08d6b842d68ab43dee6ce67a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4aa6fc0d08d6b842d68ab43dee6ce67a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
export type StaffPostQuery$variables = {
  reference: string;
};
export type StaffPostQueryVariables = StaffPostQuery$variables;
export type StaffPostQuery$data = {
  readonly post: {
    readonly __typename: string;
    readonly reference: string;
    readonly state: PostState;
    readonly contributor: {
      readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
    };
    readonly club: {
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment" | "ClubStaffButtonFragment" | "ClubPageButtonFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostPreviewFragment" | "PostTagsPreviewFragment" | "ModerationPostActionsFragment">;
  };
};
export type StaffPostQueryResponse = StaffPostQuery$data;
export type StaffPostQuery = {
  variables: StaffPostQueryVariables;
  response: StaffPostQuery$data;
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
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v14 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "urls",
    "plural": true,
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v6/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v16 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
  (v6/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffPostQuery",
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
                (v5/*: any*/),
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
    "name": "StaffPostQuery",
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
              (v6/*: any*/),
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
                "selections": (v14/*: any*/),
                "storageKey": null
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v14/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "urls",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
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
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v6/*: any*/)
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
              (v6/*: any*/)
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
            "selections": (v16/*: any*/),
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
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": (v16/*: any*/),
                "storageKey": null
              },
              (v6/*: any*/)
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
            "selections": (v16/*: any*/),
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4aa6fc0d08d6b842d68ab43dee6ce67a",
    "metadata": {},
    "name": "StaffPostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "04230081022f411e4b3f50e229ce76c3";

export default node;
