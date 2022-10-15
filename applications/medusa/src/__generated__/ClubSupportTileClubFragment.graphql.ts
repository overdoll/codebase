/**
 * @generated SignedSource<<8331ea21ed7bd22649df7795bb2e7534>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportTileClubFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment" | "ClubIconFragment">;
  readonly " $fragmentType": "ClubSupportTileClubFragment";
};
export type ClubSupportTileClubFragment$key = {
  readonly " $data"?: ClubSupportTileClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportTileClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportTileClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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

(node as any).hash = "25c0e1657a28aa003584b123fdf5c77d";

export default node;
