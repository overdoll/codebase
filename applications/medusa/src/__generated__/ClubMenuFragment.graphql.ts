/**
 * @generated SignedSource<<a997ec18014e1d4263543f7d13077aea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubStaffButtonFragment" | "ClubCopyLinkButtonFragment" | "ClubManageButtonFragment">;
  readonly " $fragmentType": "ClubMenuFragment";
};
export type ClubMenuFragment = ClubMenuFragment$data;
export type ClubMenuFragment$key = {
  readonly " $data"?: ClubMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubStaffButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubManageButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "eddec1cea93f2789aeebffac56143c3c";

export default node;
