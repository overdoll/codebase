/**
 * @generated SignedSource<<d0bf34802bd811630b287539c61d946d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderSearchCharacterFragment$data = {
  readonly name: string;
  readonly series: {
    readonly slug: string;
    readonly title: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterBannerFragment" | "SearchCharacterCopyLinkButtonFragment" | "SearchCharacterRecommendationsFragment" | "SearchCharacterShareDiscordButtonFragment" | "SearchCharacterShareRedditButtonFragment" | "SearchCharacterShareTwitterButtonFragment">;
  readonly " $fragmentType": "HeaderSearchCharacterFragment";
};
export type HeaderSearchCharacterFragment$key = {
  readonly " $data"?: HeaderSearchCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderSearchCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderSearchCharacterFragment",
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
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
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
      "name": "SearchCharacterRecommendationsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCharacterCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCharacterShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCharacterShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCharacterShareTwitterButtonFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "ace1b98c9d3363d8594c7b96e4044456";

export default node;
