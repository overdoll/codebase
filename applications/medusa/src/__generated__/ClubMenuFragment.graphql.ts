/**
 * @generated SignedSource<<8ffc50e896382c84f0355a07a0421dc3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubAdminButtonFragment" | "ClubCopyLinkButtonFragment">;
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
      "name": "ClubAdminButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubCopyLinkButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "9533bb2ec63ae7f87c7fd730885f0c82";

export default node;
