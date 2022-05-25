/**
 * @generated SignedSource<<a0e74efa8cd4e5e1d23202d600a1995c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancelAccountDeletionButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "CancelAccountDeletionButtonFragment";
};
export type CancelAccountDeletionButtonFragment = CancelAccountDeletionButtonFragment$data;
export type CancelAccountDeletionButtonFragment$key = {
  readonly " $data"?: CancelAccountDeletionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancelAccountDeletionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelAccountDeletionButtonFragment",
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

(node as any).hash = "1d5d102c7fbf6d6ea386fec8aa492136";

export default node;
