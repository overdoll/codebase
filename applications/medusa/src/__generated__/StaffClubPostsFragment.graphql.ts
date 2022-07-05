/**
 * @generated SignedSource<<256057dcd1afd3d815f470d4f4c2e831>>
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
  readonly " $fragmentSpreads": FragmentRefs<"StaffDisableClubSupporterOnlyPostsButtonFragment" | "StaffEnableClubSupporterOnlyPostsButtonFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffDisableClubSupporterOnlyPostsButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffEnableClubSupporterOnlyPostsButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "55133fdef23d4ee94391dd72d91fdebb";

export default node;
