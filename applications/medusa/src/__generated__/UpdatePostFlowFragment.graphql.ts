/**
 * @generated SignedSource<<d6f62b690350ec4a275eb6c30c2440ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD
export type UpdatePostFlowFragment = {
    readonly " $fragmentRefs": FragmentRefs<"UploadFlowHeaderFragment" | "UploadFlowFooterFragment" | "UploadCategoryStepFragment" | "UploadAudienceStepFragment" | "UploadReviewStepFragment" | "UploadCharacterStepFragment" | "UploadArrangeStepFragment">;
    readonly " $refType": "UpdatePostFlowFragment";
=======
export type UpdatePostFlowFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FlowStepsFragment" | "FlowFooterFragment" | "FlowHeaderFragment">;
  readonly " $fragmentType": "UpdatePostFlowFragment";
>>>>>>> master
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
<<<<<<< HEAD
(node as any).hash = '83f6d344dcf43cf03a9ae5ff9e5caaaa';
=======

(node as any).hash = "9a9942426050ce53867f5f2b7013ea2b";

>>>>>>> master
export default node;
