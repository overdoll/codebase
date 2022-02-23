/**
 * @generated SignedSource<<66ed9174526718d90002d1bb4ebbba4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAssignModeratorButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdminAssignModeratorButtonFragment";
};
export type AdminAssignModeratorButtonFragment = AdminAssignModeratorButtonFragment$data;
export type AdminAssignModeratorButtonFragment$key = {
  readonly " $data"?: AdminAssignModeratorButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAssignModeratorButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAssignModeratorButtonFragment",
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

(node as any).hash = "ea7016a4afd0806695ae4bc22bacc0fa";

export default node;
