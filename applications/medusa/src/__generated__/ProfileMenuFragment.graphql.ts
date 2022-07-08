/**
 * @generated SignedSource<<1be7ccc3cd4b621ad2b44d88c8e5c929>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCopyLinkButtonFragment" | "ProfileStaffButtonFragment">;
  readonly " $fragmentType": "ProfileMenuFragment";
};
export type ProfileMenuFragment$key = {
  readonly " $data"?: ProfileMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileStaffButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileCopyLinkButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "177e4c5c668a87ac5f3502c8cb701aa3";

export default node;
