/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostsInfiniteScrollFragment = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly " $fragmentRefs": FragmentRefs<"FullSimplePostFragment">;
        };
    }>;
    readonly " $refType": "PostsInfiniteScrollFragment";
};
export type PostsInfiniteScrollFragment$data = PostsInfiniteScrollFragment;
export type PostsInfiniteScrollFragment$key = {
    readonly " $data"?: PostsInfiniteScrollFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostsInfiniteScrollFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsInfiniteScrollFragment",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "FullSimplePostFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostConnection",
  "abstractKey": null
};
(node as any).hash = '6ab729e8d0bfe7ee57af78790616434a';
export default node;
