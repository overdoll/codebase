/**
 * @generated SignedSource<<dba5510e407dbe022df53a85289aff19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewCategoryTileHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CategoryLinkTileFragment" | "PreviewCategoryFragment">;
  readonly " $fragmentType": "PreviewCategoryTileHomeFragment";
};
export type PreviewCategoryTileHomeFragment$key = {
  readonly " $data"?: PreviewCategoryTileHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCategoryTileHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewCategoryTileHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewCategoryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryLinkTileFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "549f437ca1608809379063ee8d3bfb24";

export default node;
