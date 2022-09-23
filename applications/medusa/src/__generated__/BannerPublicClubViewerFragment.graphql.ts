/**
 * @generated SignedSource<<1e5e474529db1cbe65d409f013289ea2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerPublicClubViewerFragment";
};
export type BannerPublicClubViewerFragment$key = {
  readonly " $data"?: BannerPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicClubViewerFragment",
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

(node as any).hash = "5419b6250c3a65c3241f4a2eef413be1";

export default node;
