/**
 * @generated SignedSource<<a08b829f55722532e42f9992753cd8e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ProfileStaffButtonFragment" | "ProfileCopyLinkButtonFragment">;
  readonly " $fragmentType": "ProfileMenuFragment";
};
export type ProfileMenuFragment = ProfileMenuFragment$data;
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
