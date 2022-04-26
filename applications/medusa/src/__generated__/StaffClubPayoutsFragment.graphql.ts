/**
 * @generated SignedSource<<1cd8c8c0c9e11a973daf482c3e41548e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPayoutsFragment$data = {
  readonly id: string;
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ef8f8355acb06ea19ec60b58473cab9d";

export default node;
