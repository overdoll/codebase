/**
 * @generated SignedSource<<bbec0322ac0db55fbfe2e97ef539a718>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffDisableClubCharactersButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffDisableClubCharactersButtonFragment";
};
export type StaffDisableClubCharactersButtonFragment$key = {
  readonly " $data"?: StaffDisableClubCharactersButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDisableClubCharactersButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffDisableClubCharactersButtonFragment",
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

(node as any).hash = "245844c2711e1b3f210e10d6d27d7c32";

export default node;
