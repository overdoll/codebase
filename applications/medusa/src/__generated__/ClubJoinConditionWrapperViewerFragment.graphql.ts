/**
 * @generated SignedSource<<3d55cb6d4affafa75d0721d99b9874e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinConditionWrapperViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinWrapperViewerFragment">;
  readonly " $fragmentType": "ClubJoinConditionWrapperViewerFragment";
};
export type ClubJoinConditionWrapperViewerFragment$key = {
  readonly " $data"?: ClubJoinConditionWrapperViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinConditionWrapperViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2add5ec7bdda7fddfe7f158e25bf1a59";

export default node;
