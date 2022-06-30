/**
 * @generated SignedSource<<20c3c37bf141b80daabe096db9a45aeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchResultsCategoryFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryTileOverlayFragment">;
  readonly " $fragmentType": "SearchResultsCategoryFragment";
};
export type SearchResultsCategoryFragment$key = {
  readonly " $data"?: SearchResultsCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsCategoryFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryTileOverlayFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "200fcb94f120e3e4e721847f758c7f4f";

export default node;
