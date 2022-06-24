/**
 * @generated SignedSource<<27fd836ff9c2a4d65b6d343eb5a25ecc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubRestrictedFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment">;
  readonly " $fragmentType": "ClubRestrictedFragment";
};
export type ClubRestrictedFragment$key = {
  readonly " $data"?: ClubRestrictedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubRestrictedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubRestrictedFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubInformationBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "34e43eea0787e676ee2bdefb15601480";

export default node;
