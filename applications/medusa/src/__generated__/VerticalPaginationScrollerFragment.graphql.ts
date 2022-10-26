/**
 * @generated SignedSource<<8521a46ca9addcefdfb7d65b8838b826>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerticalPaginationScrollerFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"PreviewPostFragment">;
    };
  }>;
  readonly " $fragmentType": "VerticalPaginationScrollerFragment";
};
export type VerticalPaginationScrollerFragment$key = {
  readonly " $data"?: VerticalPaginationScrollerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"VerticalPaginationScrollerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerticalPaginationScrollerFragment",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "PreviewPostFragment"
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

(node as any).hash = "e3f4b0a87eabfacdbf4c753f25bdfa8a";

export default node;
