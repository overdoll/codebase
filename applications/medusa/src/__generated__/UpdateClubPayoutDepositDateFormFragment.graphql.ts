/**
 * @generated SignedSource<<d2dee96062c2287af4c8f5a945c6282e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateClubPayoutDepositDateFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "UpdateClubPayoutDepositDateFormFragment";
};
export type UpdateClubPayoutDepositDateFormFragment = UpdateClubPayoutDepositDateFormFragment$data;
export type UpdateClubPayoutDepositDateFormFragment$key = {
  readonly " $data"?: UpdateClubPayoutDepositDateFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateClubPayoutDepositDateFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateClubPayoutDepositDateFormFragment",
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

(node as any).hash = "d952f6705cbb3e3d22c0ebf2a508da5a";

export default node;
