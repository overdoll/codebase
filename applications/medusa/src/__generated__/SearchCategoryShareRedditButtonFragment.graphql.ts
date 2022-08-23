/**
 * @generated SignedSource<<24c3cf321e4ebac8082e5e551d57468c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCategoryShareRedditButtonFragment$data = {
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchCategoryShareRedditButtonFragment";
};
export type SearchCategoryShareRedditButtonFragment$key = {
  readonly " $data"?: SearchCategoryShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryShareRedditButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCategoryShareRedditButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "d84c7825e60437acc0ca9f38283b4552";

export default node;
