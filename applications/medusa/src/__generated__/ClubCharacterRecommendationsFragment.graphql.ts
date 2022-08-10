/**
 * @generated SignedSource<<54d8df260cc3df9a21c90814617b1b72>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
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
      "name": "ClubThumbnailFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f2b101d0c618058167dc761d2a2f1377";

export default node;
