/**
 * @generated SignedSource<<ffeda1b99cb391f65543bc68b145f2c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadRewindCategoriesFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadRewindSingleSelectorPostFragment">;
  readonly " $fragmentType": "UploadRewindCategoriesFragment";
};
export type UploadRewindCategoriesFragment$key = {
  readonly " $data"?: UploadRewindCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadRewindCategoriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadRewindCategoriesFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadRewindSingleSelectorPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c3463cba64d8a38fcf561a9dfc41ead1";

export default node;
