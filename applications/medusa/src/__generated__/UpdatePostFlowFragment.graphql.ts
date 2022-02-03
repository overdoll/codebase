/**
 * @generated SignedSource<<9ba48cac1ba8154b2cf2b4af8b2e8922>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePostFlowFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadFlowHeaderFragment" | "UploadFlowFooterFragment" | "UploadCategoryStepFragment" | "UploadAudienceStepFragment" | "UploadReviewStepFragment" | "UploadCharacterStepFragment" | "UploadArrangeStepFragment">;
  readonly " $fragmentType": "UpdatePostFlowFragment";
};
export type UpdatePostFlowFragment = UpdatePostFlowFragment$data;
export type UpdatePostFlowFragment$key = {
  readonly " $data"?: UpdatePostFlowFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostFlowFragment">;
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

(node as any).hash = "83f6d344dcf43cf03a9ae5ff9e5caaaa";

export default node;
