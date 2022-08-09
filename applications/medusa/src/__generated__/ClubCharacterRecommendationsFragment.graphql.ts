/**
 * @generated SignedSource<<f6d166c7ed9d6623605be26788dd017c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubCharacterRecommendationsFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  };
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
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
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
        "storageKey": null
      },
      "action": "THROW",
      "path": "club"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "5a72ccae55f127c7dc63f251ef7534c4";

export default node;
