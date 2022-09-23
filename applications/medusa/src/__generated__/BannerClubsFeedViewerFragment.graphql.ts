/**
 * @generated SignedSource<<235602ef03e16a41e1a5bcc2dcb32558>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerClubsFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerClubsFeedViewerFragment";
};
export type BannerClubsFeedViewerFragment$key = {
  readonly " $data"?: BannerClubsFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerClubsFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerClubsFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountInformationBannerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "652ede92bbd721513b698cb153aedd66";

export default node;
