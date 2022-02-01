/**
 * @generated SignedSource<<117a881aadb8ea217ae802db5cd443f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegisterFragment$data = {
  readonly id: string;
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
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "45e11cad02f16cfde09a47bf7933ae89";

export default node;
