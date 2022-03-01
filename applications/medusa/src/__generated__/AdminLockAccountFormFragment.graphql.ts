/**
 * @generated SignedSource<<ba2797395fd96851402753a5fa2372f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminLockAccountFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdminLockAccountFormFragment";
};
export type AdminLockAccountFormFragment = AdminLockAccountFormFragment$data;
export type AdminLockAccountFormFragment$key = {
  readonly " $data"?: AdminLockAccountFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminLockAccountFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminLockAccountFormFragment",
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

(node as any).hash = "6437a63443d403313fbdac8000976df8";

export default node;
