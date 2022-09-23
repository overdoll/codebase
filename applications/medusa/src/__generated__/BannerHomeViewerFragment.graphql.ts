/**
 * @generated SignedSource<<9890de7161dc987eb9d72f6512f6f802>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment" | "CurationProfileAlertFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CurationProfileAlertFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "403a772af558754a7ed6ab8584734bc3";

export default node;
