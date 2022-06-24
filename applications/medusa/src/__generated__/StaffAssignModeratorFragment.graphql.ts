/**
 * @generated SignedSource<<15cd302a78bd119e3e9460ac56bb4ea9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignModeratorFragment$data = {
  readonly isModerator: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignModeratorButtonFragment" | "StaffRevokeModeratorButtonFragment">;
  readonly " $fragmentType": "StaffAssignModeratorFragment";
};
export type StaffAssignModeratorFragment$key = {
  readonly " $data"?: StaffAssignModeratorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignModeratorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignModeratorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isModerator",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignModeratorButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRevokeModeratorButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "69ee2c99be53b225c51e7e712d6b83b5";

export default node;
