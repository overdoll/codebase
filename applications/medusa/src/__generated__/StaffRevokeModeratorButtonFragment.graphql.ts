/**
 * @generated SignedSource<<1e89a05b0e16145bcf3bf1ec82517c51>>
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

(node as any).hash = "9426289427e6b7f8652c39f1804ce766";

export default node;
