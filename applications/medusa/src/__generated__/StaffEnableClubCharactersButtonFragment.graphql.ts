/**
 * @generated SignedSource<<6f08f4b3b33bd52e485074f6b5743034>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffEnableClubCharactersButtonFragment$data = {
  readonly charactersLimit: number;
  readonly id: string;
  readonly " $fragmentType": "StaffEnableClubCharactersButtonFragment";
};
export type StaffEnableClubCharactersButtonFragment$key = {
  readonly " $data"?: StaffEnableClubCharactersButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffEnableClubCharactersButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffEnableClubCharactersButtonFragment",
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
      "name": "charactersLimit",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f7df394ee378be7ab2a95d700d6ed892";

export default node;
