/**
 * @generated SignedSource<<d7d10c901c29a72308620421ad858f6a>>
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
  readonly totalLikes: number;
  readonly totalPosts: number;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterCopyLinkButtonFragment" | "SearchCharacterRecommendationsFragment" | "SearchCharacterShareDiscordButtonFragment" | "SearchCharacterShareRedditButtonFragment" | "SearchCharacterShareTwitterButtonFragment">;
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

(node as any).hash = "1cad7a332a78246297098c51965a7390";

export default node;
