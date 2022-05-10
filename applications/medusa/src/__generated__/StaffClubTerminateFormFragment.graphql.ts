/**
 * @generated SignedSource<<b23af9ed5051f999eb0cd05de2f38599>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubTerminateFormFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "StaffClubTerminateFormFragment";
};
export type StaffClubTerminateFormFragment = StaffClubTerminateFormFragment$data;
export type StaffClubTerminateFormFragment$key = {
  readonly " $data"?: StaffClubTerminateFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubTerminateFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubTerminateFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "96ddc93d61a22439fa35ac3842d6340a";

export default node;
