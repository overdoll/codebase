/**
 * @generated SignedSource<<4eac291664f1e0d44c31314856053b48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignModeratorButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffAssignModeratorButtonFragment";
};
export type StaffAssignModeratorButtonFragment$key = {
  readonly " $data"?: StaffAssignModeratorButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignModeratorButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignModeratorButtonFragment",
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

(node as any).hash = "a3034166827ed868746ba7d0ea47116f";

export default node;
