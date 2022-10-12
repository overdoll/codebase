/**
 * @generated SignedSource<<83295dd4ab7e35eb829122cd5f36ee00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerHomeViewerFragment";
};
export type BannerHomeViewerFragment$key = {
  readonly " $data"?: BannerHomeViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerHomeViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerHomeViewerFragment",
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

(node as any).hash = "e86cb9133bdfb6fd58a783e643e1befc";

export default node;
