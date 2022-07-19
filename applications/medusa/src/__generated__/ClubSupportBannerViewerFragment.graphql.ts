/**
 * @generated SignedSource<<18079b0e60a5f43f1ed44b7c178cea62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportBannerViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportConditionWrapperViewerFragment">;
  readonly " $fragmentType": "ClubSupportBannerViewerFragment";
};
export type ClubSupportBannerViewerFragment$key = {
  readonly " $data"?: ClubSupportBannerViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportBannerViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportBannerViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportConditionWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e1013632d7de398292a5449774556d91";

export default node;
