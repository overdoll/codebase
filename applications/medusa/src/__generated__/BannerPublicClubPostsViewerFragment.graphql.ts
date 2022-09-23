/**
 * @generated SignedSource<<3d6e213c7280cb485e5fe1147e6775a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicClubPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerPublicClubPostsViewerFragment";
};
export type BannerPublicClubPostsViewerFragment$key = {
  readonly " $data"?: BannerPublicClubPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicClubPostsViewerFragment",
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

(node as any).hash = "bb01ba7819d99d050d53b9ba56aac7c8";

export default node;
