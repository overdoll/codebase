/**
 * @generated SignedSource<<ea9e24cbe81408537f2b2bc576bcb074>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MakePrimaryFragment$data = {
  readonly id: string;
  readonly email: string;
  readonly " $fragmentType": "MakePrimaryFragment";
};
export type MakePrimaryFragment = MakePrimaryFragment$data;
export type MakePrimaryFragment$key = {
  readonly " $data"?: MakePrimaryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MakePrimaryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MakePrimaryFragment",
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

(node as any).hash = "9fe90f28be57ac0e819ab85109160030";

export default node;
