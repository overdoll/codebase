/**
 * @generated SignedSource<<2968627ac84ee232424fd65ca5571d35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerLikedPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerLikedPostsViewerFragment";
};
export type BannerLikedPostsViewerFragment$key = {
  readonly " $data"?: BannerLikedPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerLikedPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerLikedPostsViewerFragment",
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

(node as any).hash = "6e588d6984ecac7bec5abba04cdfebd8";

export default node;
