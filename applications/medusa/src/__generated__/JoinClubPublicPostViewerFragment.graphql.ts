/**
 * @generated SignedSource<<a24f50cb4338ebe64e990f959d2df6fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperViewerFragment">;
  readonly " $fragmentType": "JoinClubPublicPostViewerFragment";
};
export type JoinClubPublicPostViewerFragment$key = {
  readonly " $data"?: JoinClubPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubPublicPostViewerFragment",
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

(node as any).hash = "b856ae8fdebc444ab311bc853f8646d0";

export default node;
