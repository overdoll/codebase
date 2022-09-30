/**
 * @generated SignedSource<<765f20a7d256d03d9977b60a3216a98d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinTileFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonFragment" | "ClubTileOverlayFragment">;
  readonly " $fragmentType": "ClubJoinTileFragment";
};
export type ClubJoinTileFragment$key = {
  readonly " $data"?: ClubJoinTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinTileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTileOverlayFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a634e20568c84f587af70da8ea14b377";

export default node;
