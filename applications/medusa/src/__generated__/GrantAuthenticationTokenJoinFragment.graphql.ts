/**
 * @generated SignedSource<<71112278c57ae8c73fd41d4cd635eb81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAuthenticationTokenJoinFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentType": "GrantAuthenticationTokenJoinFragment";
};
export type GrantAuthenticationTokenJoinFragment$key = {
  readonly " $data"?: GrantAuthenticationTokenJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GrantAuthenticationTokenJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GrantAuthenticationTokenJoinFragment",
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

(node as any).hash = "6aedd631afca65ead845583d62543d6d";

export default node;
