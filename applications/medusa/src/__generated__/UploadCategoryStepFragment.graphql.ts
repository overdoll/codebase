/**
 * @generated SignedSource<<7393829280fa5e696aac0c5eec0280bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadCategoryStepFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadRewindCategoriesFragment">;
  readonly " $fragmentType": "UploadCategoryStepFragment";
};
export type UploadCategoryStepFragment$key = {
  readonly " $data"?: UploadCategoryStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadCategoryStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadCategoryStepFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadRewindCategoriesFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "841b103d1a3e60bbbb545918ca222e8a";

export default node;
