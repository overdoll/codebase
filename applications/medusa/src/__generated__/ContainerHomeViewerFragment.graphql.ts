/**
 * @generated SignedSource<<c8098f698adb5e0acfcacad6de56bd37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerHomeViewerFragment" | "BoxesHomeFragment">;
  readonly " $fragmentType": "ContainerHomeViewerFragment";
};
export type ContainerHomeViewerFragment$key = {
  readonly " $data"?: ContainerHomeViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerHomeViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerHomeViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BoxesHomeFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fb46da1f8ad41e10d9e3660eabebb874";

export default node;
