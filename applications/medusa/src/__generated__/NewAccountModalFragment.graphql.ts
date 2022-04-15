/**
 * @generated SignedSource<<25ba3679fcb822c523f7e5175bb2ed9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewAccountModalFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "NewAccountModalFragment";
};
export type NewAccountModalFragment = NewAccountModalFragment$data;
export type NewAccountModalFragment$key = {
  readonly " $data"?: NewAccountModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewAccountModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewAccountModalFragment",
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

(node as any).hash = "6289b382dacf08adb58bdd3da5ded1f1";

export default node;
