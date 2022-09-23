/**
 * @generated SignedSource<<f2d5313cd2277e57aab9823d81cfd644>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportLinksPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportBannerViewerFragment">;
  readonly " $fragmentType": "SupportLinksPublicClubViewerFragment";
};
export type SupportLinksPublicClubViewerFragment$key = {
  readonly " $data"?: SupportLinksPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportLinksPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportLinksPublicClubViewerFragment",
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

(node as any).hash = "8639e2f071455ab4da1389e539f21ce8";

export default node;
