/**
 * @generated SignedSource<<599f34050ac4259c28842a1cec5855a0>>
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

(node as any).hash = "61209ba310631ba6155f06fb864b3da8";

export default node;
