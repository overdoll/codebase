/**
 * @generated SignedSource<<0e02a2b79ac0ebfe0ebed56eea0d8311>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadReviewStepFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
  readonly " $fragmentType": "UploadReviewStepFragment";
};
export type UploadReviewStepFragment$key = {
  readonly " $data"?: UploadReviewStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadReviewStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadReviewStepFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReviewFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3e7db1d436ca4c4b8aca74a7b8568c6b";

export default node;
