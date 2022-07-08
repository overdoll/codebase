/**
 * @generated SignedSource<<cba4a3a0b2c69175e8b86986e6e1bb9b>>
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
