/**
 * @generated SignedSource<<d136877cb4351b5d92ebfedfac417f30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RestrictedClubCreatePostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment">;
  readonly " $fragmentType": "RestrictedClubCreatePostFragment";
};
export type RestrictedClubCreatePostFragment$key = {
  readonly " $data"?: RestrictedClubCreatePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RestrictedClubCreatePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RestrictedClubCreatePostFragment",
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

(node as any).hash = "8800f77eb447742e21fb89dea5a00083";

export default node;
