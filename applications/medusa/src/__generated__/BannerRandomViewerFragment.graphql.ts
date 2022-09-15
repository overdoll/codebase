/**
 * @generated SignedSource<<8d5386b830caa942587f30b74cc79f0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
  readonly " $fragmentType": "BannerRandomViewerFragment";
};
export type BannerRandomViewerFragment$key = {
  readonly " $data"?: BannerRandomViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerRandomViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerRandomViewerFragment",
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

(node as any).hash = "17526e4db39ef58d914e22ad17aaa24b";

export default node;
