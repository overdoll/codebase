/**
 * @generated SignedSource<<d1c0e113352197717f9f23f1e2a1692c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubCopyLinkButtonFragment" | "ClubManageButtonFragment" | "ClubStaffButtonFragment">;
  readonly " $fragmentType": "ClubMenuFragment";
};
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
