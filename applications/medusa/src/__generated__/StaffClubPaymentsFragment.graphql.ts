/**
 * @generated SignedSource<<da09dd90ed82a9b9db2bbad28c382691>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPaymentsFragment$data = {
  readonly platformFee: {
    readonly percent: number;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UpdateClubPlatformFeeFormFragment" | "StaffClubPaymentsListFragment">;
  readonly " $fragmentType": "StaffClubPaymentsFragment";
};
export type StaffClubPaymentsFragment = StaffClubPaymentsFragment$data;
export type StaffClubPaymentsFragment$key = {
  readonly " $data"?: StaffClubPaymentsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPaymentsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubPaymentsFragment",
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
      "name": "UpdateClubPlatformFeeFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubPaymentsListFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "08ec26b3e57d743440154f184ef4d6ae";

export default node;
