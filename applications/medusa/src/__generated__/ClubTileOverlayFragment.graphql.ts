/**
 * @generated SignedSource<<9f742cda6a1c13c82e634c8e6653c1a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubTileOverlayFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment" | "ClubIconFragment">;
  readonly " $fragmentType": "ClubTileOverlayFragment";
};
export type ClubTileOverlayFragment$key = {
  readonly " $data"?: ClubTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "52410e807f3a4291749f7adf9e164410";

export default node;
