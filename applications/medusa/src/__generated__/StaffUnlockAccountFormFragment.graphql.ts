/**
 * @generated SignedSource<<aa2abd3e48e30ae550f8a83891c27796>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffUnlockAccountFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffUnlockAccountFormFragment";
};
export type StaffUnlockAccountFormFragment = StaffUnlockAccountFormFragment$data;
export type StaffUnlockAccountFormFragment$key = {
  readonly " $data"?: StaffUnlockAccountFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffUnlockAccountFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffUnlockAccountFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "de90a3051a140a3fa8599a9bf1072229";

export default node;
