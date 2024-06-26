/**
 * @generated SignedSource<<47e388023c4f7097ea52dcfd49bdb4fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteAccountFormFragment$data = {
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "DeleteAccountFormFragment";
};
export type DeleteAccountFormFragment$key = {
  readonly " $data"?: DeleteAccountFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteAccountFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteAccountFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "bce42206ddbc59b8135939a7c05aecdf";

export default node;
