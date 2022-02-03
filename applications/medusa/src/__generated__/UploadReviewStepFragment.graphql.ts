/**
 * @generated SignedSource<<4dd145f363b82039acc6fbf1c990e715>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadReviewStepFragment.graphql.ts
export type UploadReviewStepFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostReviewFragment">;
    readonly " $refType": "UploadReviewStepFragment";
};
export type UploadReviewStepFragment$data = UploadReviewStepFragment;
export type UploadReviewStepFragment$key = {
    readonly " $data"?: UploadReviewStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadReviewStepFragment">;
=======
export type ReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
  readonly " $fragmentType": "ReviewFragment";
};
export type ReviewFragment = ReviewFragment$data;
export type ReviewFragment$key = {
  readonly " $data"?: ReviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReviewFragment">;
>>>>>>> master:applications/medusa/src/__generated__/ReviewFragment.graphql.ts
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
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadReviewStepFragment.graphql.ts
(node as any).hash = '3e7db1d436ca4c4b8aca74a7b8568c6b';
=======

(node as any).hash = "b9fffff9ef7f5f561b9e36dd4f583688";

>>>>>>> master:applications/medusa/src/__generated__/ReviewFragment.graphql.ts
export default node;
