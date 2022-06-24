/**
 * @generated SignedSource<<0981ae5884f666a9462ee5c2a6f1acc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubUnTerminateButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffClubUnTerminateButtonFragment";
};
export type StaffClubUnTerminateButtonFragment$key = {
  readonly " $data"?: StaffClubUnTerminateButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubUnTerminateButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubUnTerminateButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "3308f08072fdde27a1550457fd05967d";

export default node;
