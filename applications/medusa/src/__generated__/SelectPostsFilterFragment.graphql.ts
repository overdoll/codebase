/**
 * @generated SignedSource<<d6754a3b5ece1c8eebafc1dd4f136a76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectPostsFilterFragment$data = {
  readonly __typename: "Category";
  readonly " $fragmentSpreads": FragmentRefs<"CategoryPostsFilterFragment">;
  readonly " $fragmentType": "SelectPostsFilterFragment";
} | {
  readonly __typename: "Character";
  readonly " $fragmentSpreads": FragmentRefs<"CharacterPostsFilterFragment">;
  readonly " $fragmentType": "SelectPostsFilterFragment";
} | {
  readonly __typename: "Series";
  readonly " $fragmentSpreads": FragmentRefs<"SeriesPostsFilterFragment">;
  readonly " $fragmentType": "SelectPostsFilterFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "SelectPostsFilterFragment";
};
export type SelectPostsFilterFragment$key = {
  readonly " $data"?: SelectPostsFilterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectPostsFilterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectPostsFilterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CategoryPostsFilterFragment"
        }
      ],
      "type": "Category",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SeriesPostsFilterFragment"
        }
      ],
      "type": "Series",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CharacterPostsFilterFragment"
        }
      ],
      "type": "Character",
      "abstractKey": null
    }
  ],
  "type": "Search",
  "abstractKey": "__isSearch"
};

(node as any).hash = "9f3c0f764ca1a1a4f0641819a085e88a";

export default node;
