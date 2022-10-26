/**
 * @generated SignedSource<<c621deb618070a6911f9c3105e70e39e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SwapPaginationScrollerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GridPaginationScrollerFragment" | "VerticalPaginationScrollerFragment">;
  readonly " $fragmentType": "SwapPaginationScrollerFragment";
};
export type SwapPaginationScrollerFragment$key = {
  readonly " $data"?: SwapPaginationScrollerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SwapPaginationScrollerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SwapPaginationScrollerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VerticalPaginationScrollerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GridPaginationScrollerFragment"
    }
  ],
  "type": "PostConnection",
  "abstractKey": null
};

(node as any).hash = "58becd01064ba9e6ee97fbb3578616a3";

export default node;
