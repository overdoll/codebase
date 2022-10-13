/**
 * @generated SignedSource<<4b4db31cb34c3c4a4840f829a1390c83>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportBannerViewerFragment">;
  readonly " $fragmentType": "SupportPublicClubViewerFragment";
};
export type SupportPublicClubViewerFragment$key = {
  readonly " $data"?: SupportPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportBannerViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "cd9d8ba05e8a336354ebdd856ae48090";

export default node;
