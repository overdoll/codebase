/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdatePostFlowFragment = {
    readonly " $fragmentRefs": FragmentRefs<"UploadFlowHeaderFragment" | "UploadFlowFooterFragment" | "UploadCategoryStepFragment" | "UploadAudienceStepFragment" | "UploadReviewStepFragment" | "UploadCharacterStepFragment" | "UploadArrangeStepFragment">;
    readonly " $refType": "UpdatePostFlowFragment";
};
export type UpdatePostFlowFragment$data = UpdatePostFlowFragment;
export type UpdatePostFlowFragment$key = {
    readonly " $data"?: UpdatePostFlowFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdatePostFlowFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostFlowFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowFooterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadCategoryStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadAudienceStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadReviewStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadCharacterStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadArrangeStepFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '83f6d344dcf43cf03a9ae5ff9e5caaaa';
export default node;
