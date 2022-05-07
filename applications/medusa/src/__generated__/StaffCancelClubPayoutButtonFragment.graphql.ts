/**
 * @generated SignedSource<<b16b570d18ec454da19c02d502b5f84e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffCancelClubPayoutButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffCancelClubPayoutButtonFragment";
};
export type StaffCancelClubPayoutButtonFragment = StaffCancelClubPayoutButtonFragment$data;
export type StaffCancelClubPayoutButtonFragment$key = {
  readonly " $data"?: StaffCancelClubPayoutButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelClubPayoutButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffCancelClubPayoutButtonFragment",
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

(node as any).hash = "1ff1cc076aeaa1e5cfbcea1d90219273";

export default node;
