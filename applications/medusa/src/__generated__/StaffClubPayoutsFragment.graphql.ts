/**
 * @generated SignedSource<<8fcfbc5f9063a1d1c5b4937fcfe606c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPayoutsFragment$data = {
  readonly platformFee: {
    readonly percent: number;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubBalanceFragment" | "UpdateClubPlatformFeeFormFragment" | "InitiateClubPayoutFormFragment" | "StaffClubPayoutsListFragment">;
  readonly " $fragmentType": "StaffClubPayoutsFragment";
};
export type StaffClubPayoutsFragment = StaffClubPayoutsFragment$data;
export type StaffClubPayoutsFragment$key = {
  readonly " $data"?: StaffClubPayoutsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubPayoutsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubPlatformFee",
      "kind": "LinkedField",
      "name": "platformFee",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "percent",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBalanceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateClubPlatformFeeFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InitiateClubPayoutFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubPayoutsListFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "445a1de30731912ac010032ee4fbd9a9";

export default node;
