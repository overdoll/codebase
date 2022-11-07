/**
 * @generated SignedSource<<3bde189f95337d7c42d00ab29a12147a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FilterPublicClubPostsFragment$data = {
  readonly id: string;
  readonly tags: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
        readonly id?: string;
        readonly " $fragmentSpreads": FragmentRefs<"SelectPostsFilterFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "FilterPublicClubPostsFragment";
};
export type FilterPublicClubPostsFragment$key = {
  readonly " $data"?: FilterPublicClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FilterPublicClubPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "tags"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 12,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ClubPublicPostsTagsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "FilterPublicClubPostsFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": "tags",
      "args": null,
      "concreteType": "TagConnection",
      "kind": "LinkedField",
      "name": "__ClubPublicPosts_tags_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TagEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "Category",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "Character",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "Series",
                  "abstractKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SelectPostsFilterFragment"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "b219272c7bf69013edb207366bf34309";

export default node;
