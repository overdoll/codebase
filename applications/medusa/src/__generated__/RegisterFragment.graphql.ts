/**
 * @generated SignedSource<<0cc217751ed0af1800d8d1ad6a019a73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegisterFragment$data = {
  readonly token: string;
  readonly " $fragmentType": "RegisterFragment";
};
export type RegisterFragment = RegisterFragment$data;
export type RegisterFragment$key = {
  readonly " $data"?: RegisterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "05b9bb9487b56f3ef7d6cca74c2aea41";

export default node;
