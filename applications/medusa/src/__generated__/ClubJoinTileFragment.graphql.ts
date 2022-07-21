/**
 * @generated SignedSource<<b8f374407e96ad280382b178d9e2a28f>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileIconButtonFragment" | "ClubTileOverlayFragment">;
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
      "name": "ClubJoinTileIconButtonFragment"
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

(node as any).hash = "8a3eea5f5e0d6ff85be41a0198f201cf";

export default node;
