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
export type AdminAssignModeratorFragment$data = {
  readonly isModerator: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAssignModeratorButtonFragment" | "AdminRevokeModeratorButtonFragment">;
  readonly " $fragmentType": "AdminAssignModeratorFragment";
};
export type AdminAssignModeratorFragment = AdminAssignModeratorFragment$data;
export type AdminAssignModeratorFragment$key = {
  readonly " $data"?: AdminAssignModeratorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAssignModeratorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAssignModeratorFragment",
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
      "name": "AdminAssignModeratorButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminRevokeModeratorButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1205850bbf73f6e63d790a6ff015f163";

export default node;
