/**
 * @generated SignedSource<<52a773b39c89e100fd62d1756c9427e7>>
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
export type ClubRestrictedFragment = ClubRestrictedFragment$data;
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
