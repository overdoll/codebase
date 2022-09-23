/**
 * @generated SignedSource<<9547d698fc2058871b0d3e158ccb8335>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerPublicPostViewerFragment";
};
export type BannerPublicPostViewerFragment$key = {
  readonly " $data"?: BannerPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicPostViewerFragment",
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

(node as any).hash = "92c040270bb81a3bb09ef5029913716f";

export default node;
