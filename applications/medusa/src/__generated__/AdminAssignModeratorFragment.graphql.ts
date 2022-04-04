/**
 * @generated SignedSource<<12b1be80c37fb64a2d9242860ad0c250>>
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
export type StaffAssignModeratorFragment = StaffAssignModeratorFragment$data;
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

(node as any).hash = "1205850bbf73f6e63d790a6ff015f163";

export default node;
