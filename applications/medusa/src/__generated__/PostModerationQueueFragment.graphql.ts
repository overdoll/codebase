/**
 * @generated SignedSource<<74bfb46f21f4064a143b82c5425491ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostModerationQueueFragment$data = {
  readonly postModeratorQueue: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly post: {
          readonly id: string;
          readonly postedAt: any | null;
          readonly " $fragmentSpreads": FragmentRefs<"PostPreviewFragment" | "ModeratePostFragment" | "PostTagsPreviewFragment">;
        };
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"NoPostsPlaceholderFragment">;
  readonly " $fragmentType": "PostModerationQueueFragment";
};
export type PostModerationQueueFragment = PostModerationQueueFragment$data;
export type PostModerationQueueFragment$key = {
  readonly " $data"?: PostModerationQueueFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostModerationQueueFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "postModeratorQueue"
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
      "defaultValue": 1,
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
      "operation": require('./PostsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "PostModerationQueueFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NoPostsPlaceholderFragment"
    },
    {
      "alias": "postModeratorQueue",
      "args": null,
      "concreteType": "PostModeratorConnection",
      "kind": "LinkedField",
      "name": "__Posts_postModeratorQueue_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostModeratorEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PostModerator",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Post",
                  "kind": "LinkedField",
                  "name": "post",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "PostPreviewFragment"
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ModeratePostFragment"
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "PostTagsPreviewFragment"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "postedAt",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
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
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "7c425557c42abec81a42baa3e8e5f3af";

export default node;