/**
 * @generated SignedSource<<6a9d2a84ff0ea5491101c15a98f8168c>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubTransactionMetricsFragment" | "StaffClubPaymentsListFragment" | "UpdateClubPlatformFeeFormFragment">;
  readonly " $fragmentType": "StaffClubPaymentsFragment";
};
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTransactionMetricsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "22ec8e72f44f933b5291a307ce3ab9ec";

export default node;
