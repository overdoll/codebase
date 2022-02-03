/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadReviewStepFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostReviewFragment">;
    readonly " $refType": "UploadReviewStepFragment";
};
export type UploadReviewStepFragment$data = UploadReviewStepFragment;
export type UploadReviewStepFragment$key = {
    readonly " $data"?: UploadReviewStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadReviewStepFragment">;
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
(node as any).hash = '3e7db1d436ca4c4b8aca74a7b8568c6b';
export default node;
