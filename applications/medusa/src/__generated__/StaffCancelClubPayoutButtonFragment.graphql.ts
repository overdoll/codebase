/**
 * @generated SignedSource<<b99f3d385f3b02506a410a7dddb63871>>
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
