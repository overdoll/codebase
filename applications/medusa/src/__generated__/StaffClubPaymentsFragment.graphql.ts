/**
 * @generated SignedSource<<d27284406669d7c2817f779a56b54c4e>>
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
  readonly " $fragmentSpreads": FragmentRefs<"UpdateClubPlatformFeeFormFragment">;
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "2cf56292819a440072e450e5e420aa9b";

export default node;
