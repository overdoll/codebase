/**
 * @generated SignedSource<<cba7fb5f6963b4c2ef44a357889d0c7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostInfiniteScrollFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly __typename: "Post";
      readonly id: string;
    };
  }>;
  readonly " $fragmentType": "PostInfiniteScrollFragment";
};
export type PostInfiniteScrollFragment$key = {
  readonly " $data"?: PostInfiniteScrollFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostInfiniteScrollFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostInfiniteScrollFragment",
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
              "name": "id",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostConnection",
  "abstractKey": null
};

(node as any).hash = "6e7ab66c8940df705585c8dfaea1da82";

export default node;
