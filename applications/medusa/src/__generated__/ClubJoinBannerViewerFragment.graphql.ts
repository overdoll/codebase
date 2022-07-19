/**
 * @generated SignedSource<<61de56ff63a521b607e832f38e892819>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinBannerViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperViewerFragment">;
  readonly " $fragmentType": "ClubJoinBannerViewerFragment";
};
export type ClubJoinBannerViewerFragment$key = {
  readonly " $data"?: ClubJoinBannerViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinBannerViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinBannerViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinConditionWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1e1da87c3f0c109e8b942f2c43e5892e";

export default node;
