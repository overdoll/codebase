/**
 * @generated SignedSource<<02e9ff504b1ea1630a5649ba3ff781cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockAccountFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "UnlockAccountFormFragment";
};
export type UnlockAccountFormFragment$key = {
  readonly " $data"?: UnlockAccountFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockAccountFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockAccountFormFragment",
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

(node as any).hash = "e762dc0a9488c0e1299b0599f938d00f";

export default node;
