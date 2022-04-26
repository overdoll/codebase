/**
 * @generated SignedSource<<31f4493f8cdeadd38394357c7dc87f36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPaymentsFragment$data = {
  readonly id: string;
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "58ffca69d7915345d86a69a80271d45b";

export default node;
