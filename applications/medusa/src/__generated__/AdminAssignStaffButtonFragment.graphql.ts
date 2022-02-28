/**
 * @generated SignedSource<<a0766b1ee4b75467ad15cafbb0f7b930>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAssignStaffButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdminAssignStaffButtonFragment";
};
export type AdminAssignStaffButtonFragment = AdminAssignStaffButtonFragment$data;
export type AdminAssignStaffButtonFragment$key = {
  readonly " $data"?: AdminAssignStaffButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAssignStaffButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAssignStaffButtonFragment",
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

(node as any).hash = "ad87b5f1ef8abb61edfd6b641e5f1c9b";

export default node;
