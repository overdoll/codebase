/**
 * @generated SignedSource<<4cee9b9430e5e09dba1b678df08feb51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSuspendedStaffAlertFragment">;
  readonly " $fragmentType": "BannerPublicClubFragment";
};
export type BannerPublicClubFragment$key = {
  readonly " $data"?: BannerPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSuspendedStaffAlertFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5d0dad49539e6bbdc18d2875dca83649";

export default node;
