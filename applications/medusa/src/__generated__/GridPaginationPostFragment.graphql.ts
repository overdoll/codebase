/**
 * @generated SignedSource<<b72cd8e23722947c6a6e29a4991321ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridPaginationPostFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostContentFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostLinkTileFragment">;
  readonly " $fragmentType": "GridPaginationPostFragment";
};
export type GridPaginationPostFragment$key = {
  readonly " $data"?: GridPaginationPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridPaginationPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
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
          "name": "GridPaginationPostContentFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLinkTileFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "01cc74401abb9122117814598c03d5f1";

export default node;
