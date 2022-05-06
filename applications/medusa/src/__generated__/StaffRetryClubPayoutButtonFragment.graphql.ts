/**
 * @generated SignedSource<<fb1f8b18945b0338a75cf8a1f2b4043f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffRetryClubPayoutButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffRetryClubPayoutButtonFragment";
};
export type StaffRetryClubPayoutButtonFragment = StaffRetryClubPayoutButtonFragment$data;
export type StaffRetryClubPayoutButtonFragment$key = {
  readonly " $data"?: StaffRetryClubPayoutButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRetryClubPayoutButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRetryClubPayoutButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "ffca34b7ae0ef418e6330073d55d1e12";

export default node;
