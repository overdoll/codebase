/**
 * @generated SignedSource<<0ca52b39c038d5bc7c890dab2d56cdf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageClubCharactersFragment$data = {
  readonly charactersCount: number;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment" | "ViewClubCharactersFragment">;
  readonly " $fragmentType": "ManageClubCharactersFragment";
};
export type ManageClubCharactersFragment$key = {
  readonly " $data"?: ManageClubCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageClubCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageClubCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "charactersCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubInformationBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewClubCharactersFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "e5288c5824a5af235e439d34d3ce5171";

export default node;
