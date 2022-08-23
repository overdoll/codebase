/**
 * @generated SignedSource<<226a222e5df3823249076a5aca38ee41>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCategoryShareTwitterButtonFragment$data = {
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "SearchCategoryShareTwitterButtonFragment";
};
export type SearchCategoryShareTwitterButtonFragment$key = {
  readonly " $data"?: SearchCategoryShareTwitterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryShareTwitterButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCategoryShareTwitterButtonFragment",
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

(node as any).hash = "52e6836d44d2d8ab55f9298d5303c45e";

export default node;
