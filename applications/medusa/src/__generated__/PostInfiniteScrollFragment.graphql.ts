/**
 * @generated SignedSource<<2f5b235878dacba30a6c203944048d55>>
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

(node as any).hash = "43e653ac3b7e1ba3a97491b12d7a1f09";

export default node;
