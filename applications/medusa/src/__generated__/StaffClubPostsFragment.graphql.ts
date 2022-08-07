/**
 * @generated SignedSource<<139d733617d72d10d5137ac80779d351>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPostsFragment$data = {
  readonly canCreateSupporterOnlyPosts: boolean;
  readonly charactersEnabled: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDisableClubCharactersButtonFragment" | "StaffDisableClubSupporterOnlyPostsButtonFragment" | "StaffEnableClubCharactersButtonFragment" | "StaffEnableClubSupporterOnlyPostsButtonFragment">;
  readonly " $fragmentType": "StaffClubPostsFragment";
};
export type StaffClubPostsFragment$key = {
  readonly " $data"?: StaffClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canCreateSupporterOnlyPosts",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "charactersEnabled",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffDisableClubSupporterOnlyPostsButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffEnableClubSupporterOnlyPostsButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffEnableClubCharactersButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffDisableClubCharactersButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b9872ee3bd6156c9ea1f7ddf6707b9a8";

export default node;
