/**
 * @generated SignedSource<<a1e292aa1baa58d2e4539e332d122ddf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsInfiniteScrollFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
    };
  }>;
  readonly " $fragmentType": "PostsInfiniteScrollFragment";
};
export type PostsInfiniteScrollFragment$key = {
  readonly " $data"?: PostsInfiniteScrollFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollFragment">;
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

(node as any).hash = "6ab729e8d0bfe7ee57af78790616434a";

export default node;
