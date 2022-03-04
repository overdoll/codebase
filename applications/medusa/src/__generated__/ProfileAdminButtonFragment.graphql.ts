/**
 * @generated SignedSource<<a7b6cf47fe2db01e0c0502bf43e76cca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileAdminButtonFragment$data = {
  readonly username: string;
  readonly " $fragmentType": "ProfileAdminButtonFragment";
};
export type ProfileAdminButtonFragment = ProfileAdminButtonFragment$data;
export type ProfileAdminButtonFragment$key = {
  readonly " $data"?: ProfileAdminButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileAdminButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileAdminButtonFragment",
  "selections": [
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

(node as any).hash = "2ea8ca0828d036923aca6c1bfbb69368";

export default node;
