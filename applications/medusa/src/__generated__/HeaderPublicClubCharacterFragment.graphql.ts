/**
 * @generated SignedSource<<f13cfd471ecf96cc2db43b05b6ae9f47>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CharacterBannerFragment" | "SearchCustomCharacterCopyLinkButtonFragment" | "SearchCustomCharacterShareDiscordButtonFragment" | "SearchCustomCharacterShareRedditButtonFragment" | "SearchCustomCharacterShareTwitterButtonFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterBannerFragment"
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

(node as any).hash = "15ddc4c875ccf8040c2c33fdf29e3ee0";

export default node;
