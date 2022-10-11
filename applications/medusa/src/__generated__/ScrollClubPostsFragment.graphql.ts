/**
 * @generated SignedSource<<9e65de8259201bc88eb07dfbe1826bc8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollClubPostsFragment$data = {
  readonly id: string;
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"PreviewPostFragment">;
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"VerticalPaginationScrollerFragment">;
  };
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubEmptyPostsFragment">;
  readonly " $fragmentType": "ScrollClubPostsFragment";
};
export type ScrollClubPostsFragment$key = {
  readonly " $data"?: ScrollClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollClubPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "posts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "seed"
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
      "operation": require('./ScrollClubPostsFragmentPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ScrollClubPostsFragment",
  "selections": [
    {
      "alias": "posts",
      "args": [
        {
          "kind": "Variable",
          "name": "seed",
          "variableName": "seed"
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "NEW"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubPostsPreview_posts_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PreviewPostFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "VerticalPaginationScrollerFragment"
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubEmptyPostsFragment"
    },
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "96effe63d213ae850ac5da825172a7ed";

export default node;
