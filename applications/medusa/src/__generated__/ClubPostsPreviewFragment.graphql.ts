/**
 * @generated SignedSource<<01fc9b62093ce95be7c2e83dae50ea1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsPreviewFragment$data = {
  readonly clubPosts: {
    readonly edges: ReadonlyArray<{
      readonly __typename: "PostEdge";
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollFragment">;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubPostsPreviewFragment";
};
export type ClubPostsPreviewFragment$key = {
  readonly " $data"?: ClubPostsPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "clubPosts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "sort"
    },
    {
      "kind": "RootArgument",
      "name": "supporter"
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
      "operation": require('./ClubPostsPreviewPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubPostsPreviewFragment",
  "selections": [
    {
      "alias": "clubPosts",
      "args": [
        {
          "kind": "Variable",
          "name": "sortBy",
          "variableName": "sort"
        },
        {
          "kind": "Variable",
          "name": "supporterOnlyStatus",
          "variableName": "supporter"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubPostsPreview_clubPosts_connection",
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
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostsInfiniteScrollFragment"
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
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "81c57ecafae42285d55a14d3bcc6406f";

export default node;
