/**
 * @generated SignedSource<<e9057d279b21e0f926edd80f23182feb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"PostClubLinksFragment">;
  };
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostFooterButtonsFragment" | "PostGalleryPublicDetailedFragment" | "PostPublicHeaderFragment">;
  readonly " $fragmentType": "FullDetailedPostFragment";
};
export type FullDetailedPostFragment$key = {
  readonly " $data"?: FullDetailedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
          "name": "PostClubLinksFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPublicHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "12a7812fe27db92f72da99b067de9ea3";

export default node;
