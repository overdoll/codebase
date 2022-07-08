/**
 * @generated SignedSource<<35f97a6e0c2d56e04704853cb1a98b28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfilePageButtonFragment$data = {
  readonly username: string;
  readonly " $fragmentType": "ProfilePageButtonFragment";
};
export type ProfilePageButtonFragment$key = {
  readonly " $data"?: ProfilePageButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfilePageButtonFragment",
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

(node as any).hash = "90a667249d646941a629bee0d4b11a51";

export default node;
