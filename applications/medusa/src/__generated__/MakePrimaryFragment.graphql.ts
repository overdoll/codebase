/**
 * @generated SignedSource<<398056adb260144ed5cecf4df7c15f9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MakePrimaryFragment$data = {
  readonly email: string;
  readonly id: string;
  readonly " $fragmentType": "MakePrimaryFragment";
};
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
