/**
 * @generated SignedSource<<0b985d3780cd3ad0dbf1f40b97dbf889>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubExternalLinksFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostFooterButtonsFragment">;
  readonly " $fragmentType": "DescriptionPublicPostFragment";
};
export type DescriptionPublicPostFragment$key = {
  readonly " $data"?: DescriptionPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DescriptionPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionPublicPostFragment",
  "selections": [
    {
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
          "name": "ClubExternalLinksFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d7373773b248f0ef0039206e46ca7fc3";

export default node;
