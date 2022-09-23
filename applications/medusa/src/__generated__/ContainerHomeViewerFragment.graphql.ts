/**
 * @generated SignedSource<<ec04df6598251d0b84663b8717b8cdb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerHomeViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerHomeViewerFragment">;
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "21a76a777e1635140cc1aabf00d420ff";

export default node;
