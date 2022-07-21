/**
 * @generated SignedSource<<da40fd1aed3dba9f69ac40074017fd6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostJoinClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperViewerFragment" | "ClubSupportPostConditionWrapperViewerFragment">;
  readonly " $fragmentType": "PostJoinClubViewerFragment";
};
export type PostJoinClubViewerFragment$key = {
  readonly " $data"?: PostJoinClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostJoinClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostJoinClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinConditionWrapperViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportPostConditionWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "bd5ae5ad1e6a33c99f42383632960af4";

export default node;
