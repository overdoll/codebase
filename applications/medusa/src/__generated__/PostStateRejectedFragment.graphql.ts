/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStateRejectedFragment = {
    readonly rejectedPosts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"PostStateRejectedPreviewFragment">;
            };
        }>;
    };
    readonly id: string;
    readonly " $refType": "PostStateRejectedFragment";
};
export type PostStateRejectedFragment$data = PostStateRejectedFragment;
export type PostStateRejectedFragment$key = {
    readonly " $data"?: PostStateRejectedFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStateRejectedFragment">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "rejectedPosts"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 3,
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
      "operation": require('./RejectedPostsPaginationQuery.graphql.ts'),
      "identifierField": "id"
    }
  },
  "name": "PostStateRejectedFragment",
  "selections": [
    {
      "alias": "rejectedPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "state",
          "value": "REJECTED"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__RejectedPostsPaginationQuery_rejectedPosts_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostStateRejectedPreviewFragment"
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
      "storageKey": "__RejectedPostsPaginationQuery_rejectedPosts_connection(state:\"REJECTED\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
(node as any).hash = '4a4efe16905fec5ed900ca7dc8cf96c0';
export default node;
