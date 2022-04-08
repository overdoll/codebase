/**
 * @generated SignedSource<<89c915daf461e5c5286968c53ac22c25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubStaffButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubStaffButtonFragment";
};
export type ClubStaffButtonFragment = ClubStaffButtonFragment$data;
export type ClubStaffButtonFragment$key = {
  readonly " $data"?: ClubStaffButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubStaffButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubStaffButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b900d5bab54f110c139af09eae741120";

export default node;