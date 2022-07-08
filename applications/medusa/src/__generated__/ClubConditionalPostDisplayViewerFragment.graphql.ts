/**
 * @generated SignedSource<<e51e4816655107376777541c281cb7c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubConditionalPostDisplayViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonViewerFragment">;
  readonly " $fragmentType": "ClubConditionalPostDisplayViewerFragment";
};
export type ClubConditionalPostDisplayViewerFragment$key = {
  readonly " $data"?: ClubConditionalPostDisplayViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubConditionalPostDisplayViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubConditionalPostDisplayViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "12f3e37059dc50fcff8129e4c5921391";

export default node;
