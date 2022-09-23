/**
 * @generated SignedSource<<43c293e1140f6e8f6b6267531a625523>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryTileOverlayFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryBannerFragment">;
  readonly " $fragmentType": "CategoryTileOverlayFragment";
};
export type CategoryTileOverlayFragment$key = {
  readonly " $data"?: CategoryTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryBannerFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "16026e7857bcf3a97b485380997628f6";

export default node;
