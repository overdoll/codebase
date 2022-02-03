/**
 * @generated SignedSource<<4c8e5cecc13c58b853262140b52c4c2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteFragment$data = {
  readonly id: string;
  readonly email: string;
  readonly " $fragmentType": "DeleteFragment";
};
export type DeleteFragment = DeleteFragment$data;
export type DeleteFragment$key = {
  readonly " $data"?: DeleteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteFragment",
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
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "AccountEmail",
  "abstractKey": null
};

(node as any).hash = "1e70daac2f5bdbfb6f7895bda5c4b14b";

export default node;
