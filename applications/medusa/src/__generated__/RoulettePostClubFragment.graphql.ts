/**
 * @generated SignedSource<<a7433a67b5b6cb388e67835a3148364a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RoulettePostClubFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  readonly " $fragmentType": "RoulettePostClubFragment";
};
export type RoulettePostClubFragment$key = {
  readonly " $data"?: RoulettePostClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RoulettePostClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoulettePostClubFragment",
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7c8ecd9cb6399611c7e8eed20f184dd0";

export default node;
