/**
 * @generated SignedSource<<fff75c79e3713bf5d327937cc1e3570b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinTileIconButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperViewerFragment">;
  readonly " $fragmentType": "ClubJoinTileIconButtonViewerFragment";
};
export type ClubJoinTileIconButtonViewerFragment$key = {
  readonly " $data"?: ClubJoinTileIconButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileIconButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinTileIconButtonViewerFragment",
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

(node as any).hash = "25e0e76f49bb24b7faa5e3989d53b5c7";

export default node;
