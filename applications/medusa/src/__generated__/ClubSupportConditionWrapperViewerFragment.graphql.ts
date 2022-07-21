/**
 * @generated SignedSource<<b3e311ee245e3c2188e901c8ebb54e25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportConditionWrapperViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportWrapperViewerFragment">;
  readonly " $fragmentType": "ClubSupportConditionWrapperViewerFragment";
};
export type ClubSupportConditionWrapperViewerFragment$key = {
  readonly " $data"?: ClubSupportConditionWrapperViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportConditionWrapperViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportConditionWrapperViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c456387142cdf0552cd9d39d3cf80a48";

export default node;
