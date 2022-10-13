/**
 * @generated SignedSource<<f2c848c5ba4be472f6c3884fbcd57b76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BoxesHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerHomeViewerFragment">;
  readonly " $fragmentType": "BoxesHomeFragment";
};
export type BoxesHomeFragment$key = {
  readonly " $data"?: BoxesHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BoxesHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BoxesHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerHomeViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "df4e5b7fd29ff83d2d3b14648bc4fce9";

export default node;
