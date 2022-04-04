/**
 * @generated SignedSource<<4b493b8eea351b6801036cc9eafde09e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffRevokeModeratorButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffRevokeModeratorButtonFragment";
};
export type StaffRevokeModeratorButtonFragment = StaffRevokeModeratorButtonFragment$data;
export type StaffRevokeModeratorButtonFragment$key = {
  readonly " $data"?: StaffRevokeModeratorButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRevokeModeratorButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRevokeModeratorButtonFragment",
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

(node as any).hash = "d7f2096abebcbffe7be9525b48f4fd69";

export default node;
