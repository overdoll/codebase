/**
 * @generated SignedSource<<6096fdd30573d01cdb5aa75e5bba3b91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewCategoryFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryThumbnailFragment">;
  readonly " $fragmentType": "PreviewCategoryFragment";
};
export type PreviewCategoryFragment$key = {
  readonly " $data"?: PreviewCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewCategoryFragment",
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
      "name": "CategoryThumbnailFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "909d175745db10161ea983109e984a95";

export default node;
