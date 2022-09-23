/**
 * @generated SignedSource<<159a22e36b08fbfecbcdb9e6d468f8d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubCharacterFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubCharacterRecommendationsFragment">;
  };
  readonly name: string;
  readonly totalLikes: number;
  readonly totalPosts: number;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCustomCharacterCopyLinkButtonFragment" | "SearchCustomCharacterShareDiscordButtonFragment" | "SearchCustomCharacterShareRedditButtonFragment" | "SearchCustomCharacterShareTwitterButtonFragment">;
  readonly " $fragmentType": "HeaderPublicClubCharacterFragment";
};
export type HeaderPublicClubCharacterFragment$key = {
  readonly " $data"?: HeaderPublicClubCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubCharacterFragment",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubCharacterRecommendationsFragment"
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "club"
    },
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
      "name": "totalLikes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalPosts",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCustomCharacterCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCustomCharacterShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCustomCharacterShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCustomCharacterShareTwitterButtonFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "668457c384b129d50c711a0a335e5da2";

export default node;
