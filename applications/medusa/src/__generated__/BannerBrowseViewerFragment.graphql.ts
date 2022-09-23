/**
 * @generated SignedSource<<050060b9fe4f0f8cd70a4388c0f01d24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerBrowseViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerBrowseViewerFragment";
};
export type BannerBrowseViewerFragment$key = {
  readonly " $data"?: BannerBrowseViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerBrowseViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerBrowseViewerFragment",
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

(node as any).hash = "8e7da70478ee899441522094319ee29c";

export default node;
