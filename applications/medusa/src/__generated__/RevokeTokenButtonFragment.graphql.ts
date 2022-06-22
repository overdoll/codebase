/**
 * @generated SignedSource<<917f8d1113fd73ab05286d46b58350d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RevokeTokenButtonFragment$data = {
  readonly token: string;
  readonly " $fragmentType": "RevokeTokenButtonFragment";
};
export type RevokeTokenButtonFragment$key = {
  readonly " $data"?: RevokeTokenButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeTokenButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RevokeTokenButtonFragment",
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

(node as any).hash = "45d5cd6c5a2d644e0cb558d3207e7882";

export default node;
