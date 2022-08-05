/**
 * @generated SignedSource<<5bfe0fe18c90ce58388e98c16bbe0b76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RestrictedClubCharactersFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment">;
  readonly " $fragmentType": "RestrictedClubCharactersFragment";
};
export type RestrictedClubCharactersFragment$key = {
  readonly " $data"?: RestrictedClubCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RestrictedClubCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RestrictedClubCharactersFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubInformationBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7de53dd165680e8e7b6796d855de7bf3";

export default node;
