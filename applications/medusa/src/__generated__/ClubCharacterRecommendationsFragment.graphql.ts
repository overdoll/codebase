/**
 * @generated SignedSource<<62d31e176ae40b9a1a0254281d1e064f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubCharacterRecommendationsFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  readonly " $fragmentType": "ClubCharacterRecommendationsFragment";
};
export type ClubCharacterRecommendationsFragment$key = {
  readonly " $data"?: ClubCharacterRecommendationsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubCharacterRecommendationsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubCharacterRecommendationsFragment",
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "8891290c2d950a2bc8b7a94f76bafcda";

export default node;
