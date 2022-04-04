/**
 * @generated SignedSource<<a1ad3d596710fc08ee078a7c13aa0564>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubStaffButtonFragment" | "ClubCopyLinkButtonFragment">;
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d8464e1fa8f08ab220f1e7ac0a06d3cd";

export default node;
